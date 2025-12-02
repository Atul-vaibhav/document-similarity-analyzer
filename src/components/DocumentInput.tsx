import React from 'react';
import { FileText, Type } from 'lucide-react';
import { FileUpload } from './FileUpload';

interface DocumentInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export function DocumentInput({ label, value, onChange, placeholder }: DocumentInputProps) {
  const [inputMode, setInputMode] = React.useState<'text' | 'file'>('text');
  const [fileName, setFileName] = React.useState<string>('');

  const handleFileProcessed = (text: string, fileName: string) => {
    onChange(text);
    setFileName(fileName);
    if (text) {
      setInputMode('file');
    }
  };

  const handleTextModeSwitch = () => {
    setInputMode('text');
    setFileName('');
    onChange('');
  };

  const handleFileModeSwitch = () => {
    setInputMode('file');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <label className="text-sm font-semibold text-gray-700">{label}</label>
        </div>
        
        {/* Mode Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={handleTextModeSwitch}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
              inputMode === 'text'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Type className="w-3 h-3 inline mr-1" />
            Text
          </button>
          <button
            onClick={handleFileModeSwitch}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-all duration-200 ${
              inputMode === 'file'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <FileText className="w-3 h-3 inline mr-1" />
            Upload
          </button>
        </div>
      </div>

      {inputMode === 'text' ? (
        <div className="space-y-3">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full h-48 p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm leading-relaxed"
            style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
          />
          <div className="text-xs text-gray-500">
            {value.trim() ? `${value.trim().split(/\s+/).length} words` : '0 words'}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <FileUpload
            label=""
            onFileProcessed={handleFileProcessed}
          />
          {value && fileName && (
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="text-xs text-gray-600 mb-2">Document Preview:</div>
              <div className="text-sm text-gray-800 max-h-32 overflow-y-auto">
                {value.substring(0, 300)}
                {value.length > 300 && '...'}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {value.trim().split(/\s+/).length} words from {fileName}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}