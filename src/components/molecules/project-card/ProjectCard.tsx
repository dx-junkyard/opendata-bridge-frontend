import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      href={project.url}
      className="grid border-gray-300 border-b w-full h-[187px] grid-cols-2 bg-white"
    >
      <div className="flex flex-col justify-center">
        <h1 className="text-sm font-bold">{project.name}</h1>
        <p className="text-xs">{project.description}</p>
      </div>
      <div className="grid grid-cols-2 content-center gap-3">
        <Image src={'/dummy.png'} alt={'dummy'} width={216} height={144} />
        <Image src={'/dummy.png'} alt={'dummy'} width={216} height={144} />
      </div>
    </Link>
  );
};
