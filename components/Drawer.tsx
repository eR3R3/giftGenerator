import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import React from 'react';
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

const ProfileDrawer = ({ans}:{ans: string}) => {
  return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            See in detail
          </button>
        </DrawerTrigger>

        <DrawerContent >
          <VisuallyHidden>
            <DrawerTitle>Profile Details</DrawerTitle>
          </VisuallyHidden>
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-boldtext-gray-800 font-extrabold mb-4 text-center">
              Prompt Details
            </h2>
            <div className="bg-white p-4 rounded-lg shadow-inner">
              <div className="flex items-center mb-3 ">
                <p className="text-sm text-gray-500 font-medium">Specific AI Generated Answer:</p>
                <div className="bg-gray-50 text-gray-700 text-sm px-3 py-1 rounded-md">
                  {ans}
                </div>
              </div>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
  );
};

export default ProfileDrawer;
