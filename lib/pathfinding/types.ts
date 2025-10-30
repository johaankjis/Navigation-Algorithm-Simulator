export interface GridNode {
  row: number
  col: number
  isWall: boolean
  isStart: boolean
  isEnd: boolean
  distance: number
  heuristic: number
  totalCost: number
  parent: GridNode | null
  visited: boolean
  inPath: boolean
}

export interface PathfindingResult {
  path: GridNode[]
  visitedNodes: GridNode[]
  distance: number
  nodesExplored: number
  executionTime: number
  success: boolean
}

export type AlgorithmType = "dijkstra" | "astar" | "bfs" | "dfs" | "greedy"
