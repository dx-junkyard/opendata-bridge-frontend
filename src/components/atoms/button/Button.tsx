import React from 'react';

type ButtonColorType = 'primary' | 'secondary';

type ButtonSizeType = 'xl' | 'large' | 'medium';

interface ButtonProps {
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
  /**
   * Optional click handler
   */
  onClick: () => void;
}

const selectColor = (color: ButtonColorType) => {
  switch (color) {
    case 'primary':
      return 'bg-blue-700 text-white';
    case 'secondary':
      return 'bg-white text-blue-700 border border-blue-700';
  }
};

const selectSize = (size: ButtonSizeType) => {
  switch (size) {
    case 'xl':
      return 'min-w-[136px] h-[48px] text-xs';
    case 'large':
      return 'min-w-[96px] h-[48px] text-xs';
  }
};

/**
 * Primary UI component for user interaction
 */
export const Button = ({ color, size, label, onClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className={
        [selectColor(color), selectSize(size)].join(' ') + ' rounded-lg'
      }
      onClick={onClick}
    >
      {label}
    </button>
  );
};
