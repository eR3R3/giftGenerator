import React from 'react';
import SideBar from "@/components/SideBar";
import HeroButton from "@/components/HeroButton";
import CardSet from "@/components/CardSet";
import MainHero from "@/components/MainHero";
import { Spotlight } from "@/components/ui/spotlight";
import MainSearch from "@/components/MainSearch";

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
      <MainHero />
      <CardSet />
      <MainSearch />
    </div>
  )
}


export default Main;
