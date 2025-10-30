import type { GridNode, PathfindingResult } from "../types"
import { getNeighbors, reconstructPath, resetGrid, manhattanDistance } from "../grid-utils"

export function greedyBestFirst(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const openSet: GridNode[] = [startNode]

  startNode.distance = 0
  startNode.heuristic = manhattanDistance(startNode, endNode)

  while (openSet.length > 0) {
    // Sort by heuristic only (greedy approach)
    openSet.sort((a, b) => a.heuristic - b.heuristic)
    const currentNode = openSet.shift()!

    if (currentNode.isWall || currentNode.visited) continue

    currentNode.visited = true
    visitedNodes.push(currentNode)

    if (currentNode === endNode) {
      const path = reconstructPath(endNode)
      path.forEach((node) => (node.inPath = true))

      return {
        path,
        visitedNodes,
        distance: path.length - 1,
        nodesExplored: visitedNodes.length,
        executionTime: performance.now() - startTime,
        success: true,
      }
    }

    const neighbors = getNeighbors(currentNode, grid)
    for (const neighbor of neighbors) {
      if (!neighbor.visited) {
        neighbor.parent = currentNode
        neighbor.distance = currentNode.distance + 1
        neighbor.heuristic = manhattanDistance(neighbor, endNode)

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor)
        }
      }
    }
  }

  // No path found
  return {
    path: [],
    visitedNodes,
    distance: Number.POSITIVE_INFINITY,
    nodesExplored: visitedNodes.length,
    executionTime: performance.now() - startTime,
    success: false,
  }
}
