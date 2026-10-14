# Product Requirements Document (PRD) — Recipe Explorer

## 1. Overview & Objective
Recipe Explorer is a multi-page web application built with React, Vite, and TypeScript adhering to the Master-Detail architectural pattern. The system enables users to discover cooking recipes from TheMealDB API, review full preparation instructions, maintain persistent favorites, and generate random recipe inspiration.

## 2. Target Audience
Home cooks and culinary enthusiasts seeking an interactive and responsive meal planning interface.

## 3. Core Pages & Routes
1. **Recipes List (`/`)**: Searchable and filterable master grid of recipes.
2. **Recipe Detail (`/recipe/:id`)**: Comprehensive preparation instructions and ingredients for a selected dish.
3. **Favorites (`/favorites`)**: User-bookmarked recipes persisted across sessions via `localStorage`.
4. **Random Meal (`/random`)**: Surprise dish view fetched on demand for instant cooking inspiration.

## 4. User Acceptance Criteria
* **When I** open the home page, **I see** recipe cards showing thumbnail images, titles, and categories.
* **When I** click on a recipe card, **I see** the route change to `/recipe/:id` and display the full ingredients and preparation steps.
* **When I** type in the search bar, **I see** the active recipe list filtered in real time.
* **When I** click the favorite button on a recipe, **I see** the item saved to my favorites list in `localStorage`.
* **When I** encounter a network disconnect or invalid request, **I see** an explicit, user-friendly error message.

