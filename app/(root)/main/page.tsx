import React from 'react';
import SideBar from "@/components/SideBar";
import MainHero from "@/components/MainHero";
import MainSearch from "@/components/MainSearch";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {movingCardIndex0, movingCardIndex1, movingCardIndex2} from "@/constants";

const Main = () => {
  return (
      <div>
        <SideBar
            children={mainContent()}/>
      </div>
  );
};

const mainContent= () =>{
  return (
      <div>
        <MainHero/>
        <div className="h-[60rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
          <InfiniteMovingCards
              items={movingCardIndex0}
              direction="right"
              speed="normal"
          />
          <InfiniteMovingCards
              items={movingCardIndex1}
              direction="left"
              speed="normal"
          />
          <InfiniteMovingCards
              items={movingCardIndex2}
              direction="right"
              speed="normal"
          />
        </div>
        <MainSearch/>
      </div>
  )
}


export default Main;
