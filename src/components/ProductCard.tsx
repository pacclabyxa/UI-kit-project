import { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import type { Product } from '../data/products';
import { Badge, Button, Card } from './ui';

const Picture = styled.div`
  display: grid;
  place-items: center;
  height: 100px;
  margin-bottom: 16px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.secondary};
  font-size: 55px;
`;

const Name = styled.h3`margin: 12px 0 8px;`;
const Description = styled.p`
  min-height: 36px;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 14px;
  line-height: 1.4;
`;
const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;
const Price = styled.strong`white-space: nowrap;`;
const Unit = styled.span`color: ${({ theme }) => theme.colors.muted}; font-size: 12px; font-weight: normal;`;

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function handleAdd() {
    setLoading(true);
    timer.current = setTimeout(() => {
      onAdd(product);
      setLoading(false);
    }, 700);
  }

  return (
    <Card>
      <Picture role="img" aria-label={product.name}>{product.emoji}</Picture>
      <Badge>{product.category}</Badge>
      <Name>{product.name}</Name>
      <Description>{product.description}</Description>
      <Bottom>
        <Price>{product.price} ₽ <Unit>/ {product.unit}</Unit></Price>
        <Button size="sm" loading={loading} onClick={handleAdd} aria-label={`Добавить ${product.name} в корзину`}>
          {loading ? 'Добавляем' : 'В корзину'}
        </Button>
      </Bottom>
    </Card>
  );
}
