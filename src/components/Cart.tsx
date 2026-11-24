import { styled } from 'styled-components';
import { products } from '../data/products';
import { Button } from './ui';

const Panel = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.surface};
`;
const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  h2 { margin: 0; }
`;
const List = styled.ul`list-style: none; padding: 0; margin: 16px 0;`;
const Item = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
  padding: 12px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;
const Controls = styled.div`display: flex; align-items: center; gap: 8px;`;
const Muted = styled.p`color: ${({ theme }) => theme.colors.muted};`;

interface CartProps {
  items: Record<number, number>;
  onChangeQuantity: (id: number, change: number) => void;
  onClose: () => void;
}

export function Cart({ items, onChangeQuantity, onClose }: CartProps) {
  const cartProducts = products.filter((product) => (items[product.id] ?? 0) > 0);
  const total = cartProducts.reduce((sum, product) => sum + product.price * items[product.id], 0);

  return (
    <Panel id="cart" aria-labelledby="cart-title">
      <Heading>
        <h2 id="cart-title">Корзина</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>Закрыть</Button>
      </Heading>
      {cartProducts.length === 0 ? (
        <Muted>Корзина пока пуста. Добавьте продукты из каталога.</Muted>
      ) : (
        <>
          <List>
            {cartProducts.map((product) => (
              <Item key={product.id}>
                <div>{product.emoji} <strong>{product.name}</strong> — {product.price} ₽ / {product.unit}</div>
                <Controls>
                  <Button variant="outline" size="sm" aria-label={`Уменьшить количество: ${product.name}`} onClick={() => onChangeQuantity(product.id, -1)}>−</Button>
                  <span aria-label={`Количество: ${items[product.id]}`}>{items[product.id]}</span>
                  <Button variant="outline" size="sm" aria-label={`Увеличить количество: ${product.name}`} onClick={() => onChangeQuantity(product.id, 1)}>+</Button>
                  <Button variant="ghost" size="sm" aria-label={`Удалить ${product.name}`} onClick={() => onChangeQuantity(product.id, -items[product.id])}>Удалить</Button>
                </Controls>
              </Item>
            ))}
          </List>
          <strong>Итого: {total} ₽</strong>
        </>
      )}
    </Panel>
  );
}
