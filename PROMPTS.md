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