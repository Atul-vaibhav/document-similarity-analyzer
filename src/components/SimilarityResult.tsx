import React from 'react';
import { BarChart3, Hash, Clover as Overlap, TrendingUp } from 'lucide-react';
import { SimilarityResult as SimilarityResultType } from '../utils/documentSimilarity';

interface SimilarityResultProps {
  result: SimilarityResultType;
}

export function SimilarityResult({ result }: SimilarityResultProps) {
  const { score, stats } = result;
  
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 0.6) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 0.4) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score >= 0.2) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };
  
  const getScoreDescription = (score: number) => {
    if (score >= 0.9) return 'Nearly Identical';
    if (score >= 0.8) return 'Very Similar';
    if (score >= 0.6) return 'Moderately Similar';
    if (score >= 0.4) return 'Somewhat Similar';
    if (score >= 0.2) return 'Slightly Similar';
    return 'Very Different';
  };

  return (
    <div className="space-y-6">
      {/* Main Score Display */}
      <div className={`p-6 rounded-xl border-2 ${getScoreColor(score)} transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Similarity Score</h3>
            <p className="text-sm opacity-80">{getScoreDescription(score)}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{(score * 100).toFixed(1)}%</div>
            <div className="text-sm opacity-80">{score.toFixed(4)}</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
            <div 
              className="h-3 rounded-full transition-all duration-500 ease-out"
              style={{ 
                width: `${score * 100}%`,
                background: score >= 0.8 ? '#10b981' : 
                           score >= 0.6 ? '#3b82f6' : 
                           score >= 0.4 ? '#f59e0b' : 
                           score >= 0.2 ? '#f97316' : '#ef4444'
              }}
            />
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-blue-600" />
            <h4 className="font-semibold text-gray-700">Document 1</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total words:</span>
              <span className="font-medium">{stats.document1.wordCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unique words:</span>
              <span className="font-medium">{stats.document1.uniqueWords}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Hash className="w-4 h-4 text-green-600" />
            <h4 className="font-semibold text-gray-700">Document 2</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total words:</span>
              <span className="font-medium">{stats.document2.wordCount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Unique words:</span>
              <span className="font-medium">{stats.document2.uniqueWords}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Overlap className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-gray-700">Overlap</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Shared words:</span>
              <span className="font-medium">{stats.sharedWords.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Overlap ratio:</span>
              <span className="font-medium">
                {stats.document1.uniqueWords > 0 
                  ? ((stats.sharedWords.length / Math.max(stats.document1.uniqueWords, stats.document2.uniqueWords)) * 100).toFixed(1)
                  : 0}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Shared Words */}
      {stats.sharedWords.length > 0 && (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-indigo-600" />
            <h4 className="font-semibold text-gray-700">
              Shared Words ({stats.sharedWords.length})
            </h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {stats.sharedWords.slice(0, 50).map((word, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium"
              >
                {word}
              </span>
            ))}
            {stats.sharedWords.length > 50 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                +{stats.sharedWords.length - 50} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}