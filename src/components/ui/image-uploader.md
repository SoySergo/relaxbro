# ImageUploader Component

Компонент для загрузки изображений с drag & drop функционалом, превью и валидацией.

## Возможности

- 📤 Drag & Drop функционал
- 🖼️ Preview загруженных изображений
- ✅ Валидация типа и размера файлов
- 🗑️ Удаление отдельных изображений
- 📊 Отображение прогресса загрузки
- 🌍 Полная поддержка i18n
- 🎨 Адаптивная сетка превью
- ♿ Accessibility
- 🚫 Состояние disabled

## Использование

### Базовое использование

```tsx
import { ImageUploader, type ImageFile } from '@/components/ui';

const [images, setImages] = useState<ImageFile[]>([]);

<ImageUploader 
  value={images}
  onChange={setImages}
/>
```

### С настройками

```tsx
<ImageUploader
  value={images}
  onChange={setImages}
  maxFiles={3}
  maxSize={10 * 1024 * 1024} // 10MB
  accept="image/*"
/>
```

### С валидацией и ошибками

```tsx
const [images, setImages] = useState<ImageFile[]>([]);
const [error, setError] = useState<string | null>(null);

<ImageUploader
  value={images}
  onChange={(newImages) => {
    setImages(newImages);
    setError(null);
  }}
  error={error}
  maxFiles={5}
/>
```

### Disabled состояние

```tsx
<ImageUploader
  value={images}
  onChange={setImages}
  disabled={isUploading}
/>
```

## Props

| Prop | Type | Default | Описание |
|------|------|---------|----------|
| `value` | `ImageFile[]` | `[]` | Массив загруженных изображений |
| `onChange` | `(files: ImageFile[]) => void` | - | Callback при изменении списка файлов |
| `maxFiles` | `number` | `5` | Максимальное количество файлов |
| `maxSize` | `number` | `5242880` (5MB) | Максимальный размер файла в байтах |
| `accept` | `string` | `'image/*'` | Принимаемые типы файлов |
| `disabled` | `boolean` | `false` | Отключить компонент |
| `error` | `string` | - | Внешнее сообщение об ошибке |
| `className` | `string` | - | Дополнительные CSS классы |

## ImageFile Type

```tsx
interface ImageFile {
  file: File;        // Оригинальный File объект
  preview: string;   // URL для превью (blob URL)
  id: string;        // Уникальный идентификатор
}
```

## Валидация

### Поддерживаемые форматы
- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

### Ограничения по умолчанию
- Максимальный размер: 5MB
- Максимальное количество: 5 файлов

### Сообщения об ошибках
- Неподдерживаемый формат
- Превышен размер файла
- Превышено количество файлов

Все сообщения автоматически переводятся через i18n.

## Примеры использования

### В форме создания отзыва

```tsx
const ReviewForm = () => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const t = useTranslations();

  const handleSubmit = async () => {
    const formData = new FormData();
    images.forEach((img) => {
      formData.append('images', img.file);
    });
    
    await uploadReview(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Label>{t('review.addPhotos')}</Label>
      <ImageUploader
        value={images}
        onChange={setImages}
        maxFiles={10}
      />
      <Button type="submit">
        {t('common.submit')}
      </Button>
    </form>
  );
};
```

### С прогресс-баром загрузки

```tsx
const [images, setImages] = useState<ImageFile[]>([]);
const [uploading, setUploading] = useState(false);
const [uploadProgress, setUploadProgress] = useState(0);

const handleUpload = async (newImages: ImageFile[]) => {
  setUploading(true);
  
  for (let i = 0; i < newImages.length; i++) {
    await uploadImage(newImages[i].file);
    setUploadProgress((i + 1) / newImages.length * 100);
  }
  
  setImages(newImages);
  setUploading(false);
};

<ImageUploader
  value={images}
  onChange={handleUpload}
  disabled={uploading}
/>
{uploading && <Progress value={uploadProgress} />}
```

### С автосохранением в localStorage

```tsx
const [images, setImages] = useState<ImageFile[]>(() => {
  const saved = localStorage.getItem('draft-images');
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem('draft-images', JSON.stringify(images));
}, [images]);

<ImageUploader
  value={images}
  onChange={setImages}
/>
```

## Стилизация

### Цвета состояний
- Обычное: `border-border`
- Hover: `hover:border-primary/50`
- Drag active: `border-primary bg-primary/5`
- Error: `border-error-500`
- Disabled: `opacity-50 cursor-not-allowed`

### Кастомизация

```tsx
<ImageUploader
  className="max-w-2xl"
  value={images}
  onChange={setImages}
/>
```

## Переводы (i18n)

Компонент использует следующие ключи переводов:

```json
{
  "ui.image": {
    "dragDrop": "Перетащите изображения сюда",
    "dropHere": "Отпустите файлы здесь",
    "or": "или",
    "browse": "выберите файлы",
    "acceptedTypes": "Поддерживаемые форматы",
    "maxSize": "Максимум {size}MB",
    "maxFiles": "Максимум {count} файлов",
    "invalidType": "Неподдерживаемый формат. Используйте: {types}",
    "remove": "Удалить",
    "noImages": "Нет загруженных изображений",
    "uploaded": "загружено"
  }
}
```

## Best Practices

### Memory Management
Компонент автоматически очищает blob URLs при размонтировании:

```tsx
useEffect(() => {
  return () => {
    value.forEach((img) => {
      URL.revokeObjectURL(img.preview);
    });
  };
}, [value]);
```

### Оптимизация
- Используйте debounce при автосохранении
- Сжимайте изображения перед загрузкой на сервер
- Показывайте прогресс загрузки для UX

### Accessibility
- Все интерактивные элементы доступны с клавиатуры
- Screen reader поддержка для кнопок
- Семантичные ARIA атрибуты

## Технические детали

- Построен на React Hooks (useState, useRef, useEffect)
- Использует FileReader API и blob URLs для превью
- Валидация на стороне клиента
- Поддержка controlled component pattern
- TypeScript типизация
- next-intl для интернационализации
