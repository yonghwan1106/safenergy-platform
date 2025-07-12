# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack for fast builds
- `npm run build` - Build the application for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

## Project Architecture

This is a Next.js 15 energy safety monitoring platform for KHNP (Korea Hydro & Nuclear Power) that aggregates environmental data and calculates safety indices for nuclear power plants. The architecture follows a full-stack pattern with API routes, database integration, and real-time data visualization.

### Data Flow Architecture

1. **Data Sources**: The platform ingests three types of environmental data:
   - Radiation levels from nuclear facilities (`RadiationData`)
   - Weather conditions (`WeatherData`) 
   - Air quality measurements (`AirQualityData`)

2. **Safety Index Calculation**: Core business logic in `src/utils/safety-calculator.ts` processes the three data sources using weighted scoring:
   - Radiation: 40% weight
   - Air Quality: 35% weight  
   - Weather: 25% weight
   - Outputs safety grades: 안전 (Safe), 주의 (Caution), 경고 (Warning), 위험 (Danger)

3. **Database Layer**: PostgreSQL with Prisma ORM manages six main entities:
   - Environmental data models (radiation, weather, air quality)
   - Calculated safety indices
   - Power plant information
   - Alert management system

### API Structure

API routes follow RESTful patterns under `/api/`:
- `/api/radiation/` - Radiation data endpoints
- `/api/weather/` - Weather data endpoints  
- `/api/air-quality/` - Air quality data endpoints
- `/api/safety-index/` - Safety index calculation and retrieval

The safety index endpoint (`/api/safety-index/route.ts`) aggregates latest data from all three sources and performs real-time safety calculations.

### Component Architecture

UI components are organized by purpose:
- **Data Components**: `DataCard.tsx`, `DataChart.tsx` for displaying metrics
- **Safety Components**: `SafetyIndexCard.tsx` for safety status visualization
- **Chart Components**: Specialized chart components using Recharts for radiation, weather, and air quality trends

### State Management

The application uses Zustand for client-side state management and TanStack Query for server state and data fetching.

### Key Technologies

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **UI**: Tailwind CSS with Radix UI components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

### Database Configuration

Ensure `DATABASE_URL` environment variable is set for PostgreSQL connection. Run `npx prisma generate` after schema changes and `npx prisma db push` to sync database structure.