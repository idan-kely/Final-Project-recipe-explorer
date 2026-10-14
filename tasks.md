# Tasks — Recipe Explorer

- [x] **Task 1: Setup & Local Mock Data (TypeScript)**
  - **Done when:** The app runs with `npm run dev` without console errors, rendering initial recipes from `mockRecipes.json` using strict TypeScript interfaces (`Recipe`) without `any`.

- [ ] **Task 2: Routing Setup & Multi-Page Shell (React Router)**
  - **Done when:** `react-router-dom` is configured with a navigation bar (`NavLink`) supporting 4 routes: Home/List (`/`), Recipe Details (`/recipe/:id`), Favorites (`/favorites`), and Random Meal (`/random`).

- [ ] **Task 3: Modular Components Breakdown**
  - **Done when:** The interface is decomposed into at least 4 reusable custom components (`Navbar`, `RecipeCard`, `SearchBar`, `RecipeDetailView`) with typed props and no inline duplication.

- [ ] **Task 4: Live API Integration (TheMealDB with useEffect & Fetch)**
  - **Done when:** Live recipe data is fetched from TheMealDB API, replacing mock data, and handles all 3 visual states cleanly: loading, error, and loaded data.

- [ ] **Task 5: Real-Time Search & Client-Side Filtering**
  - **Done when:** Typing into the search bar filters the recipe list dynamically by meal name in real time, displaying a clear empty state message when no results match.

- [ ] **Task 6: Additional Pages Logic (Favorites & Random Recipe)**
  - **Done when:** The Favorites page displays recipes saved to `localStorage`, and the Random page fetches and displays a surprise recipe on click.

- [ ] **Task 7: Unit Testing with Vitest and Vitest UI**
  - **Done when:** At least 5 unit tests pass successfully with `npm test`, covering data filtering and API response transformations, and can be viewed via `npm run test:ui`.

- [ ] **Task 8: Custom Responsive CSS & Final Documentation**
  - **Done when:** The app has custom responsive styling adapted to mobile screens (375px), `README.md` is complete with run instructions, and `npm run build` succeeds with zero errors.