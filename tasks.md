# Project Tasks - Recipe Explorer

- [x] **Task 1: Setup & Local Mock Data with Types**
  - **Done when:** The app runs with `npm run dev`, displaying at least 3 recipes from a local JSON file (`mockRecipes.json`) with TypeScript interfaces and no `any`.

- [x] **Task 2: Routing Setup (List & Detail View)**
  - **Done when:** `react-router-dom` is configured with a navigation menu, rendering the recipe list at `/` and the detail view at `/recipe/:id` using `useParams`.

- [ ] **Task 3: Live API Integration (TheMealDB)**
  - **Done when:** Local mock data is replaced with live `fetch` inside `useEffect`, displaying loading, error, and data states.

- [ ] **Task 4: Unit Testing with Vitest**
  - **Done when:** At least 5 unit tests pass with `npm test` and run via `@vitest/ui`.

- [ ] **Task 5: Two Extra Pages (Favorites & Random Meal)**
  - **Done when:** Two additional functional routes (`/favorites` and `/random`) are implemented with their own views.

- [ ] **Task 6: Search & Filter Logic**
  - **Done when:** Real-time search/filter allows filtering the recipe list.

- [ ] **Task 7: Custom Responsive CSS**
  - **Done when:** Custom CSS provides an appealing layout on both desktop and mobile viewports.

- [ ] **Task 8: Documentation & Verification**
  - **Done when:** `README.md` is complete, and `npm run build` and tests pass without errors.