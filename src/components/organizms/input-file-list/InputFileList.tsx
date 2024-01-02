import { ResourceOption } from '@/components/atoms/resource-option/ResourceOption';
import React from 'react';

interface InputFileListProps {
  fileList: File[];
  removeFile: (index: number) => void;
}

export const InputFileList = ({ fileList, removeFile }: InputFileListProps) => {
  return (
    <div>
      {fileList.length > 0 ? (
        fileList.map((file, index) => (
          <ResourceOption
            key={index}
            resource={{
              name: file.name,
              file: file,
            }}
            onDelete={() => removeFile(index)}
          />
        ))
      ) : (
        <div className="w-full h-[100px] bg-gray-50 rounded-xl text-gray-600 flex justify-center items-center text-center">
          <p>変換対象データがありません</p>
        </div>
      )}
    </div>
  );
};
