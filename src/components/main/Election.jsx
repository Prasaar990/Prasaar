import { useState, useRef, useEffect } from "react";

const DocumentViewer = () => {
  const [scale, setScale] = useState(1.0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [renderedPages, setRenderedPages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("hindi");
  const pdfDocRef = useRef(null);

  // Document paths
  const DOCUMENT_PATHS = {
    hindi: "/hindi.pdf",
    marathi: "/marathi.pdf",
  };

  // Load PDF.js and automatically load the document
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    script.onload = () => {
      window.pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
      // Automatically load the document
      loadDocument(DOCUMENT_PATHS[selectedLanguage]);
    };
    script.onerror = () => {
      setError("Failed to load document viewer");
      setIsLoading(false);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  // Reload document when language changes
  useEffect(() => {
    if (window.pdfjsLib && DOCUMENT_PATHS[selectedLanguage]) {
      loadDocument(DOCUMENT_PATHS[selectedLanguage]);
    }
  }, [selectedLanguage]);

  const loadDocument = async (url) => {
    if (!window.pdfjsLib) {
      setError("Document viewer is still loading. Please try again.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const pdf = await window.pdfjsLib.getDocument(url).promise;
      pdfDocRef.current = pdf;
      setTotalPages(pdf.numPages);
      setDocumentLoaded(true);
      await renderAllPages(pdf);
    } catch (err) {
      setError("Failed to load document: " + err.message);
      setDocumentLoaded(false);
    } finally {
      setIsLoading(false);
    }
  };

  const renderAllPages = async (pdf) => {
    const pages = [];

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      try {
        const page = await pdf.getPage(pageNum);
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        const viewport = page.getViewport({ scale: scale });
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        // Convert canvas to data URL
        const dataURL = canvas.toDataURL("image/png");

        pages.push({
          pageNumber: pageNum,
          imageData: dataURL,
          width: viewport.width,
          height: viewport.height,
        });
      } catch (err) {
        console.error(`Failed to render page ${pageNum}:`, err);
      }
    }

    setRenderedPages(pages);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  return (
    <div className="w-full mx-auto p-4 bg-gray-50 min-h-screen py-24">
      {/* Language Toggle Header */}
      <div className="mb-8 flex justify-center">
        <div className="bg-white rounded-lg p-1 border border-gray-200">
          <button
            onClick={() => handleLanguageChange("hindi")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedLanguage === "hindi"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            हिंदी
          </button>
          <button
            onClick={() => handleLanguageChange("marathi")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
              selectedLanguage === "marathi"
                ? "bg-blue-600 text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            मराठी
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
          Document could not be loaded. Please try again.
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      )}

      {/* Document Pages */}
      {documentLoaded && !isLoading && !error && renderedPages.length > 0 && (
        <div className="space-y-4">
          {renderedPages.map((page, index) => (
            <div key={index} className="flex justify-center">
              <div className="bg-white rounded-lg overflow-hidden border border-gray-200 w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl">
                <img
                  src={page.imageData}
                  alt={`Page ${page.pageNumber}`}
                  className="w-full h-auto block"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Initial State - No document loaded */}
      {!documentLoaded && !isLoading && !error && (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-lg">Document Viewer</p>
          <p className="text-sm">Preparing content...</p>
        </div>
      )}
    </div>
  );
};

export default DocumentViewer;
