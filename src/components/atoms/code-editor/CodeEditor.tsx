import React from 'react';

import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  initialCode: string;
}

const CodeEditor = ({ initialCode }: CodeEditorProps) => {
  return (
    <div className="w-full h-[300px]">
      <Editor
        height="100%"
        width="100%"
        defaultLanguage="python"
        defaultValue={initialCode}
      />
    </div>
  );
};

export default CodeEditor;
