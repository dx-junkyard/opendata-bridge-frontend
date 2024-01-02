import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

type ButtonColorType = 'primary' | 'secondary';

type ButtonSizeType = '3xl' | '2xl' | 'xl' | 'large' | 'medium';

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
  onClick?: () => void;
  /**
   * Is this the principal call to action on the page?
   */
  isLoading?: boolean;
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

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  color,
  size,
  label,
  onClick,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={
        [selectColor(color), selectSize(size)].join(' ') + ' rounded-lg'
      }
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <span>
          <FontAwesomeIcon
            className="animate-spin"
            icon={faCircleNotch}
            width={24}
            height={24}
          />{' '}
          登録中
        </span>
      ) : (
        label
      )}
    </button>
  );
};
