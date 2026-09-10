export type GameMode = 'matching' | 'odd_one_out' | 'sorting';

export interface MatchingItem {
  id: string;
  leftValue: string; // e.g. "A" or "1" or "Red"
  leftLabel: string;
  leftColor: string; // Tailwind color class or hex
  rightValue: string; // e.g. "Apple"
  rightEmoji: string; // e.g. "🍎"
  rightLabel: string;
  phonics: string; // e.g. "A is for Apple"
}

export interface MatchingLevel {
  id: number;
  title: string;
  subtitle: string;
  theme: 'alphabet' | 'numbers' | 'animals' | 'colors';
  items: MatchingItem[];
}

export interface OddItemOption {
  id: string;
  emoji: string;
  label: string;
  isOdd: boolean;
}

export interface OddOneOutLevel {
  id: number;
  prompt: string;
  options: OddItemOption[];
  reason: string;
}

export interface SortableItem {
  id: string;
  emoji: string;
  label: string;
  targetBasketId: string;
}

export interface Basket {
  id: string;
  name: string;
  colorName: string;
  colorHex: string;
  borderHex: string;
  bgHex: string;
}

export interface SortingLevel {
  id: number;
  prompt: string;
  baskets: Basket[];
  items: SortableItem[];
}

export interface Connection {
  leftId: string;
  rightId: string;
}
