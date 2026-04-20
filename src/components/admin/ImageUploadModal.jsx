import { useState, useRef, useEffect } from 'react';
import { uploadClientImage } from '../../lib/api';

const ImageUploadModal = ({ client, onClose }) => {
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [backgroundPreview, setBackgroundPreview] = useState(null);
  const [overlayPreview, setOverlayPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const backgroundInputRef = useRef(null);
  const overlayInputRef = useRef(null);

  // Allowed file types and max size
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  useEffect(() => {
    // Load existing images if available
    if (client.background_image_url) {
      setBackgroundPreview(client.background_image_url);
    }
    if (client.overlay_image_url) {
      setOverlayPreview(client.overlay_image_url);
    }
  }, [client]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return 'Invalid file type. Please upload JPG, PNG, or WebP.';
    }
    if (file.size > MAX_SIZE) {
      return 'File too large. Maximum size is 10MB.';
    }
    return null;
  };

  const handleFileSelect = (type, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const errorMsg = validateFile(file);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      if (type === 'background') {
        setBackgroundImage(file);
        setBackgroundPreview(e.target.result);
      } else {
        setOverlayImage(file);
        setOverlayPreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (type) => {
    const file = type === 'background' ? backgroundImage : overlayImage;
    if (!file) {
      setError(`Please select a ${type} image first`);
      return;
    }

    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await uploadClientImage(client.client_id, type, file);
      setSuccess(`${type === 'background' ? 'Background' : 'Overlay'} image uploaded successfully!`);
      
      // Clear the file input after successful upload
      if (type === 'background') {
        setBackgroundImage(null);
      } else {
        setOverlayImage(null);
      }
    } catch (err) {
      setError(err.message || `Failed to upload ${type} image`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (type) => {
    if (type === 'background') {
      setBackgroundImage(null);
      setBackgroundPreview(null);
    } else {
      setOverlayImage(null);
      setOverlayPreview(null);
    }
    if (backgroundInputRef.current) backgroundInputRef.current.value = '';
    if (overlayInputRef.current) overlayInputRef.current.value = '';
  };

  const ImageUploadZone = ({ type, preview, inputRef, title }) => (
    <div className="border border-slate-200 rounded-xl p-4">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">{title}</h3>
      
      {/* Preview area */}
      <div className="mb-4 aspect-video bg-slate-50 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
        {preview ? (
          <img 
            src={preview} 
            alt={`${title} preview`}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center p-8">
            <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-sm text-slate-400">No image selected</p>
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
        />
        <button
          onClick={() => inputRef.current?.click()}
          className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium text-sm transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          {preview ? 'Replace' : 'Select File'}
        </button>
        {preview && (
          <button
            onClick={() => handleDelete(type)}
            className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 font-medium text-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Upload button */}
      {(type === 'background' ? backgroundImage : overlayImage) && (
        <button
          onClick={() => handleUpload(type)}
          disabled={isLoading}
          className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload {title}
            </>
          )}
        </button>
      )}
    </div>
  );

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
