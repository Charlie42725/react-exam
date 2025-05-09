export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(
    () => {
      // 可以添加複製成功的提示
      console.log('Text copied to clipboard');
    },
    (err) => {
      console.error('Failed to copy text: ', err);
    }
  );
}; 