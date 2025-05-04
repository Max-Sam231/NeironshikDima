import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

type MarkdownRendererProps = {
  content: string;
};

const MessageMd: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  useEffect(() => {
    const parseMarkdown = async () => {
      try {
        const html = await marked.parse(content); // Асинхронный вызов
        setSanitizedHtml(DOMPurify.sanitize(html));
      } catch (error) {
        console.error('Ошибка парсинга:', error);
      }
    };

    parseMarkdown();
  }, [content]);

  return (
    <div
      className="markdown-content prose max-w-none"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default MessageMd;