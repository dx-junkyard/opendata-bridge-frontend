import Link from 'next/link';
import { FunctionComponent, memo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CodeEditor from '../code-editor/CodeEditor';

const MemoizedReactMarkdown: FunctionComponent<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
);

interface MarkdownAreaProps {
  value: string;
}

const MarkdownArea = ({ value }: MarkdownAreaProps) => {
  return (
    <div className="w-full text-black p-3">
      <MemoizedReactMarkdown
        className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
        remarkPlugins={[remarkGfm, remarkMath]}
        components={{
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc ml-4">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal ml-4">{children}</ol>;
          },
          li({ children }) {
            return <li className="mb-2 last:mb-0">{children}</li>;
          },
          a({ children, ...props }) {
            const href = props.href;

            // リンクの中身がない場合はリンクを表示しない
            if (href === undefined || href === '') {
              return <>{children}</>;
            }

            return (
              <Link
                className="text-blue-700"
                href={href}
                rel="noopener noreferrer"
                target="_blank"
              >
                {children}
              </Link>
            );
          },
          code({ node, className, children, ...rest }) {
            const match = /language-(\w+)/.exec(className || '');

            if (!match) {
              return (
                <code className={className} {...rest}>
                  {children}
                </code>
              );
            }

            return (
              <CodeEditor
                key={Math.random()}
                language={'python'}
                code={String(children).replace(/\n$/, '')}
              />
            );
          },
        }}
      >
        {value}
      </MemoizedReactMarkdown>
    </div>
  );
};

export default MarkdownArea;
