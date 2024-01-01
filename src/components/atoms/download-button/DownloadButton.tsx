import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface DownloadButtonProps {
  filename: string;
  value: string;
}

const DownloadButton = ({ filename, value }: DownloadButtonProps) => {
  const downloadAsFile = () => {
    if (typeof window === 'undefined') {
      return;
    }

    const blob = new Blob([value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded hover:bg-zinc-500" onClick={() => downloadAsFile()}>
      <FontAwesomeIcon icon={faDownload} />
    </div>
  );
};

export default DownloadButton;
