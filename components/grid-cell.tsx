"use client"

import type { GridNode } from "@/lib/pathfinding"
import { cn } from "@/lib/utils"

interface GridCellProps {
  node: GridNode
  onMouseDown: (node: GridNode) => void
  onMouseEnter: (node: GridNode) => void
  onMouseUp: () => void
  isAnimating: boolean
}

export function GridCell({ node, onMouseDown, onMouseEnter, onMouseUp, isAnimating }: GridCellProps) {
  const getCellClass = () => {
    if (node.isStart) return "bg-green-500"
    if (node.isEnd) return "bg-red-500"
    if (node.isWall) return "bg-gray-800"
    if (node.inPath) return "bg-yellow-400 animate-pulse"
    if (node.visited) return "bg-blue-300"
    return "bg-white hover:bg-gray-100"
  }

  return (
    <div
      className={cn(
        "w-6 h-6 border border-gray-300 transition-colors duration-100 cursor-pointer",
        getCellClass(),
        isAnimating && "pointer-events-none",
      )}
      onMouseDown={() => onMouseDown(node)}
      onMouseEnter={() => onMouseEnter(node)}
      onMouseUp={onMouseUp}
    />
  )
}
