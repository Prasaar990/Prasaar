import { useState, useRef, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCanvasData } from '../../lib/api';

const CANVAS_SIZE = 1080;
// const API_URL = import.meta.env.VITE_API_URL || "https://electionmanagementworkshop.in";
const API_URL = "http://localhost:8087";

const PublicCanvasPage = () => {
  const { client_id } = useParams();
  const [canvasConfig, setCanvasConfig] = useState(null);
  const [frameImages, setFrameImages] = useState({ background: null, overlay: null });
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Load canvas config and frame images
  useEffect(() => {
    loadCanvasData();
  }, [client_id]);

  const loadCanvasData = async () => {
    setIsLoading(true);
    try {
      const config = await getCanvasData(client_id);
      setCanvasConfig(config.canvas_config);
      
      // Load frame images
      await loadFrameImages(config.canvas_config);
    } catch (err) {
      setError(err.message || 'Failed to load canvas data');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFrameImages = async (config) => {
    const loadImage = (src) =>
      new Promise((resolve, reject) => {
        if (!src) return resolve(null);
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        // src is now base64 data URI directly from API
        img.src = src;
      });

    try {
      const [bg, overlay] = await Promise.all([
        config.background_image ? loadImage(config.background_image) : Promise.resolve(null),
        config.overlay_image ? loadImage(config.overlay_image) : Promise.resolve(null),
      ]);
      setFrameImages({ background: bg, overlay });
    } catch (err) {
      console.error('Failed to load frame images:', err);
      setError('Failed to load frame images');
    }
  };

  // Handle file upload
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isValidImage =
      file.type.startsWith('image/') ||
      file.name.toLowerCase().endsWith('.heic') ||
      file.name.toLowerCase().endsWith('.heif');

    if (!isValidImage) {
      setError('Please select an image file (JPG, PNG, HEIC, etc.)');
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Send to backend for background removal
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_URL}/api/v1/background-removal`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Processing failed: ${response.statusText}`);
      }

      const processedBlob = await response.blob();
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
      setRotation(0);
    } catch (err) {
      console.error('Processing error:', err);
      setError(err.message || 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  // Render canvas
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || (!frameImages.background && !frameImages.overlay)) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Layer 1: background frame
    if (frameImages.background) {
      ctx.drawImage(frameImages.background, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }

    // Layer 2: user image (with rotation)
    if (processedImage) {
      const userImg = new Image();
      userImg.crossOrigin = 'anonymous';
      userImg.src = processedImage;

      userImg.onload = () => {
        const imgAspect = userImg.width / userImg.height;

        let drawWidth, drawHeight;
        if (imgAspect > 1) {
          drawWidth = CANVAS_SIZE * scale;
          drawHeight = drawWidth / imgAspect;
        } else {
          drawHeight = CANVAS_SIZE * scale;
          drawWidth = drawHeight * imgAspect;
        }

        const cx = CANVAS_SIZE / 2;
        const cy = CANVAS_SIZE / 2 + verticalOffset;
        const angleRad = (rotation * Math.PI) / 180;

        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 10;

        ctx.translate(cx, cy);
        ctx.rotate(angleRad);
        ctx.drawImage(userImg, -drawWidth / 2, -drawHeight / 2, drawWidth, drawHeight);
        ctx.restore();

        // Layer 3: foreground overlay
        if (frameImages.overlay) {
          ctx.drawImage(frameImages.overlay, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
      };

      if (userImg.complete) {
        userImg.onload();
      }
    } else {
      // Always show overlay even before upload
      if (frameImages.overlay) {
        ctx.drawImage(frameImages.overlay, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }
    }
  }, [frameImages, processedImage, verticalOffset, scale, rotation]);

  useEffect(() => {
    if (frameImages.background || frameImages.overlay) {
      renderCanvas();
    }
  }, [frameImages, processedImage, verticalOffset, scale, rotation, renderCanvas]);

  const rotateBy = (deg) => setRotation((r) => (r + deg + 360) % 360);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `${client_id}-image.png`;
    link.href = canvasRef.current.toDataURL('image/png', 1.0);
    link.click();
  };

  const handleReset = () => {
    if (processedImage) URL.revokeObjectURL(processedImage);
    setProcessedImage(null);
    setVerticalOffset(0);
    setScale(1);
    setRotation(0);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const PRIMARY = '#c60240';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error && !frameImages.background && !frameImages.overlay) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadCanvasData}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 mt-10">
          <h1 className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight tracking-tight">
            உங்கள் <span style={{ color: PRIMARY }}>DP / WhatsApp Status உருவாக்குங்கள்</span>
          </h1>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white border border-gray-200 rounded-3xl shadow-xl shadow-gray-100 overflow-hidden">
          {/* Card chrome bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <span className="text-l font-medium text-gray-400 tracking-wide">
              {processedImage ? 'Adjust your photo' : 'புகைப்படத்தை பதிவேற்றுங்கள்'}
            </span>
            <div className="w-16" />
          </div>

          <div className="p-6 md:p-8">
            {/* Canvas Preview */}
            <div className="relative flex justify-center mb-8">
              <div
                className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg bg-gray-50"
                style={{ maxWidth: '100%' }}
              >
                <canvas
                  ref={canvasRef}
                  width={CANVAS_SIZE}
                  height={CANVAS_SIZE}
                  className="block max-w-full h-auto"
                  style={{ maxHeight: '55vh' }}
                />

                {/* Rotate buttons */}
                {processedImage && !isProcessing && (
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <button
                      onClick={() => rotateBy(-90)}
                      title="Rotate -90"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white shadow-md transition-all duration-150 hover:scale-105 active:scale-95"
                      style={{ background: 'rgba(198,2,64,0.88)', backdropFilter: 'blur(6px)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                          d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                      </svg>
                      -90
                    </button>
                    <button
                      onClick={() => rotateBy(90)}
                      title="Rotate +90"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-white shadow-md transition-all duration-150 hover:scale-105 active:scale-95"
                      style={{ background: 'rgba(198,2,64,0.88)', backdropFilter: 'blur(6px)' }}
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                          d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                      </svg>
                      +90
                    </button>
                  </div>
                )}

                {/* Upload prompt */}
                {!processedImage && !isProcessing && (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div
                      className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm select-none"
                      style={{ background: 'rgba(255,255,255,0.88)' }}
                    >
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: '#fef0f4' }}
                      >
                        <svg className="w-6 h-6" fill="none" stroke={PRIMARY} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-700 font-semibold text-sm">கேலரியில் இருந்து பதிவேற்றுங்கள்</p>
                      <p className="text-gray-400 text-xs">உங்கள் புகைப்படம் இங்கே தோன்றும்</p>
                    </div>
                  </div>
                )}

                {/* Processing overlay */}
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm"
                    style={{ background: 'rgba(255,255,255,0.82)' }}>
                    <div className="relative mb-4">
                      <div className="w-12 h-12 border-4 border-gray-100 rounded-full" />
                      <div
                        className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin absolute inset-0"
                        style={{ borderColor: `${PRIMARY} transparent transparent transparent` }}
                      />
                    </div>
                    <p className="text-gray-700 font-semibold">Removing background...</p>
                    <p className="text-gray-400 text-sm mt-1">This may take a few seconds</p>
                  </div>
                )}
              </div>
            </div>

            {/* Upload Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="group inline-flex items-center gap-2.5 px-8 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: PRIMARY, boxShadow: '0 4px 14px rgba(198,2,64,0.22)' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#a8012e')}
                onMouseLeave={(e) => (e.currentTarget.style.background = PRIMARY)}
              >
                <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {processedImage ? 'Change Photo' : 'கேலரியில் இருந்து பதிவேற்றுங்கள்'}
              </button>
              <input ref={fileInputRef} type="file" accept="image/*,.heic,.heif" onChange={handleFileSelect} className="hidden" />
            </div>

            {/* Adjustment Controls */}
            {processedImage && (
              <>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-100" />
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    Adjust your photo
                  </span>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                  {/* Vertical Position */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#fef0f4' }}>
                          <svg className="w-4 h-4" fill="none" stroke={PRIMARY} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4m0 0l4 4m-4-4v18" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Position</span>
                      </div>
                      <span
                        className="text-xs font-medium tabular-nums px-2.5 py-0.5 rounded-full border"
                        style={{ background: '#fef0f4', borderColor: '#f9b3c6', color: PRIMARY }}
                      >
                        {verticalOffset > 0 ? `+${verticalOffset}` : verticalOffset}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="-200"
                      max="200"
                      value={verticalOffset}
                      onChange={(e) => setVerticalOffset(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: PRIMARY }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-0.5">
                      <span>Up</span>
                      <span>Center</span>
                      <span>Down</span>
                    </div>
                  </div>

                  {/* Scale */}
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: '#fef0f4' }}>
                          <svg className="w-4 h-4" fill="none" stroke={PRIMARY} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">Zoom</span>
                      </div>
                      <span
                        className="text-xs font-medium tabular-nums px-2.5 py-0.5 rounded-full border"
                        style={{ background: '#fef0f4', borderColor: '#f9b3c6', color: PRIMARY }}
                      >
                        {Math.round(scale * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer"
                      style={{ accentColor: PRIMARY }}
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-0.5">
                      <span>Smaller</span>
                      <span>1:1</span>
                      <span>Larger</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleReset}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reset & Start Over
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      boxShadow: '0 4px 14px rgba(22,163,74,0.25)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #15803d, #166534)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(135deg, #16a34a, #15803d)')}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Image
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer tip */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
          <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          For best results, use a clear photo with good lighting and a simple background. And background should be other than white.
        </div>
      </div>
    </div>
  );
};

export default PublicCanvasPage;
