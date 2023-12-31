import { Resource } from '@/types/resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

interface ResourceOptionProps {
  resource: Resource;
  onDelete: () => void;
}

export const ResourceOption = ({ resource, onDelete }: ResourceOptionProps) => {
  return (
    <div className="border-gray-300 border-b w-full h-[50px] bg-white text-black flex justify-center items-center">
      <div className="text-center">
        <FontAwesomeIcon icon={faCircle} width={16} height={16} />
      </div>
      <div className="m-[16px] w-[90%]">
        <p className="text-sm text-blue-800 font-bold">{resource.name}</p>
      </div>
      <button
        className="text-center flex justify-center items-center space-x-2"
        onClick={onDelete}
      >
        <FontAwesomeIcon icon={faTrash} width={16} height={16} />
      </button>
    </div>
  );
};
