import { useEffect, useState } from 'react';
import { styled, ThemeProvider } from 'styled-components';
import { Button, Grid, Input } from './components/ui';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { categories, products, type Product } from './data/products';
import { GlobalStyle } from './styles/global';
import { darkTheme, lightTheme } from './styles/theme';

type ThemeName = 'light' | 'dark';

function getInitialTheme(): ThemeName {
  try {
    const saved = localStorage.getItem('mini-market-theme');
    if (saved === 'light' || saved === 'dark') return saved;
  } catch {
    // Приложение работает и без доступа к localStorage.
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

const Header = styled.header`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;
const Logo = styled.a`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
`;
const HeaderActions = styled.div`display: flex; align-items: center; gap: 12px;`;
const Main = styled.main`max-width: 1200px; margin: 0 auto; padding: 40px 24px 70px;`;
const Intro = styled.div`margin-bottom: 28px; h1 { margin: 0 0 8px; } p { margin: 0; color: ${({ theme }) => theme.colors.muted}; }`;
const Filters = styled.div`display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;`;
const Search = styled.div`max-width: 360px; margin-bottom: 16px;`;
const Results = styled.p`color: ${({ theme }) => theme.colors.muted}; font-size: 14px; margin: 0 0 16px;`;
const Empty = styled.div`
  padding: 36px 20px;
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
  p { color: ${({ theme }) => theme.colors.muted}; }
`;
const ScreenReaderOnly = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip-path: inset(50%);
`;

export function App() {
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string>('Все продукты');
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('mini-market-theme', theme);
    } catch {
      // Выбор темы не сохраняется, если хранилище недоступно.
    }
  }, [theme]);

  const search = query.trim().toLocaleLowerCase('ru');
  const filteredProducts = products.filter((product) => {
    const matchesCategory = category === 'Все продукты' || product.category === category;
    const matchesSearch = product.name.toLocaleLowerCase('ru').includes(search);
    return matchesCategory && matchesSearch;
  });

  function addToCart(product: Product) {
    changeQuantity(product.id, 1);
    setMessage(`${product.name} добавлен в корзину`);
  }

  function changeQuantity(id: number, change: number) {
    setCart((current) => {
      const quantity = (current[id] ?? 0) + change;
      const updated = { ...current };
      if (quantity <= 0) delete updated[id];
      else updated[id] = quantity;
      return updated;
    });
  }

  function resetFilters() {
    setQuery('');
    setCategory('Все продукты');
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <Header>
        <HeaderContent>
          <Logo href="#catalog">🌿 Мини-маркет</Logo>
          <HeaderActions>
            <Button variant="secondary" size="sm" aria-expanded={cartOpen} aria-controls={cartOpen ? "cart" : undefined} onClick={() => setCartOpen(!cartOpen)}>
              Корзина: {cartCount}
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? 'Тёмная тема' : 'Светлая тема'}
            </Button>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <Main id="catalog">
        {cartOpen && <Cart items={cart} onChangeQuantity={changeQuantity} onClose={() => setCartOpen(false)} />}
        <Intro>
          <h1>Каталог продуктов</h1>
          <p>Выбирайте свежие продукты на каждый день.</p>
        </Intro>

        <Search>
          <Input
            aria-label="Поиск продуктов"
            placeholder="Поиск по названию..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Search>

        <Filters aria-label="Категории продуктов">
          {categories.map((item) => (
            <Button
              key={item}
              variant={category === item ? 'primary' : 'secondary'}
              size="sm"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </Button>
          ))}
        </Filters>

        <Results aria-live="polite">Найдено продуктов: {filteredProducts.length}</Results>
        {filteredProducts.length > 0 ? (
          <Grid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAdd={addToCart} />
            ))}
          </Grid>
        ) : (
          <Empty>
            <h2>Ничего не найдено</h2>
            <p>Попробуйте изменить запрос или категорию.</p>
            <Button variant="outline" onClick={resetFilters}>Сбросить фильтры</Button>
          </Empty>
        )}
      </Main>
      <ScreenReaderOnly role="status">{message}</ScreenReaderOnly>
    </ThemeProvider>
  );
}
