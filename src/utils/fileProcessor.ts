import mammoth from 'mammoth';

export interface FileProcessingResult {
  text: string;
  fileName: string;
  fileType: string;
  error?: string;
}

// Process Word documents (.docx)
async function processWordDocument(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  } catch (error) {
    throw new Error(`Failed to process Word document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Process PDF documents
async function processPDFDocument(file: File): Promise<string> {
  try {
    // For PDF processing in the browser, we'll use a simpler approach
    // Since pdf-parse requires Node.js, we'll implement a basic text extraction
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const text = new TextDecoder().decode(uint8Array);
    
    // Basic PDF text extraction (this is a simplified approach)
    // In a production environment, you'd want to use a proper PDF parsing library
    const textMatch = text.match(/BT\s*(.*?)\s*ET/gs);
    if (textMatch) {
      return textMatch
        .map(match => match.replace(/BT\s*|\s*ET/g, ''))
        .join(' ')
        .replace(/Tj\s*/g, ' ')
        .replace(/[()]/g, '')
        .trim();
    }
    
    // Fallback: try to extract readable text
    const readableText = text.replace(/[^\x20-\x7E\s]/g, ' ').replace(/\s+/g, ' ').trim();
    if (readableText.length > 50) {
      return readableText;
    }
    
    throw new Error('Could not extract readable text from PDF');
  } catch (error) {
    throw new Error(`Failed to process PDF document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Process plain text files
async function processTextDocument(file: File): Promise<string> {
  try {
    return await file.text();
  } catch (error) {
    throw new Error(`Failed to process text document: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Main file processing function
export async function processFile(file: File): Promise<FileProcessingResult> {
  const fileName = file.name;
  const fileExtension = fileName.split('.').pop()?.toLowerCase();
  
  try {
    let text: string;
    let fileType: string;
    
    switch (fileExtension) {
      case 'docx':
        text = await processWordDocument(file);
        fileType = 'Word Document';
        break;
      case 'pdf':
        text = await processPDFDocument(file);
        fileType = 'PDF Document';
        break;
      case 'txt':
        text = await processTextDocument(file);
        fileType = 'Text Document';
        break;
      default:
        throw new Error(`Unsupported file type: ${fileExtension}`);
    }
    
    if (!text.trim()) {
      throw new Error('No readable text found in the document');
    }
    
    return {
      text: text.trim(),
      fileName,
      fileType,
    };
  } catch (error) {
    return {
      text: '',
      fileName,
      fileType: 'Unknown',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

// Validate file before processing
export function validateFile(file: File): { isValid: boolean; error?: string } {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['docx', 'pdf', 'txt'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  if (!fileExtension || !allowedTypes.includes(fileExtension)) {
    return {
      isValid: false,
      error: 'Please upload a Word (.docx), PDF (.pdf), or Text (.txt) file'
    };
  }
  
  if (file.size > maxSize) {
    return {
      isValid: false,
      error: 'File size must be less than 10MB'
    };
  }
  
  return { isValid: true };
}