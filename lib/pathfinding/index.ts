import type { AlgorithmType, GridNode, PathfindingResult } from "./types"
import { dijkstra } from "./algorithms/dijkstra"
import { aStar } from "./algorithms/astar"
import { bfs } from "./algorithms/bfs"
import { dfs } from "./algorithms/dfs"
import { greedyBestFirst } from "./algorithms/greedy"

export function runPathfinding(
  algorithm: AlgorithmType,
  grid: GridNode[][],
  startNode: GridNode,
  endNode: GridNode,
): PathfindingResult {
  switch (algorithm) {
    case "dijkstra":
      return dijkstra(grid, startNode, endNode)
    case "astar":
      return aStar(grid, startNode, endNode)
    case "bfs":
      return bfs(grid, startNode, endNode)
    case "dfs":
      return dfs(grid, startNode, endNode)
    case "greedy":
      return greedyBestFirst(grid, startNode, endNode)
    default:
      throw new Error(`Unknown algorithm: ${algorithm}`)
  }
}

export * from "./types"
export * from "./grid-utils"
