import { Button } from '@/components/atoms/button/Button';

interface SearchFilterProps {
  label: string;
  isSelected: boolean;
  onClick: (label: string) => void;
}

export const SearchFilter = ({
  label,
  isSelected,
  onClick,
}: SearchFilterProps) => {
  const color = isSelected ? 'primary' : 'secondary';

  return (
    <Button
      color={color}
      size={'xl'}
      label={label}
      onClick={() => onClick(label)}
    />
  );
};
