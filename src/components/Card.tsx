import React from "react";
import Image from "next/image";

import { FaBookmark } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import Select from "./Select";

type CardProps = {
  thumbnail: string;
  title: string;
  author: string;
  episode: string;
  date: string;
  isEditing?: boolean;
  onSelect: () => void;
};

export default function Card(props: CardProps) {
  const { thumbnail, title, author, episode, date, isEditing, onSelect } =
    props;

  return (
    <div className="w-full flex gap-2">
      <Image
        width={150}
        height={300}
        src={thumbnail}
        alt={title + "'s thumbnail"}
        className="rounded-lg"
      />
      <div className="relative w-full">
        <div>
          <h2 className="md:text-lg font-semibold text-primary">{title}</h2>
          <p className="mt-2 font-light">{author}</p>
        </div>
        <div className="absolute bottom-0 text-secondary">
          <p className="flex items-center gap-2 text-sm">
            <FaList />
            {episode}
          </p>
          <p className="flex items-center gap-2 text-sm">
            <FaBookmark />
            คั่นล่าสุด {date}
          </p>
        </div>
      </div>
      {isEditing ? <Select onSelect={onSelect} /> : null}
    </div>
  );
}
