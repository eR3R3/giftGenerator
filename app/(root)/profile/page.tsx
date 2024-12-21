'use client'

import React, {useEffect, useState} from 'react';
import SideBar from "@/components/SideBar";
import CardSet from "@/components/CardSet";
import {useUser} from "@clerk/clerk-react";
import {findAllPrompts} from "@/lib/actions/user.actions";
import {ProfileCard} from "@/components/ProfileCard";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const Profile =  () => {
  return (
      <div>
        <SideBar
            children={mainContent()}/>
      </div>
  );
};

const mainContent= () => {
  const {user} = useUser()
  const [allPrompts, setAllPrompts] = useState([]);

  const wordsOne = `Your Profile Page`;
  const wordsTwo = `you can easily see all your created prompt here`;

  useEffect( () => {
    const fetchPrompts = async () => {
      const clerkId = user?.id!
      console.log("clerkId", clerkId);
      const allPrompts = await findAllPrompts(clerkId)
      // @ts-ignore
      setAllPrompts(allPrompts)
    }
    fetchPrompts()
  }, [user]);
  console.log("allPrompts:", allPrompts);

  return (
      <div>
        <TextGenerateEffect className="font-extrabold text-9xl pl-10" words={wordsOne} />
        <div className='flex justify-start px-8 gap-8'>
          {allPrompts.map((prompt, id) => {
            return (
                <ProfileCard
                prop={prompt}
                id={id}
                key={id}
                hasRating={false}/>
            )
          })}
        </div>
      </div>
  )
}


export default Profile;
