import React from "react";
import Image from "next/image";

import { format } from "date-fns";

import { FaBookmark } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import Select from "./Select";
import { th } from "date-fns/locale";

type CardProps = {
  thumbnail: string;
  title: string;
  author: string;
  episode: string;
  date: Date | string;
  isEditing?: boolean;
  onSelect: () => void;
};

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

export default function Card(props: CardProps) {
  const { thumbnail, title, author, episode, date, isEditing, onSelect } =
    props;

  return (
    <div className="relative w-full flex gap-2">
      <Image
        width={200}
        height={300}
        src={thumbnail}
        alt={title + "'s thumbnail"}
        className="rounded-lg"
      />
      <div className="relative w-full pr-12">
        <div>
          <h2 className="md:text-lg font-semibold text-primary">
            {truncate(title, 45)}
          </h2>
          <p className="mt-2 font-light">{author}</p>
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
        {isEditing ? <Select onSelect={onSelect} /> : null}
      </div>
    </div>
  );
}
