"use client"

import { IoChevronForwardSharp, IoChevronBackSharp } from "react-icons/io5"
import { Link } from "@tanstack/react-router"

import { cn } from "../../utils/cn"
import { generatePagination } from "../../utils/generatePagination"

export default function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const pathname = window.location.pathname
  const searchParams = window.location.search

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  const allPages = generatePagination(currentPage, totalPages)

  return (
    <div className="inline-flex gap-[1px]">
      <PaginationArrow direction="left" href={createPageURL(currentPage - 1)} isDisabled={currentPage <= 1} />
      {allPages.map((page, index) => {
        let position: "first" | "last" | "single" | "middle" | undefined

        if (index === 0) position = "first"
        if (index === allPages.length - 1) position = "last"
        if (allPages.length === 1) position = "single"
        if (page === "...") position = "middle"

        return (
          <PaginationNumber
            key={`${page}-${index}`}
            href={createPageURL(page)}
            page={page}
            position={position}
            isActive={currentPage === page}
          />
        )
      })}
      <PaginationArrow direction="right" href={createPageURL(currentPage + 1)} isDisabled={currentPage >= totalPages} />
    </div>
  )
}

function PaginationNumber({
  page,
  href,
  isActive,
  position,
}: {
  page: number | string
  href: string
  position?: "first" | "last" | "middle" | "single"
  isActive: boolean
}) {
  const className = cn("flex h-12 w-12 items-center justify-center rounded bg-base-200 font-bold text-theme-blue", {
    "text-base-400": isActive || position === "middle",
    "hover:bg-base-300": !isActive && position !== "middle",
  })

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link to={href} className={className}>
      {page}
    </Link>
  )
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string
  direction: "left" | "right"
  isDisabled?: boolean
}) {
  const className = cn("flex h-12 w-12 items-center justify-center rounded bg-base-200 font-bold text-theme-blue", {
    "pointer-events-none text-content-extra-light": isDisabled,
    "hover:bg-base-300": !isDisabled,
  })

  const icon =
    direction === "left" ? <IoChevronBackSharp className="h-6 w-6" /> : <IoChevronForwardSharp className="h-6 w-6" />

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} to={href}>
      {icon}
    </Link>
  )
}
