import React, { memo } from 'react';

import Editor from '@monaco-editor/react';
import DownloadButton from '@/components/atoms/ui-parts/download-button/DownloadButton';
import CopyButton from '@/components/atoms/ui-parts/copy-button/CopyBotton';
import { editor } from 'monaco-editor';

interface CodeEditorProps {
  code: string;
  updateCode?: (updatedCode: string) => void;
  language: 'markdown' | 'python';
}

const CodeEditor = memo(({ code, updateCode, language }: CodeEditorProps) => {
  function handleEditorChange(
    value: string | undefined,
    event: editor.IModelContentChangedEvent
  ) {
    updateCode && updateCode(value || '');
  }

  return (
    <div className="w-full font-sans bg-zinc-950 h-[300px] mb-[100px]">
      <div className="flex items-center justify-between w-full px-6 py-3 bg-zinc-800 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <div className="flex items-center space-x-2">
          <DownloadButton filename={'transform.py'} value={code} />
          <CopyButton value={code} />
        </div>
      </div>
      <Editor
        height="100%"
        width="100%"
        theme="vs-dark"
        defaultLanguage={language}
        defaultValue={code}
        onChange={handleEditorChange}
        options={{
          readOnly: !updateCode,
        }}
      />
    </div>
  );
});
CodeEditor.displayName = 'CodeEditor';

export default CodeEditor;
