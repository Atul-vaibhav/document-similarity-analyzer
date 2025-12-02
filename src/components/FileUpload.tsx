import React, { useRef, useState } from 'react';
import { Upload, File, AlertCircle, CheckCircle, X } from 'lucide-react';
import { processFile, validateFile, FileProcessingResult } from '../utils/fileProcessor';

interface FileUploadProps {
  label: string;
  onFileProcessed: (text: string, fileName: string) => void;
  disabled?: boolean;
}

export function FileUpload({ label, onFileProcessed, disabled }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedFile, setProcessedFile] = useState<FileProcessingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset states
    setError(null);
    setProcessedFile(null);

    // Validate file
    const validation = validateFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      return;
    }

    setIsProcessing(true);

    try {
      const result = await processFile(file);
      
      if (result.error) {
        setError(result.error);
      } else {
        setProcessedFile(result);
        onFileProcessed(result.text, result.fileName);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleClear = () => {
    setProcessedFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onFileProcessed('', '');
  };

  return (
    <div className="space-y-3">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      
      {/* Upload Button */}
      <button
        onClick={handleUploadClick}
        disabled={disabled || isProcessing}
        className={`w-full p-4 border-2 border-dashed rounded-lg transition-all duration-200 ${
          disabled || isProcessing
            ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
            : 'border-blue-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className={`w-6 h-6 ${disabled || isProcessing ? 'text-gray-400' : 'text-blue-600'}`} />
          <div className="text-center">
            <p className={`text-sm font-medium ${disabled || isProcessing ? 'text-gray-400' : 'text-blue-600'}`}>
              {isProcessing ? 'Processing...' : 'Upload Document'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Supports Word (.docx), PDF (.pdf), and Text (.txt) files
            </p>
          </div>
        </div>
      </button>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx,.pdf,.txt"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Processing indicator */}
      {isProcessing && (
        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="animate-spin w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"></div>
          <span className="text-sm text-blue-700">Processing document...</span>
        </div>
      )}

      {/* Success state */}
      {processedFile && !error && (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-800">{processedFile.fileName}</p>
              <p className="text-xs text-green-600">{processedFile.fileType} • {processedFile.text.split(' ').length} words</p>
            </div>
          </div>
          <button
            onClick={handleClear}
            className="p-1 hover:bg-green-100 rounded transition-colors duration-200"
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
          <button
            onClick={handleClear}
            className="p-1 hover:bg-red-100 rounded transition-colors duration-200"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
}