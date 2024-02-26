"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import { useEffect, useState } from "react";
import bookmarkJson from "@/__mock__/bookmark.json";

type Bookmark = {
  id: number;
  title: string;
  author: string;
  thumbnail: string;
  date: string;
  episode: string;
};

export default function Home() {
  const [bookmark, setBookmark] = useState<Bookmark[]>(bookmarkJson);
  const [isEditing, setIsEditing] = useState(false);
  const [selected, setSelected] = useState<Bookmark[]>([]);

  const handleSelect = (selectBookmark: Bookmark) => {
    if (selected.includes(selectBookmark)) {
      setSelected(selected.filter((b) => b.id !== selectBookmark.id));
    } else {
      setSelected([...selected, selectBookmark]);
    }
  };

  const handleRemove = () => {
    setBookmark(bookmark.filter((i) => !selected.includes(i)));
    setSelected([]);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <main>
      <div></div>
      <div className="px-3 sm:px-0 container mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold my-6 text-primary">
          รายการที่คั่นไว้
        </h1>
        <hr />
        <div className="flex items-center justify-between mt-6">
          <span className="text-sm font-light">
            จํานวนทั้งหมด {bookmark.length} รายการ
          </span>

          <div className="flex">
            <Button onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? "ยกเลิก" : "แก้ไข"}
            </Button>
            {selected.length > 0 && (
              <Button onClick={() => handleRemove()}>
                {selected.length} รายการ
              </Button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
          {bookmark.map((novel) => (
            <Card
              key={novel.id}
              title={novel.title}
              author={novel.author}
              thumbnail={novel.thumbnail}
              date={novel.date}
              episode={novel.episode}
              isEditing={isEditing}
              onSelect={() => handleSelect(novel)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
