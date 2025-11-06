# SearchInput Component

Компонент поискового поля с debounce, кнопкой очистки и loading состоянием.

## Возможности

- 🔍 Иконка поиска с индикатором загрузки
- ⏱️ Встроенный debounce для оптимизации
- ❌ Кнопка очистки
- 🔄 Loading state с анимацией
- ⌨️ Поддержка Enter для поиска
- 🎯 Auto focus опция
- ♿ Accessibility
- 🎨 Полная интеграция с дизайн-системой

## Использование

### Базовое использование

```tsx
import { SearchInput } from '@/components/ui';

const [search, setSearch] = useState('');

<SearchInput 
  value={search}
  onChange={setSearch}
  placeholder="Search places..."
/>
```

### С обработчиком поиска

```tsx
const [search, setSearch] = useState('');

<SearchInput
  value={search}
  onChange={setSearch}
  onSearch={(value) => {
    console.log('Searching for:', value);
    // Выполнить поиск
  }}
  placeholder="Search..."
/>
// onSearch вызывается при нажатии Enter
```

### С loading состоянием

```tsx
const [search, setSearch] = useState('');
const [loading, setLoading] = useState(false);

const handleSearch = async (value: string) => {
  setLoading(true);
  try {
    await searchAPI(value);
  } finally {
    setLoading(false);
  }
};

<SearchInput
  value={search}
  onChange={setSearch}
  onSearch={handleSearch}
  loading={loading}
  placeholder="Search..."
/>
```

### Настройка debounce

```tsx
<SearchInput
  value={search}
  onChange={setSearch}
  debounceDelay={500} // 500ms вместо 300ms по умолчанию
  placeholder="Search..."
/>
```

### Без кнопки очистки

```tsx
<SearchInput
  value={search}
  onChange={setSearch}
  showClearButton={false}
  placeholder="Search..."
/>
```

### С auto focus

```tsx
<SearchInput
  value={search}
  onChange={setSearch}
  autoFocus
  placeholder="Search..."
/>
```

## Props

| Prop | Type | Default | Описание |
|------|------|---------|----------|
| `value` | `string` | - | Текущее значение поиска (обязательно) |
| `onChange` | `(value: string) => void` | - | Callback при изменении значения (debounced) |
| `onSearch` | `(value: string) => void` | - | Callback при явном поиске (Enter или кнопка) |
| `placeholder` | `string` | `'Search...'` | Placeholder текст |
| `loading` | `boolean` | `false` | Показывать индикатор загрузки |
| `disabled` | `boolean` | `false` | Отключить input |
| `debounceDelay` | `number` | `300` | Задержка debounce в миллисекундах |
| `showClearButton` | `boolean` | `true` | Показывать кнопку очистки |
| `autoFocus` | `boolean` | `false` | Auto focus при монтировании |
| `className` | `string` | - | Дополнительные CSS классы |

## Debounce поведение

Компонент использует встроенный debounce для оптимизации:

- **onChange** вызывается с задержкой (по умолчанию 300ms)
- **onSearch** вызывается немедленно (без debounce) при Enter
- Локальное значение обновляется мгновенно для UX

```tsx
const [search, setSearch] = useState('');

<SearchInput
  value={search}
  onChange={(value) => {
    // Вызывается через 300ms после остановки ввода
    setSearch(value);
    performSearch(value);
  }}
  onSearch={(value) => {
    // Вызывается немедленно при Enter
    performImmediateSearch(value);
  }}
/>
```

## Примеры использования

### Поиск мест на карте

```tsx
const MapSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const data = await searchPlaces(searchQuery);
      setResults(data);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchInput
        value={query}
        onChange={(value) => {
          setQuery(value);
          handleSearch(value);
        }}
        loading={loading}
        placeholder="Search places in Barcelona..."
      />
      <SearchResults results={results} />
    </div>
  );
};
```

### С фильтрацией списка

```tsx
const FilterableList = ({ items }) => {
  const [search, setSearch] = useState('');

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Filter items..."
        debounceDelay={200}
      />
      <List items={filteredItems} />
    </div>
  );
};
```

### С историей поиска

```tsx
const SearchWithHistory = () => {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleSearch = (value: string) => {
    if (value.trim() && !history.includes(value)) {
      setHistory([value, ...history].slice(0, 5));
      localStorage.setItem('searchHistory', JSON.stringify(history));
    }
  };

  return (
    <div>
      <SearchInput
        value={search}
        onChange={setSearch}
        onSearch={handleSearch}
        placeholder="Search..."
      />
      {history.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground">Recent:</p>
          {history.map((term) => (
            <button
              key={term}
              onClick={() => setSearch(term)}
              className="text-sm hover:underline"
            >
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### С автодополнением

```tsx
const AutocompleteSearch = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSuggestions = async (query: string) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const data = await getSuggestions(query);
      setSuggestions(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <SearchInput
        value={search}
        onChange={(value) => {
          setSearch(value);
          fetchSuggestions(value);
        }}
        loading={loading}
        placeholder="Type to see suggestions..."
      />
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-md border bg-background shadow-lg">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setSearch(suggestion)}
              className="w-full px-4 py-2 text-left hover:bg-muted"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

## Стилизация

### Иконки
- **Search icon**: По умолчанию слева
- **Loading spinner**: Заменяет search icon при loading
- **Clear button**: Справа, показывается при наличии текста

### Состояния
- **Normal**: Обычный border
- **Focus**: Primary border
- **Loading**: Spinner анимация
- **Disabled**: Opacity 50%

### Кастомизация

```tsx
<SearchInput
  className="max-w-md"
  value={search}
  onChange={setSearch}
/>
```

## Keyboard shortcuts

- **Enter**: Вызывает onSearch (если задан)
- **Escape**: Можно добавить через onKeyDown
- **Tab**: Стандартная навигация

## Performance tips

1. **Оптимальный debounce**: 300-500ms для поиска по API
2. **Короткий debounce**: 100-200ms для локальной фильтрации
3. **Без debounce**: Используйте только localValue для мгновенного UI

```tsx
// Для API поиска
<SearchInput debounceDelay={400} />

// Для локальной фильтрации
<SearchInput debounceDelay={150} />
```

## Accessibility

- Правильный `type="search"` для семантики
- ARIA label для кнопки очистки
- Keyboard navigation
- Screen reader friendly

## Технические детали

- Использует React useRef для debounce таймера
- Автоматическая очистка таймера при unmount
- Controlled component pattern
- TypeScript типизация
- Интеграция с Input компонентом из shadcn/ui
