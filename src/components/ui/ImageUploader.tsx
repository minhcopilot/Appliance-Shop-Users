"use client";
import React, { useState } from "react";

interface ImageUploaderProps {
  maxFileSize?: number;
  acceptedFileTypes?: string;
  onFileSelected?: (file: File | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  maxFileSize = 1024 * 1024,
  acceptedFileTypes = "image/*",
  onFileSelected,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > maxFileSize) {
        alert(
          `Kích thước file vượt quá giới hạn ${maxFileSize / (1024 * 1024)} MB`
        );
        return;
      }
      if (!acceptedFileTypes.includes(file.type)) {
        alert(
          `Định dạng file không được hỗ trợ. Vui lòng chọn file có định dạng ${acceptedFileTypes}`
        );
        return;
      }
      setSelectedFile(file);
      onFileSelected?.(file);
    } else {
      setSelectedFile(null);
      onFileSelected?.(null);
    }
  };

  return (
    <div className="flex items-center justify-center my-5">
      <label
        htmlFor="file-input"
        className="cursor-pointer bg-white font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500"
      >
        <span className="border border-yellow-500 px-4 py-2 rounded-md">
          Chọn ảnh
        </span>
        <input
          id="file-input"
          type="file"
          className="sr-only"
          accept={acceptedFileTypes}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
