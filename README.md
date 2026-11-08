# AURELIA — Commerce Intelligence

**A modern e-commerce analytics dashboard designed to transform store data into clear, actionable business insights.**

<p align="center">
  <strong>PixelCraft 1.0 · Track B — Interactive Product & Analytics Dashboard</strong>
</p>

---

## Overview

AURELIA is a responsive commerce analytics dashboard that brings essential store operations and business insights into one unified interface.

It provides a clean, intuitive workspace for monitoring revenue, tracking orders, exploring products, and understanding customer activity. The interface is designed to make complex store information easier to navigate through interactive components, visual analytics, and structured data tables.

Built with React and TypeScript, AURELIA focuses on usability, responsive design, and a polished dashboard experience.

## Features

### Dashboard Overview
- Revenue and business performance KPI cards.
- Interactive revenue charts.
- Multiple reporting periods: last 12 months, last 30 days, and last 7 days.
- At-a-glance store activity.

### Analytics
- Visual revenue trends.
- Data visualization using Recharts.
- Reporting period selection.

### Order Management
- Structured order listing.
- Search and status-based filtering.
- Order status indicators.
- CSV export of filtered orders.

### Product Management
- Product listing with relevant details.
- Searchable product records.
- Clear product information layout.

### Customer Management
- Customer listing and details.
- Searchable customer records.

### User Experience
- Responsive sidebar navigation.
- Mobile-friendly dashboard layout.
- Profile dropdown with interactive menu options.
- Search interactions and empty states.
- Consistent visual styling and reusable UI components.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based frontend |
| TypeScript | Type safety |
| Vite | Development and build tooling |
| CSS | Styling and responsive layouts |
| Recharts | Data visualization |
| Lucide React | Interface icons |

 


## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/saravanabalajisciet-crypto/aurelia-commerce.git
   ```

2. Navigate to the project directory:

   ```bash
   cd aurelia-commerce
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL displayed in your terminal.

### Production Build

To generate the production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
aurelia-commerce/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── assets/
│   │   └── hero.png
│   │
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

## Responsive Design

AURELIA is designed to provide a consistent experience across desktop, tablet, and mobile screens.

Key responsive considerations include:

- Adaptive navigation for smaller screens.
- Flexible dashboard layouts.
- Responsive data presentation.
- Optimized spacing and component sizing.
- Mobile-friendly search and interaction elements.

## Data & Implementation

**Current implementation:** Frontend prototype using local mock data.

The dashboard demonstrates interface interactions, filtering, chart rendering, and CSV export. It does not currently connect to a live e-commerce backend, database, or authentication provider.

## Future Improvements

- Backend integration and persistent data storage.
- Real-time commerce analytics.
- Authentication and role-based access.
- Advanced reporting and date-range filters.
- Deeper product and customer insights.

## Hackathon

**Event:** PixelCraft 1.0  
**Track:** Track B — Interactive Product & Analytics Dashboard

AURELIA was developed to demonstrate a responsive, interactive, and visually consistent commerce dashboard experience.

## Repository

[GitHub — AURELIA Commerce](https://github.com/saravanabalajisciet-crypto/aurelia-commerce)

---

<p align="center">
  <strong>AURELIA</strong><br/>
  Commerce Intelligence, Designed for Clarity.
</p>