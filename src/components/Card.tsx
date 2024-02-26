import React from "react";
import Image from "next/image";

import { format } from "date-fns";

import { FaBookmark } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import Select from "./Select";
import { th } from "date-fns/locale";
import { Bookmark } from "@/@types/bookmark";
import Link from "next/link";
import { cn } from "@/utils/cn";

type CardProps = {
  isEditing?: boolean;
  isSelected?: boolean;
  onSelect: () => void;
} & Omit<Bookmark, "id">;

export default function Card(props: CardProps) {
  const {
    thumbnail,
    title,
    author,
    episode,
    date,
    isEditing,
    onSelect,
    isSelected,
  } = props;

  return (
    <button
      onClick={onSelect}
      className="group text-left"
      disabled={!isEditing}
    >
      <div className="relative w-full flex gap-2">
        <Link
          href="#"
          className={isEditing ? "pointer-events-none" : ""}
          aria-disabled={isEditing}
          tabIndex={isEditing ? -1 : undefined}
        >
          <Image
            width={200}
            height={300}
            src={thumbnail}
            alt={title + "'s thumbnail"}
            className="rounded-lg group-disabled:hover:opacity-75 cursor-pointer duration-300"
          />
        </Link>
        <div className="relative w-full pr-12">
          <div>
            <h2 className="line-clamp-2 text-wrap md:text-lg font-semibold text-primary group-disabled:hover:opacity-75 cursor-pointer duration-300">
              <Link
                href="#"
                className={isEditing ? "pointer-events-none" : ""}
                aria-disabled={isEditing}
                tabIndex={isEditing ? -1 : undefined}
              >
                {title}
              </Link>
            </h2>
            <Link
              href="#"
              className={cn(
                "mt-2 font-light group-disabled:hover:text-orange-500 duration-300",
                isEditing ? "pointer-events-none" : ""
              )}
              aria-disabled={isEditing}
              tabIndex={isEditing ? -1 : undefined}
            >
              {author}
            </Link>
          </div>
          <div className="absolute bottom-0 text-secondary">
            <p className="flex items-center gap-2 text-sm">
              <FaList />
              {episode}
            </p>
            <p className="flex items-center gap-2 text-sm">
              <FaBookmark />
              คั่นล่าสุด {format(date, "PP / HH:mm น.", { locale: th })}
            </p>
          </div>
        </div>
        <div className="absolute right-0">
          {isEditing ? <Select checked={isSelected} /> : null}
        </div>
      </div>
    </button>
  );
}
