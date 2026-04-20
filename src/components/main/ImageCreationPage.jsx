import { useState, useRef, useCallback, useEffect } from "react";

const CANVAS_SIZE = 1080;
const API_URL = import.meta.env.VITE_API_URL || "https://electionmanagementworkshop.in";

const ImageCreationPage = () => {
  const [state, setState] = useState({
    originalImage: null,
    processedImage: null,
    finalImage: null,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [verticalOffset, setVerticalOffset] = useState(0);
  const [scale, setScale] = useState(1);
  const [step, setStep] = useState("upload"); // upload, preview, result

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  // Cache frame images
  const [frameImages, setFrameImages] = useState({
    background: null,
    overlay: null,
  });

  // Load frame images on mount
  useEffect(() => {
    const loadFrames = async () => {
      const loadImage = (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = src;
        });

      try {
        const [bg, overlay] = await Promise.all([
          loadImage("/file1.png"),
          loadImage("/file3.png"),
        ]);
        setFrameImages({ background: bg, overlay });
      } catch (err) {
        console.error("Failed to load frame images:", err);
        setError("Failed to load frame images");
      }
    };

    loadFrames();
  }, []);

  // Handle file upload
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    setError(null);
    setIsProcessing(true);

    try {
      // Read original image
      const originalUrl = URL.createObjectURL(file);
      setState((prev) => ({ ...prev, originalImage: originalUrl }));

      // Send to backend for background removal
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_URL}/remove-background`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Processing failed: ${response.statusText}`);
      }

      const processedBlob = await response.blob();
      const processedUrl = URL.createObjectURL(processedBlob);

      setState((prev) => ({ ...prev, processedImage: processedUrl }));
      setStep("preview");
    } catch (err) {
      console.error("Processing error:", err);
      setError(err.message || "Failed to process image");
    } finally {
      setIsProcessing(false);
    }
  };

  // Render canvas with all layers
  const renderCanvas = useCallback(() => {
    if (!canvasRef.current || !frameImages.background || !frameImages.overlay) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Layer 1: Draw background frame
    ctx.drawImage(frameImages.background, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Layer 2: Draw user image (if processed)
    if (state.processedImage) {
      const userImg = new Image();
      userImg.crossOrigin = "anonymous";
      userImg.src = state.processedImage;

      userImg.onload = () => {
        // Calculate aspect-ratio-preserving dimensions
        const imgAspect = userImg.width / userImg.height;
        const canvasAspect = CANVAS_SIZE / CANVAS_SIZE; // 1:1

        let drawWidth, drawHeight;
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to width
          drawWidth = CANVAS_SIZE * scale;
          drawHeight = drawWidth / imgAspect;
        } else {
          // Image is taller - fit to height
          drawHeight = CANVAS_SIZE * scale;
          drawWidth = drawHeight * imgAspect;
        }

        // Center horizontally, apply vertical offset
        const x = (CANVAS_SIZE - drawWidth) / 2;
        const y = (CANVAS_SIZE - drawHeight) / 2 + verticalOffset;

        // Add shadow for realism
        ctx.save();
        ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
        ctx.shadowBlur = 20;
        ctx.shadowOffsetY = 10;

        ctx.drawImage(userImg, x, y, drawWidth, drawHeight);
        ctx.restore();

        // Layer 3: Draw foreground overlay (after user image is drawn)
        ctx.drawImage(frameImages.overlay, 0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Update final image state
        setState((prev) => ({
          ...prev,
          finalImage: canvas.toDataURL("image/png"),
        }));
      };

      // Handle if image is already loaded
      if (userImg.complete) {
        userImg.onload();
      }
    } else {
      // Just draw overlay if no user image
      ctx.drawImage(frameImages.overlay, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
  }, [frameImages, state.processedImage, verticalOffset, scale]);

  // Re-render when adjustments change
  useEffect(() => {
    if (step === "preview" && state.processedImage) {
      renderCanvas();
    }
  }, [step, state.processedImage, verticalOffset, scale, renderCanvas]);

  // Initial canvas render
  useEffect(() => {
    if (step === "preview" && state.processedImage) {
      // Small delay to ensure canvas is ready
      setTimeout(renderCanvas, 100);
    }
  }, [step, state.processedImage, renderCanvas]);

  // Download final image
  const handleDownload = () => {
    if (!canvasRef.current) return;

    const link = document.createElement("a");
    link.download = "my-composed-image.png";
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  };

  // Retake - clear and go back to upload
  const handleRetake = () => {
    // Clean up object URLs
    if (state.originalImage) URL.revokeObjectURL(state.originalImage);
    if (state.processedImage) URL.revokeObjectURL(state.processedImage);

    setState({
      originalImage: null,
      processedImage: null,
      finalImage: null,
    });
    setVerticalOffset(0);
    setScale(1);
    setStep("upload");
    setError(null);

    // Reset file inputs
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 ">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 mt-12">
          <h1 className="text-3xl md:text-4xl font-medium text-slate-800 mb-2">
            Create Your Image
          </h1>
          <p className="text-slate-600">
            Upload or capture a photo, and we&apos;ll blend it into a beautiful frame
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Upload Step */}
        {step === "upload" && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upload from Gallery */}
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group disabled:opacity-50"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-slate-700">
                  Upload from Gallery
                </span>
                <span className="text-sm text-slate-500 mt-1">
                  Select an existing photo
                </span>
              </button>

              {/* Capture from Camera */}
              <button
                onClick={() => cameraInputRef.current?.click()}
                disabled={isProcessing}
                className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all group disabled:opacity-50"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-slate-700">
                  Take a Photo
                </span>
                <span className="text-sm text-slate-500 mt-1">
                  Use your camera
                </span>
              </button>
            </div>

            {/* Hidden file inputs */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileSelect}
              className="hidden"
            />

            {/* Loading State */}
            {isProcessing && (
              <div className="mt-8 text-center">
                <div className="inline-flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-slate-600">
                    Removing background... Please wait
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Preview/Edit Step */}
        {step === "preview" && state.processedImage && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Canvas */}
            <div className="flex justify-center mb-6 overflow-auto">
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                className="max-w-full h-auto border border-slate-200 rounded-lg shadow-md"
                style={{ maxHeight: "60vh" }}
              />
            </div>

            {/* Controls */}
            <div className="space-y-6 mb-6">
              {/* Vertical Position */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Vertical Position
                </label>
                <input
                  type="range"
                  min="-200"
                  max="200"
                  value={verticalOffset}
                  onChange={(e) => setVerticalOffset(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Up</span>
                  <span>Center</span>
                  <span>Down</span>
                </div>
              </div>

              {/* Scale */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Zoom / Scale
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Smaller</span>
                  <span>{Math.round(scale * 100)}%</span>
                  <span>Larger</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleRetake}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-slate-400 hover:bg-slate-50 transition-colors"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Retake
                </span>
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>For best results, use a photo with good lighting and clear subject separation.</p>
        </div>
      </div>
    </div>
  );
};

export default ImageCreationPage;
