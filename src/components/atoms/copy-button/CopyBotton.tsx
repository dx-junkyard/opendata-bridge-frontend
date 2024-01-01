import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

const CopyButton = ({ value }: { value: string }) => {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const onCopy = () => {
    if (isCopied) return;
    copyToClipboard(value);
  };

  return (
    <div className="rounded hover:bg-zinc-500" onClick={() => onCopy()}>
      {isCopied ? (
        <FontAwesomeIcon icon={faCheck} />
      ) : (
        <FontAwesomeIcon icon={faCopy} />
      )}
    </div>
  );
};

export default CopyButton;
