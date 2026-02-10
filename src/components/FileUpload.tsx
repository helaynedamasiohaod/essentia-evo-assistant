import React, { useState, useCallback } from 'react';
import { UploadCloudIcon, FileIcon, CheckCircleIcon } from '@/components/icons';

interface FileUploadProps {
  label: string;
  onFileSelect: (file: File | null) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ label, onFileSelect }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (selectedFile: File | null) => {
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    } else {
      setFile(null);
      onFileSelect(null);
      // You can add an alert or notification for invalid file type
    }
  };

  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files[0]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const inputElement = document.getElementById(`file-upload-${label}`) as HTMLInputElement;
      inputElement?.click();
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-text-secondary mb-2">{label}</label>
      <div
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`Drag and drop PDF file or click to ${file ? 'replace' : 'upload'}`}
        className={`relative flex justify-center items-center w-full h-32 px-6 pt-5 pb-6 border-2 border-dashed rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent-purple focus:ring-offset-2 ${
          isDragging ? 'border-accent-teal bg-bg-surface' : 'border-[#333] hover:border-[#555]'
        }`}
      >
        <input
          type="file"
          id={`file-upload-${label}`}
          name={`file-upload-${label}`}
          accept=".pdf"
          className="sr-only"
          onChange={handleInputChange}
        />
        {file ? (
          <div className="text-center text-accent-teal">
            <CheckCircleIcon className="mx-auto h-12 w-12" />
            <p className="mt-2 text-sm font-semibold">{file.name}</p>
            <button
                onClick={() => handleFileChange(null)}
                aria-label={`Remove ${file.name}`}
                className="mt-1 text-xs text-accent-orange hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-accent-orange rounded px-2 py-1 transition-opacity"
            >
                Remover
            </button>
          </div>
        ) : (
          <div className="space-y-1 text-center">
            <UploadCloudIcon className="mx-auto h-12 w-12 text-text-secondary" />
            <div className="flex text-sm text-text-secondary justify-center">
              <label
                htmlFor={`file-upload-${label}`}
                className="relative cursor-pointer bg-transparent rounded font-medium text-accent-purple hover:text-accent-teal focus-within:outline-none"
              >
                <span>Carregue um arquivo</span>
              </label>
              <p className="pl-1">ou arraste e solte</p>
            </div>
            <p className="text-xs text-text-secondary">PDF até 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
