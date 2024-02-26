"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Banner from "@/components/Banner";

import { FaTrashAlt } from "react-icons/fa";

import bookmarkJson from "@/__mock__/bookmark.json";
// import undrawReading from "@/assets/img/undraw_reading.svg";

type Bookmark = {
  id: string;
  title: string;
  author: string;
  thumbnail: string;
  date: Date | string;
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

  const handleBookmarkNovel = () => {
    setBookmark([
      ...bookmark,
      // Create a new novel with dummy data to add to the bookmark list
      {
        id: uuidv4(),
        title: faker.lorem.sentence(),
        author: faker.person.fullName(),
        thumbnail: "https://via.placeholder.com/200x300",
        date: faker.date.anytime(),
        episode: faker.music.songName(),
      },
    ]);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <main>
      <div className="h-[300px]">
        <Banner />
      </div>
      <div className="px-3 sm:px-0 container mx-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold pt-[55px] my-6 text-primary">
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

            {isEditing ? (
              <Button
                onClick={() => handleRemove()}
                disabled={selected.length <= 0}
              >
                <FaTrashAlt />
                {selected.length > 0 ? `${selected.length} รายการ` : ""}
              </Button>
            ) : null}
          </div>
        </div>
        {bookmark.length > 0 ? (
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
        ) : (
          <div className="flex flex-col items-center mt-12 mb-24">
            <Image
              src="/assets/img/undraw_reading.svg"
              alt="undraw reading"
              width={300}
              height={300}
            />
            <p className="text-center text-primary text-lg font-semibold mt-6">
              ไม่พบรายการที่คั่นไว้
            </p>
            <p className="text-center text-gray-500">
              เราได้รวบรวมนิยายคุณภาพเอาไว้มากมาย
            </p>
            <p className="text-center text-gray-500">
              ลองมาหานิยายเรื่องโปรดของคุณกัน
            </p>
          </div>
        )}
      </div>

      <div className="fixed right-0 bottom-0 m-3">
        <Button onClick={handleBookmarkNovel}>เพิ่มนิยาย</Button>
      </div>
    </main>
  );
}
