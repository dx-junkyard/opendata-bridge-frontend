import React from 'react';

interface UploadButtonProps {
  /**
   * What background color to use
   */
  color: ButtonColorType;
  /**
   * How large should the button be?
   */
  size: ButtonSizeType;
  /**
   * Button contents
   */
  label: string;
  addFile: (file: File) => void;
}

type ButtonColorType = 'primary' | 'secondary';

type ButtonSizeType = '3xl' | '2xl' | 'xl' | 'large' | 'medium';

const selectColor = (color: ButtonColorType) => {
  switch (color) {
    case 'primary':
      return 'bg-blue-700 text-white';
    case 'secondary':
      return 'bg-white text-blue-700 border border-solid border-blue-700';
  }
};

const selectSize = (size: ButtonSizeType) => {
  switch (size) {
    case '3xl':
      return 'w-[382px] min-w-[382px] h-[56px] text-sm';
    case '2xl':
      return 'w-[230px] min-w-[230px] h-[56px] text-sm';
    case 'xl':
      return 'w-[136px] min-w-[136px] h-[56px] text-xs';
    case 'large':
      return 'w-[96px] min-w-[96px] h-[48px] text-xs';
  }
};

const UploadButton = ({ color, size, label, addFile }: UploadButtonProps) => {
  return (
    <label
      className={
        [selectColor(color), selectSize(size)].join(' ') +
        ' rounded-lg flex items-center justify-center'
      }
    >
      ファイルの追加
      <input
        className="hidden"
        name={label}
        type="file"
        accept="*/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files && files[0]) {
            addFile(files[0]);
          }
        }}
      />
    </label>
  );
};

export default UploadButton;
