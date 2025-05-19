# Skip Hire Selection Application

A modern, responsive Next.js application for selecting skip hire services, featuring a sleek dark-themed UI with detailed skip information.

## Overview

This application provides users with an intuitive interface to select skip hire services based on size, price, and features. The application follows a multi-step process for skip hire, with this component specifically handling the "Select Skip" step.


## Features

- **Responsive Design**: Fully responsive layout that works on mobile, tablet, and desktop devices
- **Skip Selection Cards**: Detailed cards showing skip dimensions, suitability, and restrictions
- **Visual Indicators**: Clear visual cues for allowed/forbidden features
- **Progress Tracking**: Visual progress bar showing the user's position in the booking flow
- **Error Handling**: Robust error handling with user-friendly messages
- **Loading States**: Smooth loading states with animations

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: Custom-built components
- **API Integration**: Axios for API requests with error handling

## Project Structure

```
/src
  /app
    /api
      skips.ts         # Skip data API functions and types
      utils.ts         # API utility functions
    /components
      ProgressBar.tsx            # Multi-step progress tracking component
      SkipImages.tsx             # SVG skip illustrations
      SkipSelectComponents.tsx   # Main UI components for skip selection
    globals.css        # Global styles
    layout.tsx         # Root layout component
    page.tsx           # Main Skip Select page
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd skip_hire_selection
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Design Approach

### UI/UX Design

The application features a dark-themed interface with blue accents for a modern, professional look. Key design decisions include:

- **Card-Based Layout**: Each skip option is displayed in its own card with clear information hierarchy
- **Visual Skip Illustrations**: Custom SVG illustrations for different skip sizes
- **Color-Coded Indicators**: Green for allowed features, red for restrictions
- **Responsive Hide/Show**: Detail sections that can be toggled on smaller screens

### Development Approach

The application was built with the following considerations:

1. **Component-Based Architecture**: Modular components for maintainability and reusability
2. **Responsive First**: Building with mobile responsiveness as a core requirement
3. **Progressive Enhancement**: Core functionality works on all devices with enhanced experiences on larger screens
4. **API Fallbacks**: Graceful handling of API failures with informative error messages
5. **Accessibility**: Semantic HTML and proper ARIA attributes for screen readers

## Running Tests

```bash
# Run unit tests
pnpm test

```

## License

© 2025 Skip Hire Service. All rights reserved.
