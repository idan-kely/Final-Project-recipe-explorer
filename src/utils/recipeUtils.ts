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

  const normalized = instructions
    .replace(/\r\n?/g, '\n')
    .replace(/(?:^|\n)\s*\d+[.)]?\s*(?=\n|$)/g, '\n')
    .trim();

  // Remove API labels such as "step 1" that may occupy their own line.
  const withoutStepLabels = normalized.replace(/(?:^|\n)\s*step\s*\d+\s*[.:)]?\s*(?=\n|$)/gi, '\n');

  // Some API recipes encode their steps as "1. text 2. text" in one line.
  const numberedSteps = withoutStepLabels
    .split(/(?:^|\s)\d+[.)]\s+/)
    .map((step) => step.trim())
    .filter((step) => step.length > 0);
  const paragraphs = numberedSteps.length > 1
    ? numberedSteps
    : withoutStepLabels.split(/\n+/).map((step) => step.trim()).filter((step) => step.length > 0);

  return paragraphs
    .flatMap((paragraph) => paragraph.split(/(?<=[.!?])\s+(?=[A-Z])/))
    .map((step) => step.trim()
      .replace(/^step\s*\d+\s*[.:)]?\s*/i, '')
      .replace(/^next\b\s*,?\s*/i, '')
      .replace(/[.\s]+$/g, ''))
    .filter((step) => step.length > 0 && !/^\d+[.)]?$/.test(step) && !/^step\s*\d+$/i.test(step));
}


export function countRecipesByCategory(recipes: Recipe[]): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const recipe of recipes) {
    const category = recipe.category || 'Uncategorized';
    counts[category] = (counts[category] || 0) + 1;
  }

  return counts;
}
