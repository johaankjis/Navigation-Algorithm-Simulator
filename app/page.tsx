import { PathfindingGrid } from "@/components/pathfinding-grid"

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Navigation Algorithm Simulator</h1>
          <p className="text-muted-foreground">
            Compare different pathfinding algorithms in real-time. Click and drag to create walls, then visualize how
            each algorithm finds the optimal path.
          </p>
        </div>

        <PathfindingGrid />

        <div className="mt-8 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">About the Algorithms</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">A* Algorithm</h3>
              <p className="text-sm text-muted-foreground">
                Combines the benefits of Dijkstra and Greedy Best-First. Uses both actual distance and heuristic
                estimation for optimal pathfinding.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Dijkstra's Algorithm</h3>
              <p className="text-sm text-muted-foreground">
                Guarantees the shortest path by exploring all nodes systematically. Slower but always finds the optimal
                solution.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Breadth-First Search (BFS)</h3>
              <p className="text-sm text-muted-foreground">
                Explores nodes level by level. Guarantees shortest path in unweighted graphs but explores many
                unnecessary nodes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Depth-First Search (DFS)</h3>
              <p className="text-sm text-muted-foreground">
                Explores as far as possible along each branch. Fast but doesn't guarantee the shortest path.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Greedy Best-First</h3>
              <p className="text-sm text-muted-foreground">
                Uses only heuristic estimation to guide search. Very fast but may not find the optimal path.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
