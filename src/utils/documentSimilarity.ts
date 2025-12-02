export interface DocumentStats {
  wordCount: number;
  uniqueWords: number;
  commonWords: number;
}

export interface SimilarityResult {
  score: number;
  stats: {
    document1: DocumentStats;
    document2: DocumentStats;
    sharedWords: string[];
  };
}

// Text preprocessing function
function preprocessText(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ') // Remove punctuation
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()
    .split(' ')
    .filter(word => word.length > 1); // Filter out single characters
}

// Calculate term frequency for a document
function calculateTF(words: string[]): Map<string, number> {
  const tf = new Map<string, number>();
  
  for (const word of words) {
    tf.set(word, (tf.get(word) || 0) + 1);
  }
  
  return tf;
}

// Calculate cosine similarity using term frequencies
function calculateCosineSimilarity(tf1: Map<string, number>, tf2: Map<string, number>): number {
  // Get all unique words from both documents
  const allWords = new Set([...tf1.keys(), ...tf2.keys()]);
  
  if (allWords.size === 0) return 0;
  
  // Create vectors
  const vector1: number[] = [];
  const vector2: number[] = [];
  
  for (const word of allWords) {
    vector1.push(tf1.get(word) || 0);
    vector2.push(tf2.get(word) || 0);
  }
  
  // Calculate dot product
  let dotProduct = 0;
  for (let i = 0; i < vector1.length; i++) {
    dotProduct += vector1[i] * vector2[i];
  }
  
  // Calculate magnitudes
  let magnitude1 = 0;
  let magnitude2 = 0;
  for (let i = 0; i < vector1.length; i++) {
    magnitude1 += vector1[i] * vector1[i];
    magnitude2 += vector2[i] * vector2[i];
  }
  
  magnitude1 = Math.sqrt(magnitude1);
  magnitude2 = Math.sqrt(magnitude2);
  
  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }
  
  return dotProduct / (magnitude1 * magnitude2);
}

// Calculate Jaccard similarity as a backup measure
function calculateJaccardSimilarity(words1: Set<string>, words2: Set<string>): number {
  const intersection = new Set([...words1].filter(word => words2.has(word)));
  const union = new Set([...words1, ...words2]);
  
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

// Main function to calculate document similarity
export function calculateDocumentSimilarity(doc1: string, doc2: string): SimilarityResult {
  // Handle empty documents
  if (!doc1.trim() || !doc2.trim()) {
    return {
      score: 0,
      stats: {
        document1: { wordCount: 0, uniqueWords: 0, commonWords: 0 },
        document2: { wordCount: 0, uniqueWords: 0, commonWords: 0 },
        sharedWords: []
      }
    };
  }
  
  // Preprocess documents
  const words1 = preprocessText(doc1);
  const words2 = preprocessText(doc2);
  
  // Calculate basic statistics
  const uniqueWords1 = new Set(words1);
  const uniqueWords2 = new Set(words2);
  const sharedWords = Array.from(uniqueWords1).filter(word => uniqueWords2.has(word));
  
  // Handle identical documents
  if (doc1.trim().toLowerCase() === doc2.trim().toLowerCase()) {
    return {
      score: 1.0,
      stats: {
        document1: { wordCount: words1.length, uniqueWords: uniqueWords1.size, commonWords: sharedWords.length },
        document2: { wordCount: words2.length, uniqueWords: uniqueWords2.size, commonWords: sharedWords.length },
        sharedWords: sharedWords.sort()
      }
    };
  }
  
  // If no shared words, similarity is 0
  if (sharedWords.length === 0) {
    return {
      score: 0,
      stats: {
        document1: { wordCount: words1.length, uniqueWords: uniqueWords1.size, commonWords: 0 },
        document2: { wordCount: words2.length, uniqueWords: uniqueWords2.size, commonWords: 0 },
        sharedWords: []
      }
    };
  }
  
  // Calculate term frequencies
  const tf1 = calculateTF(words1);
  const tf2 = calculateTF(words2);
  
  // Calculate cosine similarity
  const cosineSim = calculateCosineSimilarity(tf1, tf2);
  
  // Calculate Jaccard similarity for additional context
  const jaccardSim = calculateJaccardSimilarity(uniqueWords1, uniqueWords2);
  
  // Combine both similarities with weighted average (cosine gets more weight)
  const finalScore = (cosineSim * 0.7) + (jaccardSim * 0.3);
  
  return {
    score: Math.max(0, Math.min(1, finalScore)), // Ensure score is between 0 and 1
    stats: {
      document1: { 
        wordCount: words1.length, 
        uniqueWords: uniqueWords1.size, 
        commonWords: sharedWords.length 
      },
      document2: { 
        wordCount: words2.length, 
        uniqueWords: uniqueWords2.size, 
        commonWords: sharedWords.length 
      },
      sharedWords: sharedWords.sort()
    }
  };
}