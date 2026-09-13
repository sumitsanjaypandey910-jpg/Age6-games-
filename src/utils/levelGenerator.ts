import { MatchingLevel, MatchingItem, OddOneOutLevel, OddItemOption, SortingLevel, Basket, SortableItem } from '../types';
import { MATCHING_LEVELS, ODD_ONE_OUT_LEVELS, SORTING_LEVELS } from '../data/gameData';

// Rich collection of additional matching level templates for endless generation
const EXTENDED_MATCHING_LEVELS: MatchingLevel[] = [
  {
    id: 6,
    title: 'I J K L Safari',
    subtitle: 'Match jungle letters with wild friends!',
    theme: 'alphabet',
    items: [
      { id: 'I', leftValue: 'I', leftLabel: 'Letter I', leftColor: '#10B981', rightValue: 'Iguana', rightEmoji: '🦎', rightLabel: 'Iguana', phonics: 'I is for Iguana' },
      { id: 'J', leftValue: 'J', leftLabel: 'Letter J', leftColor: '#06B6D4', rightValue: 'Jellyfish', rightEmoji: '🪼', rightLabel: 'Jellyfish', phonics: 'J is for Jellyfish' },
      { id: 'K', leftValue: 'K', leftLabel: 'Letter K', leftColor: '#F59E0B', rightValue: 'Kangaroo', rightEmoji: '🦘', rightLabel: 'Kangaroo', phonics: 'K is for Kangaroo' },
      { id: 'L', leftValue: 'L', leftLabel: 'Letter L', leftColor: '#EF4444', rightValue: 'Lion', rightEmoji: '🦁', rightLabel: 'Lion', phonics: 'L is for Lion' },
    ],
  },
  {
    id: 7,
    title: 'M N O P Ocean & Land',
    subtitle: 'Discover sweet animal pals from M to P!',
    theme: 'alphabet',
    items: [
      { id: 'M', leftValue: 'M', leftLabel: 'Letter M', leftColor: '#8B5CF6', rightValue: 'Monkey', rightEmoji: '🐵', rightLabel: 'Monkey', phonics: 'M is for Monkey' },
      { id: 'N', leftValue: 'N', leftLabel: 'Letter N', leftColor: '#EC4899', rightValue: 'Nest', rightEmoji: '🪺', rightLabel: 'Bird Nest', phonics: 'N is for Nest' },
      { id: 'O', leftValue: 'O', leftLabel: 'Letter O', leftColor: '#3B82F6', rightValue: 'Octopus', rightEmoji: '🐙', rightLabel: 'Octopus', phonics: 'O is for Octopus' },
      { id: 'P', leftValue: 'P', leftLabel: 'Letter P', leftColor: '#10B981', rightValue: 'Penguin', rightEmoji: '🐧', rightLabel: 'Penguin', phonics: 'P is for Penguin' },
    ],
  },
  {
    id: 8,
    title: 'Q R S T Super Star',
    subtitle: 'Letters of royalty, rainbows and sunshine!',
    theme: 'alphabet',
    items: [
      { id: 'Q', leftValue: 'Q', leftLabel: 'Letter Q', leftColor: '#F59E0B', rightValue: 'Queen', rightEmoji: '👑', rightLabel: 'Queen', phonics: 'Q is for Queen' },
      { id: 'R', leftValue: 'R', leftLabel: 'Letter R', leftColor: '#EF4444', rightValue: 'Rainbow', rightEmoji: '🌈', rightLabel: 'Rainbow', phonics: 'R is for Rainbow' },
      { id: 'S', leftValue: 'S', leftLabel: 'Letter S', leftColor: '#EAB308', rightValue: 'Sun', rightEmoji: '☀️', rightLabel: 'Sun', phonics: 'S is for Sun' },
      { id: 'T', leftValue: 'T', leftLabel: 'Letter T', leftColor: '#06B6D4', rightValue: 'Tiger', rightEmoji: '🐯', rightLabel: 'Tiger', phonics: 'T is for Tiger' },
    ],
  },
  {
    id: 9,
    title: 'U V W X Wonder World',
    subtitle: 'Umbrellas, violins, and music all around!',
    theme: 'alphabet',
    items: [
      { id: 'U', leftValue: 'U', leftLabel: 'Letter U', leftColor: '#8B5CF6', rightValue: 'Umbrella', rightEmoji: '☂️', rightLabel: 'Umbrella', phonics: 'U is for Umbrella' },
      { id: 'V', leftValue: 'V', leftLabel: 'Letter V', leftColor: '#EC4899', rightValue: 'Violin', rightEmoji: '🎻', rightLabel: 'Violin', phonics: 'V is for Violin' },
      { id: 'W', leftValue: 'W', leftLabel: 'Letter W', leftColor: '#10B981', rightValue: 'Watermelon', rightEmoji: '🍉', rightLabel: 'Watermelon', phonics: 'W is for Watermelon' },
      { id: 'X', leftValue: 'X', leftLabel: 'Letter X', leftColor: '#3B82F6', rightValue: 'Xylophone', rightEmoji: '🎶', rightLabel: 'Xylophone', phonics: 'X is for Xylophone' },
    ],
  },
  {
    id: 10,
    title: 'Y & Z Finale Celebration',
    subtitle: 'From playful yo-yos to stripes on a zebra!',
    theme: 'alphabet',
    items: [
      { id: 'Y', leftValue: 'Y', leftLabel: 'Letter Y', leftColor: '#F59E0B', rightValue: 'Yo-yo', rightEmoji: '🪀', rightLabel: 'Yo-yo', phonics: 'Y is for Yo-yo' },
      { id: 'Z', leftValue: 'Z', leftLabel: 'Letter Z', leftColor: '#6366F1', rightValue: 'Zebra', rightEmoji: '🦓', rightLabel: 'Zebra', phonics: 'Z is for Zebra' },
      { id: 'A2', leftValue: 'A', leftLabel: 'Letter A', leftColor: '#EF4444', rightValue: 'Astronaut', rightEmoji: '🧑‍🚀', rightLabel: 'Astronaut', phonics: 'A is for Astronaut' },
      { id: 'B2', leftValue: 'B', leftLabel: 'Letter B', leftColor: '#06B6D4', rightValue: 'Butterfly', rightEmoji: '🦋', rightLabel: 'Butterfly', phonics: 'B is for Butterfly' },
    ],
  },
  {
    id: 11,
    title: 'Counting Fiesta 5 6 7 8',
    subtitle: 'Count colorful balloons, treats and gems!',
    theme: 'numbers',
    items: [
      { id: '5', leftValue: '5', leftLabel: 'Number Five', leftColor: '#EF4444', rightValue: 'Five Balloons', rightEmoji: '🎈 🎈 🎈 🎈 🎈', rightLabel: '5 Balloons', phonics: 'Five party balloons!' },
      { id: '6', leftValue: '6', leftLabel: 'Number Six', leftColor: '#3B82F6', rightValue: 'Six Donuts', rightEmoji: '🍩 🍩 🍩 🍩 🍩 🍩', rightLabel: '6 Donuts', phonics: 'Six sweet donuts!' },
      { id: '7', leftValue: '7', leftLabel: 'Number Seven', leftColor: '#10B981', rightValue: 'Seven Flowers', rightEmoji: '🌸 🌸 🌸 🌸 🌸 🌸 🌸', rightLabel: '7 Flowers', phonics: 'Seven pretty flowers!' },
      { id: '8', leftValue: '8', leftLabel: 'Number Eight', leftColor: '#8B5CF6', rightValue: 'Eight Gems', rightEmoji: '💎 💎 💎 💎 💎 💎 💎 💎', rightLabel: '8 Gems', phonics: 'Eight shiny gems!' },
    ],
  },
  {
    id: 12,
    title: 'More Hungry Animal Friends',
    subtitle: 'Match what each woodland buddy craves!',
    theme: 'animals',
    items: [
      { id: 'panda', leftValue: '🐼', leftLabel: 'Panda', leftColor: '#10B981', rightValue: 'Bamboo', rightEmoji: '🎋', rightLabel: 'Bamboo', phonics: 'Pandas munch crisp bamboo!' },
      { id: 'mouse', leftValue: '🐭', leftLabel: 'Mouse', leftColor: '#F59E0B', rightValue: 'Cheese', rightEmoji: '🧀', rightLabel: 'Cheese', phonics: 'Mice nibble on yummy cheese!' },
      { id: 'frog', leftValue: '🐸', leftLabel: 'Frog', leftColor: '#22C55E', rightValue: 'Fly', rightEmoji: '🪰', rightLabel: 'Fly', phonics: 'Frogs catch buzzing flies!' },
      { id: 'squirrel', leftValue: '🐿️', leftLabel: 'Squirrel', leftColor: '#B45309', rightValue: 'Acorn', rightEmoji: '🌰', rightLabel: 'Acorn', phonics: 'Squirrels collect crunchy acorns!' },
    ],
  },
  {
    id: 13,
    title: 'Opposites Day Adventure',
    subtitle: 'Match the opposing words and concepts!',
    theme: 'alphabet',
    items: [
      { id: 'hot', leftValue: '🔥 Hot', leftLabel: 'Fire', leftColor: '#EF4444', rightValue: 'Cold Ice', rightEmoji: '🧊', rightLabel: 'Cold Ice', phonics: 'Fire is hot and ice is cold!' },
      { id: 'big', leftValue: '🐘 Big', leftLabel: 'Elephant', leftColor: '#3B82F6', rightValue: 'Tiny Ant', rightEmoji: '🐜', rightLabel: 'Tiny Ant', phonics: 'Big elephant and tiny ant!' },
      { id: 'day', leftValue: '☀️ Day', leftLabel: 'Sun', leftColor: '#F59E0B', rightValue: 'Night Moon', rightEmoji: '🌙', rightLabel: 'Night Moon', phonics: 'Bright day and peaceful night!' },
      { id: 'fast', leftValue: '🐆 Fast', leftLabel: 'Cheetah', leftColor: '#10B981', rightValue: 'Slow Turtle', rightEmoji: '🐢', rightLabel: 'Slow Turtle', phonics: 'Fast cheetah and slow turtle!' },
    ],
  },
  {
    id: 14,
    title: 'Vehicles On The Move',
    subtitle: 'Where does each vehicle travel best?',
    theme: 'animals',
    items: [
      { id: 'car', leftValue: '🚗 Car', leftLabel: 'Car', leftColor: '#EF4444', rightValue: 'Road', rightEmoji: '🛣️', rightLabel: 'Highway Road', phonics: 'Cars drive smoothly on the road!' },
      { id: 'train', leftValue: '🚂 Train', leftLabel: 'Train', leftColor: '#8B5CF6', rightValue: 'Railway Tracks', rightEmoji: '🛤️', rightLabel: 'Train Tracks', phonics: 'Trains roll on train tracks, chugga-chugga!' },
      { id: 'airplane', leftValue: '✈️ Plane', leftLabel: 'Airplane', leftColor: '#06B6D4', rightValue: 'Sky & Clouds', rightEmoji: '☁️', rightLabel: 'Fluffy Sky', phonics: 'Airplanes zoom high in the sky!' },
      { id: 'boat', leftValue: '⛵ Boat', leftLabel: 'Sailboat', leftColor: '#3B82F6', rightValue: 'Blue Ocean', rightEmoji: '🌊', rightLabel: 'Ocean Waves', phonics: 'Boats float gently on blue waves!' },
    ],
  },
];

// Pool of items for dynamic procedural matching generation
const PROCEDURAL_MATCH_PAIRS: MatchingItem[] = [
  { id: 'sunflower', leftValue: '🌻 Flower', leftLabel: 'Flower', leftColor: '#EAB308', rightValue: 'Watering Can', rightEmoji: '🪴', rightLabel: 'Plant Pot', phonics: 'Flowers blossom with water and sunshine!' },
  { id: 'cow', leftValue: '🐮 Cow', leftLabel: 'Cow', leftColor: '#10B981', rightValue: 'Fresh Milk', rightEmoji: '🥛', rightLabel: 'Milk Glass', phonics: 'Cows give us healthy milk!' },
  { id: 'bee_honey', leftValue: '🐝 Bee', leftLabel: 'Bee', leftColor: '#F59E0B', rightValue: 'Sweet Honey', rightEmoji: '🍯', rightLabel: 'Honey Jar', phonics: 'Bees buzz around making sweet honey!' },
  { id: 'spider', leftValue: '🕷️ Spider', leftLabel: 'Spider', leftColor: '#6B7280', rightValue: 'Spider Web', rightEmoji: '🕸️', rightLabel: 'Spider Web', phonics: 'Spiders spin silky webs!' },
  { id: 'chick', leftValue: '🐥 Chick', leftLabel: 'Baby Chick', leftColor: '#FACC15', rightValue: 'Mama Hen', rightEmoji: '🐔', rightLabel: 'Mama Hen', phonics: 'Baby chick stays close to mama hen!' },
  { id: 'lion_crown', leftValue: '🦁 Lion', leftLabel: 'King Lion', leftColor: '#EA580C', rightValue: 'Savanna Grass', rightEmoji: '🌾', rightLabel: 'Golden Grass', phonics: 'Lions are kings of the open savanna!' },
  { id: 'guitar', leftValue: '🎸 Guitar', leftLabel: 'Guitar', leftColor: '#DC2626', rightValue: 'Music Notes', rightEmoji: '🎵', rightLabel: 'Melody', phonics: 'Strum the guitar to make happy music!' },
  { id: 'artist', leftValue: '🎨 Palette', leftLabel: 'Color Palette', leftColor: '#8B5CF6', rightValue: 'Paintbrush', rightEmoji: '🖌️', rightLabel: 'Paintbrush', phonics: 'Dip the brush in colors to paint!' },
  { id: 'dino', leftValue: '🦖 T-Rex', leftLabel: 'Dino Rex', leftColor: '#16A34A', rightValue: 'Dino Egg', rightEmoji: '🥚', rightLabel: 'Ancient Egg', phonics: 'T-Rex roars through the prehistoric jungle!' },
  { id: 'space', leftValue: '🚀 Rocket', leftLabel: 'Space Rocket', leftColor: '#2563EB', rightValue: 'Twinkling Star', rightEmoji: '⭐', rightLabel: 'Twinkling Star', phonics: 'Blast off towards the twinkling stars!' },
  { id: 'chef', leftValue: '🧑‍🍳 Chef', leftLabel: 'Chef', leftColor: '#D97706', rightValue: 'Hot Soup', rightEmoji: '🍲', rightLabel: 'Tasty Soup', phonics: 'The chef stirs a warm, delicious soup!' },
  { id: 'winter', leftValue: '⛄ Snowman', leftLabel: 'Snowman', leftColor: '#0284C7', rightValue: 'Warm Scarf', rightEmoji: '🧣', rightLabel: 'Warm Scarf', phonics: 'Keep warm with a cozy scarf in the snow!' },
];

export function getMatchingLevel(index: number): MatchingLevel {
  const allInitial = [...MATCHING_LEVELS, ...EXTENDED_MATCHING_LEVELS];
  if (index < allInitial.length) {
    return allInitial[index];
  }

  // Procedural infinite level generator
  const loopIdx = index - allInitial.length;
  const startOffset = (loopIdx * 4) % PROCEDURAL_MATCH_PAIRS.length;
  const selected: MatchingItem[] = [];

  for (let i = 0; i < 4; i++) {
    const item = PROCEDURAL_MATCH_PAIRS[(startOffset + i) % PROCEDURAL_MATCH_PAIRS.length];
    selected.push({
      ...item,
      id: `${item.id}_lvl${index}_${i}`,
    });
  }

  const levelNum = index + 1;
  return {
    id: levelNum,
    title: `Endless Discovery Level ${levelNum}`,
    subtitle: 'Match all the wonderful pairs to keep your streak going!',
    theme: (levelNum % 2 === 0 ? 'animals' : 'alphabet') as MatchingLevel['theme'],
    items: selected,
  };
}

// Rich collection of additional Odd-One-Out levels for endless play
const EXTENDED_ODD_LEVELS: OddOneOutLevel[] = [
  {
    id: 5,
    prompt: 'Which one is NOT a musical instrument?',
    reason: 'A burger is a tasty lunch, while guitars, drums, and violins play music!',
    options: [
      { id: '1', emoji: '🎸', label: 'Guitar', isOdd: false },
      { id: '2', emoji: '🥁', label: 'Drum', isOdd: false },
      { id: '3', emoji: '🍔', label: 'Burger', isOdd: true },
      { id: '4', emoji: '🎺', label: 'Trumpet', isOdd: false },
    ],
  },
  {
    id: 6,
    prompt: 'Spot the chilly winter friend!',
    reason: 'The snowman loves cold snow, while the campfire and sun are hot!',
    options: [
      { id: '1', emoji: '🔥', label: 'Campfire', isOdd: false },
      { id: '2', emoji: '☀️', label: 'Bright Sun', isOdd: false },
      { id: '3', emoji: '⛄', label: 'Snowman', isOdd: true },
      { id: '4', emoji: '🌶️', label: 'Hot Pepper', isOdd: false },
    ],
  },
  {
    id: 7,
    prompt: 'Which friend lives deep in the ocean?',
    reason: 'The playful dolphin swims in the sea, while puppies, bunnies and kittens walk on land!',
    options: [
      { id: '1', emoji: '🐶', label: 'Puppy', isOdd: false },
      { id: '2', emoji: '🐱', label: 'Kitten', isOdd: false },
      { id: '3', emoji: '🐬', label: 'Dolphin', isOdd: true },
      { id: '4', emoji: '🐰', label: 'Bunny', isOdd: false },
    ],
  },
  {
    id: 8,
    prompt: 'Find the round shape among squares and diamonds!',
    reason: 'The orange basketball is completely round like a circle!',
    options: [
      { id: '1', emoji: '🟩', label: 'Green Square', isOdd: false },
      { id: '2', emoji: '🏀', label: 'Round Basketball', isOdd: true },
      { id: '3', emoji: '🟦', label: 'Blue Square', isOdd: false },
      { id: '4', emoji: '🟨', label: 'Yellow Square', isOdd: false },
    ],
  },
  {
    id: 9,
    prompt: 'Which item belongs in a school backpack?',
    reason: 'Pencils are for writing notes, while cars, trains and trucks drive on roads!',
    options: [
      { id: '1', emoji: '🚗', label: 'Car', isOdd: false },
      { id: '2', emoji: '✏️', label: 'Pencil', isOdd: true },
      { id: '3', emoji: '🚂', label: 'Train', isOdd: false },
      { id: '4', emoji: '🚚', label: 'Truck', isOdd: false },
    ],
  },
  {
    id: 10,
    prompt: 'Spot the nighttime friend in the daytime sky!',
    reason: 'The crescent moon shines at night when we sleep, while sun, clouds and rainbows fill the day!',
    options: [
      { id: '1', emoji: '☀️', label: 'Sun', isOdd: false },
      { id: '2', emoji: '🌙', label: 'Crescent Moon', isOdd: true },
      { id: '3', emoji: '☁️', label: 'Cloud', isOdd: false },
      { id: '4', emoji: '🌈', label: 'Rainbow', isOdd: false },
    ],
  },
];

const PROCEDURAL_ODD_POOLS = [
  {
    prompt: 'Find the sweet treat among vegetables!',
    reason: 'Cupcake is a sweet birthday dessert, while the rest are garden vegetables!',
    normals: [{ emoji: '🥕', label: 'Carrot' }, { emoji: '🥦', label: 'Broccoli' }, { emoji: '🌽', label: 'Corn' }],
    odd: { emoji: '🧁', label: 'Cupcake' },
  },
  {
    prompt: 'Which friend has wings and can fly?',
    reason: 'The parrot flaps its wings to soar, while the others walk on 4 legs!',
    normals: [{ emoji: '🦁', label: 'Lion' }, { emoji: '🐘', label: 'Elephant' }, { emoji: '🦒', label: 'Giraffe' }],
    odd: { emoji: '🦜', label: 'Parrot' },
  },
  {
    prompt: 'Which one belongs in the starry galaxy?',
    reason: 'The glowing star shines in outer space among planets and rockets!',
    normals: [{ emoji: '🍎', label: 'Apple' }, { emoji: '🍌', label: 'Banana' }, { emoji: '🍇', label: 'Grapes' }],
    odd: { emoji: '⭐', label: 'Star' },
  },
  {
    prompt: 'Spot the red item in this green garden!',
    reason: 'The red strawberry pops out with bright red color!',
    normals: [{ emoji: '🍃', label: 'Green Leaf' }, { emoji: '🥑', label: 'Green Avocado' }, { emoji: '🍏', label: 'Green Apple' }],
    odd: { emoji: '🍓', label: 'Red Strawberry' },
  },
];

export function getOddOneOutLevel(index: number): OddOneOutLevel {
  const allInitial = [...ODD_ONE_OUT_LEVELS, ...EXTENDED_ODD_LEVELS];
  if (index < allInitial.length) {
    return allInitial[index];
  }

  const loop = (index - allInitial.length) % PROCEDURAL_ODD_POOLS.length;
  const pool = PROCEDURAL_ODD_POOLS[loop];
  const levelNum = index + 1;

  // Shuffle placement of odd item
  const oddPos = levelNum % 4;
  const options: OddItemOption[] = [];

  let normalIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === oddPos) {
      options.push({
        id: `odd_${levelNum}_${i}`,
        emoji: pool.odd.emoji,
        label: pool.odd.label,
        isOdd: true,
      });
    } else {
      const norm = pool.normals[normalIdx % pool.normals.length];
      normalIdx++;
      options.push({
        id: `norm_${levelNum}_${i}`,
        emoji: norm.emoji,
        label: norm.label,
        isOdd: false,
      });
    }
  }

  return {
    id: levelNum,
    prompt: pool.prompt,
    reason: pool.reason,
    options,
  };
}

// Rich collection of additional sorting levels for endless play
const EXTENDED_SORTING_LEVELS: SortingLevel[] = [
  {
    id: 3,
    prompt: 'Sort into the Purple and Orange Baskets!',
    baskets: [
      {
        id: 'purple',
        name: 'Purple Basket',
        colorName: 'Purple',
        colorHex: '#8B5CF6',
        borderHex: '#6D28D9',
        bgHex: '#EDE9FE',
      },
      {
        id: 'orange',
        name: 'Orange Basket',
        colorName: 'Orange',
        colorHex: '#F97316',
        borderHex: '#C2410C',
        bgHex: '#FFEDD5',
      },
    ],
    items: [
      { id: 'grapes', emoji: '🍇', label: 'Grapes', targetBasketId: 'purple' },
      { id: 'orange_fruit', emoji: '🍊', label: 'Orange', targetBasketId: 'orange' },
      { id: 'eggplant', emoji: '🍆', label: 'Eggplant', targetBasketId: 'purple' },
      { id: 'carrot', emoji: '🥕', label: 'Carrot', targetBasketId: 'orange' },
      { id: 'crystal', emoji: '🔮', label: 'Crystal Ball', targetBasketId: 'purple' },
      { id: 'pumpkin', emoji: '🎃', label: 'Pumpkin', targetBasketId: 'orange' },
    ],
  },
  {
    id: 4,
    prompt: 'Sort cute Animals and yummy Treats!',
    baskets: [
      {
        id: 'animals',
        name: 'Animals Basket',
        colorName: 'Cute Animals 🐾',
        colorHex: '#10B981',
        borderHex: '#047857',
        bgHex: '#D1FAE5',
      },
      {
        id: 'treats',
        name: 'Treats Basket',
        colorName: 'Yummy Treats 🧁',
        colorHex: '#EC4899',
        borderHex: '#BE185D',
        bgHex: '#FCE7F3',
      },
    ],
    items: [
      { id: 'lion_sort', emoji: '🦁', label: 'Lion', targetBasketId: 'animals' },
      { id: 'donut', emoji: '🍩', label: 'Donut', targetBasketId: 'treats' },
      { id: 'panda_sort', emoji: '🐼', label: 'Panda', targetBasketId: 'animals' },
      { id: 'cupcake', emoji: '🧁', label: 'Cupcake', targetBasketId: 'treats' },
      { id: 'bunny_sort', emoji: '🐰', label: 'Bunny', targetBasketId: 'animals' },
      { id: 'cookie', emoji: '🍪', label: 'Cookie', targetBasketId: 'treats' },
    ],
  },
  {
    id: 5,
    prompt: 'Sort friends that Fly in the Air vs Swim in Water!',
    baskets: [
      {
        id: 'sky',
        name: 'Sky Flyers ☁️',
        colorName: 'Air & Sky',
        colorHex: '#06B6D4',
        borderHex: '#0891B2',
        bgHex: '#CFFAFE',
      },
      {
        id: 'water',
        name: 'Water Swimmers 🌊',
        colorName: 'Sea & Water',
        colorHex: '#3B82F6',
        borderHex: '#1D4ED8',
        bgHex: '#DBEAFE',
      },
    ],
    items: [
      { id: 'butterfly_fly', emoji: '🦋', label: 'Butterfly', targetBasketId: 'sky' },
      { id: 'dolphin_swim', emoji: '🐬', label: 'Dolphin', targetBasketId: 'water' },
      { id: 'parrot_fly', emoji: '🦜', label: 'Parrot', targetBasketId: 'sky' },
      { id: 'whale_swim', emoji: '🐳', label: 'Whale', targetBasketId: 'water' },
      { id: 'airplane_fly', emoji: '✈️', label: 'Airplane', targetBasketId: 'sky' },
      { id: 'tropical_fish', emoji: '🐠', label: 'Fish', targetBasketId: 'water' },
    ],
  },
];

export function getSortingLevel(index: number): SortingLevel {
  const allInitial = [...SORTING_LEVELS, ...EXTENDED_SORTING_LEVELS];
  if (index < allInitial.length) {
    return allInitial[index];
  }

  // Loop back with newly shuffled identifiers for endless play
  const loop = (index - allInitial.length) % allInitial.length;
  const base = allInitial[loop];
  const levelNum = index + 1;

  return {
    ...base,
    id: levelNum,
    items: base.items.map((it, idx) => ({
      ...it,
      id: `${it.id}_inf_${levelNum}_${idx}`,
    })),
  };
}
