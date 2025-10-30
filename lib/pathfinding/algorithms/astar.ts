import type { GridNode, PathfindingResult } from "../types"
import { getNeighbors, reconstructPath, resetGrid, manhattanDistance } from "../grid-utils"

export function aStar(grid: GridNode[][], startNode: GridNode, endNode: GridNode): PathfindingResult {
  const startTime = performance.now()
  resetGrid(grid)

  const visitedNodes: GridNode[] = []
  const openSet: GridNode[] = [startNode]

  startNode.distance = 0
  startNode.heuristic = manhattanDistance(startNode, endNode)
  startNode.totalCost = startNode.heuristic

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.totalCost - b.totalCost)
    const currentNode = openSet.shift()!

    if (currentNode.isWall) continue

    currentNode.visited = true
    visitedNodes.push(currentNode)

    if (currentNode === endNode) {
      const path = reconstructPath(endNode)
      path.forEach((node) => (node.inPath = true))

      return {
        path,
        visitedNodes,
        distance: endNode.distance,
        nodesExplored: visitedNodes.length,
        executionTime: performance.now() - startTime,
        success: true,
      }
    }

    const neighbors = getNeighbors(currentNode, grid)
    for (const neighbor of neighbors) {
      if (neighbor.visited) continue

      const tentativeDistance = currentNode.distance + 1

      if (tentativeDistance < neighbor.distance) {
        neighbor.parent = currentNode
        neighbor.distance = tentativeDistance
        neighbor.heuristic = manhattanDistance(neighbor, endNode)
        neighbor.totalCost = neighbor.distance + neighbor.heuristic

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor)
        }
      }
    }
  }

  return {
    path: [],
    visitedNodes,
    distance: Number.POSITIVE_INFINITY,
    nodesExplored: visitedNodes.length,
    executionTime: performance.now() - startTime,
    success: false,
  }
}
