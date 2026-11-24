export type Category = 'Овощи' | 'Фрукты' | 'Молочное' | 'Бакалея';

export interface Product {
  id: number;
  name: string;
  category: Category;
  description: string;
  price: number;
  unit: string;
  emoji: string;
}

export const categories = ['Все продукты', 'Овощи', 'Фрукты', 'Молочное', 'Бакалея'];

export const products: Product[] = [
  { id: 1, name: 'Томаты черри', category: 'Овощи', description: 'Сладкие и сочные томаты', price: 189, unit: '250 г', emoji: '🍅' },
  { id: 2, name: 'Авокадо', category: 'Фрукты', description: 'Спелое и нежное авокадо', price: 249, unit: '2 шт', emoji: '🥑' },
  { id: 3, name: 'Молоко', category: 'Молочное', description: 'Натуральное молоко', price: 159, unit: '1 л', emoji: '🥛' },
  { id: 4, name: 'Бананы', category: 'Фрукты', description: 'Сладкие спелые бананы', price: 139, unit: '1 кг', emoji: '🍌' },
  { id: 5, name: 'Брокколи', category: 'Овощи', description: 'Свежая зелёная брокколи', price: 179, unit: '1 шт', emoji: '🥦' },
  { id: 6, name: 'Хлеб', category: 'Бакалея', description: 'Хлеб с хрустящей корочкой', price: 219, unit: '400 г', emoji: '🍞' },
  { id: 7, name: 'Клубника', category: 'Фрукты', description: 'Ароматная садовая клубника', price: 329, unit: '250 г', emoji: '🍓' },
  { id: 8, name: 'Йогурт', category: 'Молочное', description: 'Натуральный йогурт', price: 119, unit: '200 г', emoji: '🥣' },
];
