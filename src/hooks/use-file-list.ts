import { useState } from 'react';

export const useFileList = (initialFileList: File[]) => {
  const [fileList, setFileList] = useState<File[]>(initialFileList);

  // fileを追加する
  const addFile = (file: File) => setFileList([...fileList, file]);

  // 指定した位置(配列のindex)に存在するfileを削除する
  const removeFile = (index: number) => {
    setFileList((prev) => prev.filter((_, i) => i !== index));
  };

  return { fileList, addFile, removeFile };
};
