import type { Recipe } from '../types/recipe';


export function filterRecipes(recipes: Recipe[], query: string): Recipe[] {
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) {
    return recipes;
  }

  return recipes.filter((recipe) => {
    const matchesTitle = recipe.title.toLowerCase().includes(trimmedQuery);
    const matchesCategory = recipe.category.toLowerCase().includes(trimmedQuery);
    return matchesTitle || matchesCategory;
  });
}


export function formatInstructions(instructions: string): string[] {
  if (!instructions || !instructions.trim()) {
    return [];
  }

  return instructions
    .replace(/\r\n?/g, '\n')
    // The API sometimes puts stray numbered-list markers on their own line.
    .replace(/(?:^|\n)\s*\d+[.)]?\s*(?=\n|$)/g, '\n')
    // Split on paragraph breaks and sentence boundaries when the API returns
    // the whole recipe as one long paragraph.
    .split(/\n+|(?<=[.!?])\s+(?=[A-Z])/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0 && !/^\d+[.)]?$/.test(step));
}


export function countRecipesByCategory(recipes: Recipe[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const recipe of recipes) {
    const category = recipe.category || 'Uncategorized';
    counts[category] = (counts[category] || 0) + 1;
  }

  return counts;
}
