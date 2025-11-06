# Navigation Algorithm Simulator

An interactive web-based visualization tool for comparing various pathfinding algorithms in real-time. This simulator allows users to create custom obstacles and watch different algorithms find the optimal path from start to end.

## 🚀 Features

- **Interactive Grid Interface**: Click and drag to create walls and obstacles
- **Multiple Pathfinding Algorithms**:
  - **A* Algorithm**: Optimal pathfinding combining distance and heuristic estimation
  - **Dijkstra's Algorithm**: Guaranteed shortest path with systematic exploration
  - **Breadth-First Search (BFS)**: Level-by-level exploration for unweighted graphs
  - **Depth-First Search (DFS)**: Fast exploration without shortest path guarantee
  - **Greedy Best-First Search**: Heuristic-guided fast search
- **Real-Time Visualization**: Watch algorithms explore the grid with animated visualization
- **Performance Metrics**: Track distance, nodes explored, and execution time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme Support**: Built with modern UI components

## 🎯 Live Demo

Experience the simulator in action: [Demo Link](#) *(Add your deployment URL)*

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 16.x or higher)
- npm or pnpm package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/johaankjis/Navigation-Algorithm-Simulator.git
cd Navigation-Algorithm-Simulator
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open your browser and navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 Usage

1. **Select an Algorithm**: Choose from the dropdown menu (A*, Dijkstra, BFS, DFS, or Greedy)
2. **Create Obstacles**: Click and drag on the grid to draw walls
3. **Visualize**: Click the "Visualize" button to run the selected algorithm
4. **View Results**: See the path found, nodes explored, and execution time
5. **Reset**: Use "Clear Walls" to remove obstacles or "Reset Grid" to start fresh

### Grid Legend

- 🟢 **Green**: Start node
- 🔴 **Red**: End node
- ⬛ **Black**: Wall/Obstacle
- 🔵 **Blue**: Visited node
- 🟡 **Yellow**: Final path

## 🧮 Algorithm Details

### A* Algorithm
Combines the benefits of Dijkstra's algorithm and Greedy Best-First Search. Uses both the actual distance from the start (g-score) and a heuristic estimation to the goal (h-score) to efficiently find the optimal path.

**Time Complexity**: O(b^d) where b is the branching factor and d is the depth
**Space Complexity**: O(b^d)
**Optimal**: Yes
**Complete**: Yes

### Dijkstra's Algorithm
A classic algorithm that guarantees the shortest path by exploring all nodes systematically. It works by maintaining a priority queue of nodes ordered by their distance from the start.

**Time Complexity**: O((V + E) log V) with priority queue
**Space Complexity**: O(V)
**Optimal**: Yes
**Complete**: Yes

### Breadth-First Search (BFS)
Explores nodes level by level, visiting all neighbors before moving to the next level. Guarantees the shortest path in unweighted graphs but may explore many unnecessary nodes.

**Time Complexity**: O(V + E)
**Space Complexity**: O(V)
**Optimal**: Yes (for unweighted graphs)
**Complete**: Yes

### Depth-First Search (DFS)
Explores as far as possible along each branch before backtracking. Fast but doesn't guarantee the shortest path.

**Time Complexity**: O(V + E)
**Space Complexity**: O(V)
**Optimal**: No
**Complete**: Yes (in finite graphs)

### Greedy Best-First Search
Uses only the heuristic estimation to guide the search towards the goal. Very fast but may not find the optimal path.

**Time Complexity**: O(b^d)
**Space Complexity**: O(b^d)
**Optimal**: No
**Complete**: No

## 🏗️ Tech Stack

- **Framework**: [Next.js 16.0](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [Radix UI](https://www.radix-ui.com/) - Accessible component library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful & consistent icons
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📁 Project Structure

```
Navigation-Algorithm-Simulator/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout component
│   ├── page.tsx             # Home page with simulator
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── pathfinding-grid.tsx # Main grid component
│   ├── grid-cell.tsx        # Individual cell component
│   ├── theme-provider.tsx   # Theme context provider
│   └── ui/                  # Reusable UI components
├── lib/                     # Utility functions and logic
│   ├── pathfinding.ts       # Algorithm implementations
│   ├── pathfinding/         # Algorithm modules
│   ├── scenarios/           # Predefined scenarios
│   └── utils.ts             # Helper functions
├── public/                  # Static assets
├── styles/                  # Additional styles
├── components.json          # shadcn/ui configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## 🎨 Customization

### Grid Size
Modify the grid dimensions in `components/pathfinding-grid.tsx`:
```typescript
const GRID_ROWS = 20  // Change number of rows
const GRID_COLS = 40  // Change number of columns
```

### Animation Speed
Adjust animation timing in the `visualizePathfinding` function:
```typescript
await new Promise((resolve) => setTimeout(resolve, 10))  // Visited nodes
await new Promise((resolve) => setTimeout(resolve, 50))  // Path nodes
```

### Start/End Positions
Change default positions in the `PathfindingGrid` component initialization:
```typescript
initialGrid[10][10].isStart = true  // Start position
initialGrid[10][30].isEnd = true    // End position
```

## 🧪 Testing

This project currently does not include automated tests. To manually test:

1. Run the development server: `npm run dev`
2. Test each algorithm with various wall configurations
3. Verify that paths are correctly found or marked as impossible
4. Check performance metrics for accuracy

## 🏃 Build for Production

To create an optimized production build:

```bash
npm run build
npm start
```

## 🚀 Deployment

This project can be easily deployed to:

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms
- **Netlify**: Connect your repo and deploy
- **AWS Amplify**: Use the Next.js preset
- **Docker**: Create a Dockerfile with Next.js

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Contribution Ideas
- Add new pathfinding algorithms (e.g., Jump Point Search, Bi-directional search)
- Implement weighted nodes/terrain
- Add maze generation algorithms
- Improve UI/UX with additional controls
- Add algorithm comparison mode
- Create tutorial/guided tour
- Add unit tests and integration tests

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by [Pathfinding Visualizer](https://github.com/clementmihailescu/Pathfinding-Visualizer) by Clement Mihailescu
- Built with [shadcn/ui](https://ui.shadcn.com/) components
- Algorithm explanations from various computer science resources

## 📧 Contact

Project Link: [https://github.com/johaankjis/Navigation-Algorithm-Simulator](https://github.com/johaankjis/Navigation-Algorithm-Simulator)

---

⭐ If you find this project useful, please consider giving it a star on GitHub!
