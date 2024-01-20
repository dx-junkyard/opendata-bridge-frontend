import React from 'react';
import { ResourceOption } from '@/components/atoms/ui-parts/resource-option/ResourceOption';

interface InputFileListProps {
  fileList: File[];
  removeFile: (index: number) => void;
}

export const InputFileList = ({ fileList, removeFile }: InputFileListProps) => {
  return (
    <div className="my-2">
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
        <div className="w-full h-[50px] bg-gray-50 rounded-xl text-gray-600 flex justify-center items-center text-center">
          <p>変換対象データがありません</p>
        </div>
      )}
    </div>
  );
};
