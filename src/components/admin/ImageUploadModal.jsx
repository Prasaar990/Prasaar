import { useState, useRef, useEffect } from 'react';
import { uploadClientImage, deleteClientImage, getCanvasData } from '../../lib/api';

const ImageUploadModal = ({ client, onClose }) => {
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [overlayPreview, setOverlayPreview] = useState(null);
  const [uploadingType, setUploadingType] = useState(null);
  const [deletingType, setDeletingType] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const backgroundInputRef = useRef(null);
  const overlayInputRef = useRef(null);

  // Allowed file types and max size
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // Fetch existing images from canvas-data API
  useEffect(() => {
    const fetchCanvasData = async () => {
      if (!client?.client_id) return;

      setIsFetching(true);
      try {
        const data = await getCanvasData(client.client_id);
        if (data?.canvas_config) {
          // Set previews from base64 data URIs
          if (data.canvas_config.background_image) {
            setBackgroundPreview(data.canvas_config.background_image);
          }
          if (data.canvas_config.overlay_image) {
            setOverlayPreview(data.canvas_config.overlay_image);
          }
        }
      } catch (err) {
        console.error('Failed to fetch canvas data:', err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchCanvasData();
  }, [client?.client_id]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Invalid file type. Please upload JPG, PNG, or WebP.';
    }
    if (file.size > MAX_SIZE) {
      return 'File too large. Maximum size is 10MB.';
    }
    return null;
  };

  const handleFileSelect = async (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      if (e.target) e.target.value = '';
      return;
    }

    setError('');
    setSuccess('');

    // Instant visual preview
    const reader = new FileReader();
    reader.onload = (event) => {
      if (type === 'background') {
        setBackgroundPreview(event.target.result);
      } else {
        setOverlayPreview(event.target.result);
      }
    };
    reader.readAsDataURL(file);

    // Directly upload & replace the image
    setUploadingType(type);
    try {
      await uploadClientImage(client.client_id, type, file);
      setSuccess(`${type === 'background' ? 'Background' : 'Overlay'} image replaced successfully!`);
    } catch (err) {
      setError(err.message || `Failed to replace ${type} image`);
      // Restore previous state if upload failed
      try {
        const data = await getCanvasData(client.client_id);
        if (type === 'background') {
          setBackgroundPreview(data?.canvas_config?.background_image || null);
        } else {
          setOverlayPreview(data?.canvas_config?.overlay_image || null);
        }
      } catch (_) {}
    } finally {
      setUploadingType(null);
      if (e.target) e.target.value = '';
    }
  };

  const handleDelete = async (type) => {
    setDeletingType(type);
    setError('');
    setSuccess('');

    try {
      await deleteClientImage(client.client_id, type);
      if (type === 'background') {
        setBackgroundPreview(null);
      } else {
        setOverlayPreview(null);
      }
      setSuccess(`${type === 'background' ? 'Background' : 'Overlay'} image removed successfully!`);
    } catch (err) {
      setError(err.message || `Failed to delete ${type} image`);
    } finally {
      setDeletingType(null);
      if (type === 'background' && backgroundInputRef.current) {
        backgroundInputRef.current.value = '';
      }
      if (type === 'overlay' && overlayInputRef.current) {
        overlayInputRef.current.value = '';
      }
    }
  };

  const ImageUploadZone = ({ type, preview, inputRef, title }) => {
    const isUploading = uploadingType === type;
    const isDeleting = deletingType === type;
    const isBusy = isUploading || isDeleting;

    return (
      <div className="border border-slate-200 rounded-xl p-4">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>

        {/* Preview area */}
        <div className="mb-4 aspect-video bg-slate-50 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center relative">
          {isFetching ? (
            <div className="text-center p-8">
              <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              <p className="text-sm text-slate-400">Loading...</p>
            </div>
          ) : preview ? (
            <>
              <img
                src={preview}
                alt={`${title} preview`}
                className="w-full h-full object-contain"
              />
              {isUploading && (
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                  <p className="text-xs font-semibold text-blue-700">Replacing image...</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center p-8">
              {isUploading ? (
                <>
                  <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs font-semibold text-blue-700">Uploading image...</p>
                </>
              ) : (
                <>
                  <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-sm text-slate-400">No image selected</p>
                </>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFileSelect(type, e)}
            className="hidden"
            disabled={isBusy}
          />
          <button
            onClick={() => inputRef.current?.click()}
            disabled={isBusy}
            className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span>Replacing...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>{preview ? 'Replace' : 'Select File'}</span>
              </>
            )}
          </button>
          {preview && (
            <button
              onClick={() => handleDelete(type)}
              disabled={isBusy}
              className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center"
              title={`Delete ${title}`}
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Manage Images</h2>
            <p className="text-sm text-slate-500">Client: {client.name}</p>
          </div>
          <button
            onClick={() => onClose(true)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {/* Alerts */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploadZone
              type="background"
              title="Background Image"
              preview={backgroundPreview}
              inputRef={backgroundInputRef}
            />
            <ImageUploadZone
              type="overlay"
              title="Overlay Image"
              preview={overlayPreview}
              inputRef={overlayInputRef}
            />
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Upload Guidelines</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Maximum file size: 10MB</li>
              <li>• Supported formats: JPG, PNG, WebP</li>
              <li>• Recommended canvas size: 1080x1080 pixels</li>
              <li>• Background image will be drawn first (behind user photo)</li>
              <li>• Overlay image will be drawn last (on top of user photo)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex justify-end">
          <button
            onClick={() => onClose(true)}
            className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
