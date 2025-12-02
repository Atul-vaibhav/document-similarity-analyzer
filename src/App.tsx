import React, { useState, useMemo } from 'react';
import { Calculator, FileText, Zap } from 'lucide-react';
import { DocumentInput } from './components/DocumentInput';
import { SimilarityResult } from './components/SimilarityResult';
import { ExampleDocuments } from './components/ExampleDocuments';
import { calculateDocumentSimilarity } from './utils/documentSimilarity';

function App() {
  const [document1, setDocument1] = useState('');
  const [document2, setDocument2] = useState('');

  // Calculate similarity whenever documents change
  const similarityResult = useMemo(() => {
    if (!document1.trim() || !document2.trim()) {
      return null;
    }
    return calculateDocumentSimilarity(document1, document2);
  }, [document1, document2]);

  const handleLoadExample = (doc1: string, doc2: string) => {
    setDocument1(doc1);
    setDocument2(doc2);
  };

  const handleClear = () => {
    setDocument1('');
    setDocument2('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Document Similarity Analyzer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center w-full py-5 rounded-lg bg-gradient-to-r from-[#f7faff] to-[#eef4ff] text-[#1a2b5b]
  ">Compare two text documents and get a precise similarity score using advanced algorithms.</h1>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Document Inputs */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Input Documents</h2>
                </div>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  Clear All
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DocumentInput
                  label="Document 1"
                  value={document1}
                  onChange={setDocument1}
                  placeholder="Paste or type your first document here..."
                />
                <DocumentInput
                  label="Document 2"
                  value={document2}
                  onChange={setDocument2}
                  placeholder="Paste or type your second document here..."
                />
              </div>
            </div>

            {/* Results Section */}
            {similarityResult && (
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-semibold text-gray-800">Analysis Results</h2>
                </div>
                <SimilarityResult result={similarityResult} />
              </div>
            )}
          </div>

          {/* Right Column - Examples and Info */}
          <div className="space-y-6">
            <ExampleDocuments onLoadExample={handleLoadExample} />
            
            {/* Algorithm Info */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">How It Works</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Text Preprocessing:</strong> Normalizes text by removing punctuation and converting to lowercase</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>TF-IDF Vectorization:</strong> Converts documents into numerical vectors based on term frequency and importance</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <p><strong>Cosine Similarity:</strong> Measures the angle between document vectors to determine similarity</p>
                </div>
              </div>
            </div>

            {/* Score Guide */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3">Score Guide</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>0.8-1.0:</strong> Very Similar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span><strong>0.6-0.8:</strong> Moderately Similar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span><strong>0.4-0.6:</strong> Somewhat Similar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span><strong>0.2-0.4:</strong> Slightly Similar</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span><strong>0.0-0.2:</strong> Very Different</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
