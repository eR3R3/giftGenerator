"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import {useState} from "react";
import {DrawerContent, DrawerTitle} from "@/components/ui/drawer";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Drawer} from "@/components/ui/drawer";


export default function MainSearch() {
  const placeholders = [
    "where can I see the tutorial",
    "Who are the team members",
    "Is there a way to join the team?",
    "How do you guys learn TypeScript",
    "Where can I submit my advices?",
  ];

  const [text, setText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let ans = await fetch("api/gpt/faq", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({text}),
    }).then(res => res.json());
    setText(ans);
    text && setIsOpen(true)
    console.log(isOpen);
  };
  return (
      <div className="h-[80vh] flex flex-col justify-center  items-center px-4">
        <h2 className="mb-10 sm:mb-10 text-xl text-center sm:text-5xl dark:text-white text-black">
          Ask Anything you want to know about our team or the App
        </h2>
        <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
        />
          <Drawer open={isOpen} >
            <DrawerContent >
              <VisuallyHidden>
                <DrawerTitle>Answer</DrawerTitle>
              </VisuallyHidden>
              <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <h2 className="text-2xl font-boldtext-gray-800 font-extrabold mb-4 text-center">
                  Answer
                </h2>
                <div className="bg-white p-4 rounded-lg shadow-inner">
                  <div className="flex items-center mb-3 ">
                    <p className="text-sm text-gray-500 font-medium">Specific AI Generated Answer:</p>
                    <div className="bg-gray-50 text-gray-700 text-sm px-3 py-1 rounded-md">
                      {text}
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 px-4 py-2 bg-black text-white rounded-md hover:bg-black"
                  >
                    Close
                  </button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
      </div>
  );
}
