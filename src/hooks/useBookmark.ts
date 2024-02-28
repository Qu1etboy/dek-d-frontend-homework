import { useState } from "react";

import { faker } from "@faker-js/faker";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

import { Bookmark } from "@/@types/bookmark";

function createDummyBookmark(): Bookmark {
  return {
    id: uuidv4(),
    title: faker.lorem.sentence(),
    author: faker.person.fullName(),
    thumbnail: "https://via.placeholder.com/200x300",
    date: faker.date.anytime(),
    episode: faker.music.songName(),
  };
}

export function useBookmark(initialBookmarks: Bookmark[]) {
  const [bookmarks, setBookmark] = useState<Bookmark[]>(initialBookmarks);
  const [selectedBookmarks, setSelectedBookmarks] = useState<Bookmark[]>([]);
  const [isEditing, setIsEditing] = useState(false);

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

    toast.success("ลบรายการที่คั่นไว้สำเร็จ");
  };

  const toggleEditing = () => {
    // Clear bookmark selection so we don't have any leftover selected bookmarks
    setSelectedBookmarks([]);
    setIsEditing(!isEditing);
  };

  const handleBookmarkNovel = () => {
    setBookmark([...bookmarks, createDummyBookmark()]);
    toast.success("เพิ่มนิยายเข้ารายการคั่นสำเร็จ");
  };

  return {
    bookmarks,
    selectedBookmarks,
    isEditing,
    handleSelectBookmark,
    handleRemoveBookmark,
    handleBookmarkNovel,
    toggleEditing,
  };
}
