# API Mock Functions

## Search API

### `mockSearchAPI(query: string)`

Mock функция для поиска мест и активностей.

**Параметры:**
- `query` - строка поискового запроса

**Возвращает:**
```typescript
{
  results: SearchResult[],  // Массив результатов поиска
  total: number             // Общее количество найденных результатов
}
```

**Особенности:**
- Имитирует задержку API (500ms)
- Поиск работает по полям: `name`, `location`, `category`
- Чувствителен к регистру (нечувствительный поиск)
- Возвращает все результаты, если запрос пустой

**Данные в базе:**
- **29 записей** (места и активности)
- **11 яхт-туров** - поиск по слову "яхт"
- **3 винных тура** - поиск по слову "вин"
- **3 пляжа** - поиск по слову "пляж"
- **3 SPA центра** - поиск по слову "spa"
- **2 дайвинг активности** - поиск по слову "дайв"

**Примеры использования:**

```typescript
// Поиск яхт
const { results, total } = await mockSearchAPI('яхт');
// results: 11 результатов, total: 11

// Поиск по локации
const { results, total } = await mockSearchAPI('дубровник');
// results: все места/активности в Дубровнике

// Поиск SPA
const { results, total } = await mockSearchAPI('spa');
// results: 3 SPA центра
```

**Использование в компонентах:**

```typescript
import { mockSearchAPI } from '@/lib/api/search';

// В компоненте
const handleSearch = async (query: string) => {
  const { results, total } = await mockSearchAPI(query);
  setResults(results);
  setTotalCount(total);
};
```
