import { useState } from 'react';
import ImageUploader from './InputFile';
// import ImageUploader from './ImageUploader';

export default function InputFileForm() {
  const [image, setImage] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleUpload = async () => {
    if (!image) {
      setError('Выберите изображение');
      return;
    }
    if (!text.trim()) {
      setError('Введите текст');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('text', text);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Ошибка отправки данных');
      }

      const result = await response.json();
      console.log('Данные успешно загружены:', result);
      alert('Успешно отправлено!');
    } catch (error) {
      console.error('Ошибка загрузки:', error);
      setError('Не удалось отправить данные');
    }
    console.log(formData.getAll);
    
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-semibold mb-4">Форма с текстом и изображением</h1>
      
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Введите текст"
        className="border p-2 w-full mb-4 rounded"
      />

     

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        type="button"
        onClick={handleUpload}
        disabled={!image || !text.trim()}
        className={`mt-4 px-4 py-2 w-full rounded ${
          !image || !text.trim()
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        }`}
      >
        Отправить
      </button>

      {image && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Выбранный файл: {image.name}</p>
          <p className="text-sm text-gray-600">Размер: {(image.size / 1024).toFixed(1)} KB</p>
        </div>
      )}
    </div>
  );
}