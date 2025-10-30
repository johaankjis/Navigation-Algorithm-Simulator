import type { GridNode } from "./types"

export function createGrid(rows: number, cols: number): GridNode[][] {
  const grid: GridNode[][] = []

  for (let row = 0; row < rows; row++) {
    const currentRow: GridNode[] = []
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isWall: false,
        isStart: false,
        isEnd: false,
        distance: Number.POSITIVE_INFINITY,
        heuristic: 0,
        totalCost: Number.POSITIVE_INFINITY,
        parent: null,
        visited: false,
        inPath: false,
      })
    }
    grid.push(currentRow)
  }

  return grid
}

export function getNeighbors(node: GridNode, grid: GridNode[][]): GridNode[] {
  const neighbors: GridNode[] = []
  const { row, col } = node
  const rows = grid.length
  const cols = grid[0].length

  if (row > 0) neighbors.push(grid[row - 1][col])
  if (row < rows - 1) neighbors.push(grid[row + 1][col])
  if (col > 0) neighbors.push(grid[row][col - 1])
  if (col < cols - 1) neighbors.push(grid[row][col + 1])

  return neighbors.filter((neighbor) => !neighbor.isWall)
}

export function manhattanDistance(nodeA: GridNode, nodeB: GridNode): number {
  return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col)
}

export function reconstructPath(endNode: GridNode): GridNode[] {
  const path: GridNode[] = []
  let currentNode: GridNode | null = endNode

  while (currentNode !== null) {
    path.unshift(currentNode)
    currentNode = currentNode.parent
  }

  return path
}

export function resetGrid(grid: GridNode[][]): void {
  for (const row of grid) {
    for (const node of row) {
      node.distance = Number.POSITIVE_INFINITY
      node.heuristic = 0
      node.totalCost = Number.POSITIVE_INFINITY
      node.parent = null
      node.visited = false
      node.inPath = false
    }
  }
}
