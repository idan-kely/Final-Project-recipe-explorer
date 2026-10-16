# Recipe Explorer

Recipe Explorer is a React application for discovering recipes from TheMealDB. Browse recipes, search by name or category, open a recipe for its instructions, save favorites, and get a random recipe suggestion.

## Features

- Browse recipes fetched from TheMealDB
- Search recipes by title or category
- Open a recipe details page with ingredients and preparation instructions
- Add and remove favorite recipes; favorites are saved in browser `localStorage`
- Generate a random recipe and open its full details
- Responsive layout for desktop and mobile screens

## Technologies

- React, Vite, and TypeScript
- React Router for page navigation
- TheMealDB public API
- Vitest and Vitest UI for unit tests

## Getting Started

Requirements: Node.js and npm

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL printed in the terminal, usually `http://localhost:5173`.

## Tests and Build

Run the unit tests:

```bash
npm test
```

Run the tests in Vitest UI:

```bash
npm run test:ui
```

Create a production build:

```bash
npm run build
```

## API

Recipe data is fetched from [TheMealDB](https://www.themealdb.com/api.php), a public recipe API. The application uses its search endpoint to load recipes and its random endpoint to suggest a meal. No API key is configured in the client.

## Project Structure

- `src/components/` - navigation, recipe list, cards, and recipe details
- `src/pages/` - favorites and random recipe pages
- `src/utils/` - recipe filtering, instruction formatting, and category statistics
- `src/types/` - TypeScript recipe model
- `src/utils/recipeUtils.test.ts` - unit tests for recipe utility functions

## Project Documents

- `PRD.md` - product goals and acceptance criteria
- `tasks.md` - implementation tasks and completion criteria
- `PROMPTS.md` - prompt and implementation log


