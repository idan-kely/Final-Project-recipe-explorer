# Prompts Log — Recipe Explorer

## Task 1 — Show local list with types
Prompt: Create the project structure using Vite and TypeScript, define a strict Recipe interface without any, and create a mockRecipes.json file with 3 recipes to display on the home page.
Agent did: Created src/types/recipe.ts with strict interfaces, added src/mockRecipes.json, and updated src/App.tsx to render the local list using map.
I checked: Ran npm run dev, opened the browser at http://localhost:5173, verified all 3 recipes displayed with their images and titles, and confirmed there were no console errors.

## Task 2 — Routing Setup (Navbar, List & Details)
Prompt: Install react-router-dom and set up modular components: Navbar with NavLink, RecipeCard with dynamic Link, RecipeList for the master view, and RecipeDetail using useParams to read the ID.
Agent did: Created Navbar.tsx, RecipeCard.tsx, RecipeList.tsx, and RecipeDetail.tsx inside src/components/, and configured BrowserRouter, Routes, and Route in App.tsx.
I checked: Clicked on a recipe card to verify the URL changed dynamically to /recipe/:id, confirmed the full recipe details opened, and verified the back button returned to the list view.

Prompt: Clarify how Props work with TypeScript in RecipeCard, and simplify the Navbar to only link to Home so there are no empty placeholder screens before Task 5.
Agent did: Explained the type contract (recipe: Recipe) versus runtime props, and simplified Navbar.tsx to route to Home while keeping the dynamic detail page routing intact.
I checked: Tested the navigation again in the browser to ensure no dead links exist, verified npm run build succeeded, and made separate Git commits for each component.

## Task 3 — Live API Integration with Fetch and useEffect
Prompt: Replace the local mock JSON with live fetching from TheMealDB API in App.tsx, handling loading, error, and data states strictly without using `any`.
Agent did: Updated `src/App.tsx` with native `fetch` inside `useEffect`, mapped the raw API response to the clean `Recipe` interface, and added loading and error UI states.
I checked: Reloaded the application in the browser at http://localhost:5173, verified recipes are fetched dynamically from the live API with the loading spinner, tested error fallback, and confirmed `npm run build` succeeds without TypeScript errors.

## Task 4 — Unit Testing with Vitest and Vitest UI
Prompt: Set up Vitest and @vitest/ui, write modular helper functions for filtering, formatting, and category statistics, and add 5 comprehensive unit tests without using any.
Agent did: Added test scripts to package.json, created src/utils/recipeUtils.ts with pure business logic functions, and wrote 5 unit tests in src/utils/recipeUtils.test.ts.
I checked: Ran `npm test` in the terminal to verify all 5 tests passed, launched `npm run test:ui` to inspect tests in the browser UI, and ran `npm run build` to confirm zero TypeScript compilation errors.

## Task 5.1 — Create Favorites Page Component
Prompt: Create a dedicated FavoritesPage component in TypeScript to display bookmarked recipes, using the native array includes method to filter saved IDs without using any.
Agent did: Created `src/pages/FavoritesPage.tsx` with responsive recipe card grid, an empty-state message with navigation link, and a remove-from-favorites button.
I checked: Inspected the component code, verified TypeScript props interface, and confirmed the use of native array method `includes()` for ID filtering.