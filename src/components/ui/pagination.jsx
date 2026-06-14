import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }) {
  return <li data-slot="pagination-item" {...props} />
}

function PaginationLink({ className, isActive, size = "icon", ...props }) {
  return (
    <a
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        // base
        "relative inline-flex items-center justify-center h-8 w-8 rounded-lg text-xs font-semibold select-none transition-all duration-200 cursor-pointer",
        // inactive
        "bg-[#0D0C0B] border border-white/8 text-white/40",
        "hover:text-white hover:border-white/20 hover:bg-white/5",
        // active
        isActive && [
          "bg-[#A87C2D] border-[#A87C2D] text-white font-bold",
          "shadow-[0_0_12px_rgba(168,124,45,0.35)]",
          "hover:bg-[#c49535] hover:border-[#c49535] hover:text-white",
        ],
        className
      )}
      {...props}
    />
  )
}

function PaginationPrevious({ className, text = "Prev", ...props }) {
  return (
    <a
      aria-label="Go to previous page"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold select-none transition-all duration-200 cursor-pointer",
        "bg-[#0D0C0B] border border-white/8 text-white/40",
        "hover:text-white hover:border-white/20 hover:bg-white/5",
        "disabled:opacity-30 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <ChevronLeftIcon className="w-3.5 h-3.5" />
      <span className="hidden sm:block">{text}</span>
    </a>
  )
}

function PaginationNext({ className, text = "Next", ...props }) {
  return (
    <a
      aria-label="Go to next page"
      className={cn(
        "inline-flex items-center justify-center gap-1.5 h-8 px-3 rounded-lg text-xs font-semibold select-none transition-all duration-200 cursor-pointer",
        "bg-[#0D0C0B] border border-white/8 text-white/40",
        "hover:text-white hover:border-white/20 hover:bg-white/5",
        "disabled:opacity-30 disabled:pointer-events-none",
        className
      )}
      {...props}
    >
      <span className="hidden sm:block">{text}</span>
      <ChevronRightIcon className="w-3.5 h-3.5" />
    </a>
  )
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn(
        "inline-flex items-center justify-center h-8 w-8 rounded-lg text-white/20 text-xs",
        className
      )}
      {...props}
    >
      <MoreHorizontalIcon className="w-3.5 h-3.5" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
