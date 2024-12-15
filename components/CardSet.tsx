import React from 'react';
import { HoverEffect } from "./ui/card-hover-effect";
import {projects} from '@/constants/index'

const CardSet = () => {
  return (
    <div className="w-full h-[80vh] mx-auto">
      <HoverEffect items={projects}/>
    </div>
  );
};

export default CardSet;
                                                                               