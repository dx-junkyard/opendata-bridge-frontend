import Image from 'next/image';
import { Button } from '@/components/atoms/ui-parts/button/Button';
import Link from 'next/link';

interface ActionCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  thumbnails: string;
  url?: string;
}

export const ActionCard = ({
  title,
  description,
  buttonLabel,
  thumbnails,
  url,
}: ActionCardProps) => {
  return (
    <div className="h-[320px] bg-white flex flex-col justify-center items-center space-y-5 rounded-3xl">
      <Image src={thumbnails} alt={title} height={100} width={100} />
      <span className="text-sm text-center text-black mx-[50px] inline-block">
        {description}
      </span>
      {url ? (
        <Link href={url} target="_blank">
          <Button color={'secondary'} size={'xl'} label={buttonLabel} />
        </Link>
      ) : (
        <div className="h-[56px] w-full" />
      )}
    </div>
  );
};
