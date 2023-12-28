import { Dataset } from '@/types/dataset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

interface DatasetCardProps {
  dataset: Dataset;
}

export const DatasetCard = ({ dataset }: DatasetCardProps) => {
  return (
    <Link
      href={dataset.url}
      className="border-gray-300 border-b w-full h-[86px] bg-white text-black flex justify-center items-center"
      target="_blank"
    >
      <div className="text-center">
        <FontAwesomeIcon icon={faBuilding} />
      </div>
      <div className="m-[16px] w-[90%]">
        <p className="text-sm underline">{dataset.title}</p>
        <p className="text-sm text-gray-500">{dataset.organization}</p>
      </div>
      <div className="text-center">
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </Link>
  );
};
