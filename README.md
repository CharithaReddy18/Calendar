# Interactive Calendar Component

A clean, responsive, and dynamic React-based calendar component that mimics the aesthetic of a physical wall calendar. It allows users to visually select date ranges and seamlessly take persisted notes dynamically paired to specific selections. 

## Features

- **Wall Calendar Aesthetic:** High-quality header imagery dynamically mapping to the precise season/month to provide an authentic aesthetic.
- **Micro-Animations & Theming:** The entire UI dynamically updates its color theme perfectly matched to the physical "Wall Calendar" month image. The calendar grid features a modern fade-up micro-animation upon switching months.
- **Smart Date Range Selection:** Users can click to select starting and ending days. Visually tracks "between" days natively with pure CSS logic.
- **Integrated Notes System:** A floating side panel powered by `localStorage` lets you attach stateful notes instantly depending on context (e.g., specific day, date range, or the entire month).
- **Holiday Indicators:** Identifies significant holidays for each month with subtle glowing markers under specific dates.
- **Responsive & Glassmorphic:** Fully responsive layout with premium glassmorphism scaling from mobile to ultra-wide screens.

## Project Structure

This application was strictly bootstrapped using **Vite** and **React** with core logic split into modular components:
* `src/App.jsx`: Global layout, component integration, and state manager (including Notes localStorage).
* `src/components/Calendar.jsx`: Date grid iteration logic, dynamic month images, holiday mapping, and dynamic variable-driven color theming.
* `src/components/Notes.jsx`: Managed controlled input form dynamically bound to the selected timeline context.
* `src/index.css`: Vanilla CSS driving all layouts, hover states, animations, grid systems, and theming without bloated dependencies.

## How To Run Locally

1. Ensure you have Node.js installed on your machine.
2. Open a terminal in the project directory.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173` (or the URL provided in your terminal).

No databases to set up—all functionality runs completely offline in the browser!
