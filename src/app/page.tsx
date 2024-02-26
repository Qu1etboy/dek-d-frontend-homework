"use client";

import { useState } from "react";
import Image from "next/image";

import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from "uuid";

import Button from "@/components/Button";
import Card from "@/components/Card";
import Banner from "@/components/Banner";

import { FaTrashAlt } from "react-icons/fa";

import bookmarkJson from "@/__mock__/bookmark.json";

import { Bookmark } from "@/@types/bookmark";
import ConfirmationModal from "@/components/ConfirmationModal";

const bannerImages = [
  "https://swiperjs.com/demos/images/nature-1.jpg",
  "https://swiperjs.com/demos/images/nature-2.jpg",
  "https://swiperjs.com/demos/images/nature-3.jpg",
  "https://swiperjs.com/demos/images/nature-4.jpg",
];

export default function Home() {
  const [bookmarks, setBookmark] = useState<Bookmark[]>(bookmarkJson);
  const [selectedBookmarks, setSelectedBookmarks] = useState<Bookmark[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSelectBookmark = (selectBookmark: Bookmark) => {
    if (selectedBookmarks.includes(selectBookmark)) {
      setSelectedBookmarks(
        selectedBookmarks.filter((b) => b.id !== selectBookmark.id)
      );
    } else {
      setSelectedBookmarks([...selectedBookmarks, selectBookmark]);
    }
  };

  const handleRemoveBookmark = () => {
    setBookmark(bookmarks.filter((i) => !selectedBookmarks.includes(i)));
    setSelectedBookmarks([]);
    setIsEditing(false);
  };

  const handleBookmarkNovel = () => {
    setBookmark([
      ...bookmarks,
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

  return (
    <>
      <div className="h-[300px]">
        <Banner images={bannerImages} />
      </div>
      <main className="px-3 sm:px-0">
        <h1 className="container mx-auto text-xl md:text-2xl lg:text-3xl font-semibold pt-[55px] my-6 text-primary">
          รายการที่คั่นไว้
        </h1>
        <hr />
        <section className="container mx-auto mt-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-light">
              จํานวนทั้งหมด {bookmarks.length} รายการ
            </span>

            <div className="flex">
              <Button onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "ยกเลิก" : "แก้ไข"}
              </Button>

              {isEditing ? (
                <ConfirmationModal
                  onAccept={handleRemoveBookmark}
                  showModal={showModal}
                  setShowModal={setShowModal}
                >
                  <Button
                    onClick={() => setShowModal(true)}
                    disabled={selectedBookmarks.length <= 0}
                  >
                    <FaTrashAlt />
                    {selectedBookmarks.length > 0 ? (
                      <>
                        {selectedBookmarks.length}{" "}
                        <span className="hidden md:inline">รายการ</span>
                      </>
                    ) : (
                      ""
                    )}
                  </Button>
                </ConfirmationModal>
              ) : null}
            </div>
          </div>
          {bookmarks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-6">
              {bookmarks.map((bookmark) => (
                <Card
                  key={bookmark.id}
                  title={bookmark.title}
                  author={bookmark.author}
                  thumbnail={bookmark.thumbnail}
                  date={bookmark.date}
                  episode={bookmark.episode}
                  isEditing={isEditing}
                  onSelect={() => handleSelectBookmark(bookmark)}
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
        </section>
      </main>

      <div className="fixed right-0 bottom-0 m-3">
        <Button onClick={handleBookmarkNovel}>เพิ่มนิยาย</Button>
      </div>
    </>
  );
}
