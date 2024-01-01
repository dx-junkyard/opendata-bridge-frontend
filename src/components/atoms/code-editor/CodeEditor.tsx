import React from 'react';

import Editor from '@monaco-editor/react';
import DownloadButton from '@/components/atoms/download-button/DownloadButton';
import CopyButton from '@/components/atoms/copy-button/CopyBotton';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
  initialCode: string;
}

const CodeEditor = ({ initialCode }: CodeEditorProps) => {
  const [code, setCode] = React.useState(initialCode);

  function handleEditorChange(
    value: string | undefined,
    event: editor.IModelContentChangedEvent
  ) {
    setCode(value || '');
  }

  return (
    <div className="w-full font-sans bg-zinc-950 h-[300px]">
      <div className="flex items-center justify-between w-full px-6 py-3 bg-zinc-800 text-zinc-100">
        <span className="text-xs lowercase">python</span>
        <div className="flex items-center space-x-2">
          <DownloadButton filename={'transform.py'} value={code} />
          <CopyButton value={code} />
        </div>
      </div>
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        defaultLanguage="python"
        defaultValue={initialCode}
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
