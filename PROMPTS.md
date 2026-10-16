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

## Task 5.2 — Create Random Recipe Generator Page
Prompt: Build a standalone RandomPage component fetching surprise dishes on demand from TheMealDB random.php endpoint with loading, error, and refresh triggers.
Agent did: Created `src/pages/RandomPage.tsx` integrating dynamic fetch, formatting instructions via `formatInstructions` utility, and rendering an interactive re-roll button.
I checked: Verified component type safety, verified loading and error states, and confirmed manual re-draw button logic without page refresh.

## Task 5.3 — Update Navbar with NavLink Integration
Prompt: Update the Navbar component to include active state styling and links to Home, Favorites, and Random pages using React Router's NavLink component strictly without any.
Agent did: Modified `src/components/Navbar.tsx` with dynamic `NavLink` inline style functions for visual active feedback.
I checked: Clicked each navigation link in the browser, verified the URL paths changed correctly, and confirmed active styling (bold text and blue border) highlighted the current page.

## Task 5.4 — Connect Favorites and Random Recipe Pages
Prompt: Connect the Favorites and Random pages to the application. Add the missing routes, allow users to add and remove recipes from favorites on the recipe list, recipe details, and Favorites page, and make the full recipe link open the randomly selected recipe's detail page.
Agent did: Added the `/favorites` and `/random` routes, connected favorite toggling across the recipe list, recipe details, and Favorites page, and passed the randomly fetched recipe to the recipe details page.
I checked: Ran `npm.cmd run build` successfully and manually verified in the browser that the Favorites and Random flows work, including opening the randomly selected recipe's full details.

## Task 5.5 — Persist Favorites with localStorage
Prompt: Save favorite recipe IDs in `localStorage` and restore them when the application loads, with safe handling for invalid saved data.
Agent did: Added initialization of the favorites state from `localStorage` and an effect that saves favorite IDs whenever the favorites list changes.
I checked: Manually verified in the browser that favorites remain saved after reloading the page and can still be removed.

## Task 5.6 — Improve Hebrew Interface and Recipe Instructions Layout
Prompt: Update the interface styling for Hebrew and right-to-left reading, use a consistent Hebrew-friendly font, and display the original recipe instructions clearly without translating them, adding step numbers, or leaving standalone number-only lines.
Agent did: Updated the page language and direction, applied consistent responsive styling and Hebrew labels, and changed recipe instruction formatting to remove standalone numbers and avoid UI-added numbering while preserving the API's original recipe text.
I checked: Ran `npm.cmd run build` successfully and manually verified the updated page layout and recipe instructions in the browser.


## Task 5.7 — Refine English Interface and Recipe Instructions
Prompt: Make the entire application interface English and left-to-right, remove trailing periods from recipe instruction lines, format instructions as clear numbered steps, and remove API labels such as "step 1" and filler words such as "Next" at the start of a step. Preserve the original recipe text otherwise.
Agent did: Replaced Hebrew interface text with English, updated the document language and direction and font, and refined instruction formatting to remove trailing periods, API step labels, and leading "Next" while displaying recipe instructions as numbered steps.
I checked: Ran `npm.cmd run build` successfully after the interface and instruction formatting changes.

## Add Recipe Search and Filtering
Prompt: Add a real-time search field to the recipe list that filters recipes by title or category. Show a clear empty state when no recipes match and style the field to fit the responsive design.
Agent did: Added controlled search state to `RecipeList`, applied the existing filter utility as the query changes, and added styled English labels and a no-match message.
I checked: Ran `npm.cmd run build` successfully and manually verified in the browser that searching by recipe title and category filters the recipes correctly.

## Investigate and Fix a Failing Unit Test
Prompt: I ran the unit tests and one of them failed. Find out why it failed, explain the cause, and fix it.
Agent did: Explained that the test expected the old `formatInstructions` behavior, while the function had since changed to remove API step labels such as `Step 1`. Updated the test expectations to match the current behavior while checking that the instruction text is preserved.
I checked: Ran `npm.cmd test` and confirmed all 5 tests passed.


