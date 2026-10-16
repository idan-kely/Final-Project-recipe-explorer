import { describe, it, expect } from 'vitest';
import { filterRecipes, formatInstructions, countRecipesByCategory } from './recipeUtils';
import type { Recipe } from '../types/recipe';

const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Pasta Carbonara',
    category: 'Pasta',
    area: 'Italian',
    instructions: 'Boil water\nAdd pasta\nMix with sauce',
    thumbnail: 'pasta.jpg',
    ingredients: [],
  },
  {
    id: '2',
    title: 'Chicken Curry',
    category: 'Chicken',
    area: 'Indian',
    instructions: 'Cook chicken\nAdd spices',
    thumbnail: 'curry.jpg',
    ingredients: [],
  },
  {
    id: '3',
    title: 'Chicken Casserole',
    category: 'Chicken',
    area: 'French',
    instructions: 'Bake for 30 minutes',
    thumbnail: 'casserole.jpg',
    ingredients: [],
  },
];

describe('recipeUtils unit tests', () => {
  it('1. should filter recipes by title match', () => {
    const result = filterRecipes(sampleRecipes, 'Carbonara');
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe('Pasta Carbonara');
  });

  it('2. should filter case-insensitively and match category', () => {
    const result = filterRecipes(sampleRecipes, 'CHICKEN');
    expect(result).toHaveLength(2);
    expect(result.map((r) => r.id)).toEqual(['2', '3']);
  });

  it('3. should return all recipes when search query is empty or spaces', () => {
    const result = filterRecipes(sampleRecipes, '   ');
    expect(result).toHaveLength(3);
    expect(result).toEqual(sampleRecipes);
  });

  it('4. should remove API step labels and split instructions into clean steps', () => {
    const rawText = 'Step 1: Boil water\r\n\r\nStep 2: Add salt\nStep 3: Serve';
    const steps = formatInstructions(rawText);
    expect(steps).toHaveLength(3);
    expect(steps[0]).toBe('Boil water');
    expect(steps[1]).toBe('Add salt');
    expect(steps[2]).toBe('Serve');
  });

  it('5. should correctly count recipes per category', () => {
    const counts = countRecipesByCategory(sampleRecipes);
    expect(counts).toEqual({
      Pasta: 1,
      Chicken: 2,
    });
  });
});
