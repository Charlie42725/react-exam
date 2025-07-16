/**
 * 複製文本到剪貼簿
 * @param {string} text - 要複製的文本
 * @returns {Promise} - 返回Promise以支援async/await
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // 使用現代 Clipboard API
      await navigator.clipboard.writeText(text);
      console.log('Text copied to clipboard successfully');
      return true;
    } else {
      // 降級方案：使用傳統方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      
      if (successful) {
        console.log('Text copied to clipboard successfully (fallback)');
        return true;
      } else {
        throw new Error('Copy command failed');
      }
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    throw new Error(`複製失敗: ${err.message}`);
  }
}; 