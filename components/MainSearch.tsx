"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export default function MainSearch() {
  const placeholders = [
    "where can I see the tutorial",
    "Who are the team members",
    "Is there a way to join the team?",
    "How do you guys learn TypeScript",
    "Where can I submit my advices?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
      <div className="h-[60vh] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-10 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
          Ask Anything you want to know about our team or the App
        </h2>
        <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
        />
      </div>
  );
}
