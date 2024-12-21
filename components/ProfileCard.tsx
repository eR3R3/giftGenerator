"use client";

import React, {useEffect, useState} from "react";
import {CardBody, CardContainer, CardItem} from "./ui/3d-card";
import Rating from "@/components/ui/Rating";
import {addScore, calculateAverageRating, deletePrompt, findUser} from "@/lib/actions/user.actions";
import ProfileDrawer from "@/components/Drawer";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

interface ProfileCardProp{
  _id: any;
  clerkId: any;
  isPublic: boolean
  gift: string,
  holidayType: string,
  age: number,
  personality: string,
  hint: string
  ans: string
}

export function ProfileCard({prop, id, hasRating}:{prop:ProfileCardProp, id: number, hasRating: boolean}) {
  const router = useRouter();
  const [currentScore, setCurrentScore] = useState(0);
  // @ts-ignore
  const [creatorImg, setCreatorImg] = useState<string>(null);
  const [averageScore, setAverageScore] = useState(0);


  const getContent = (rating: number) => {
    setCurrentScore(rating)
    console.log(rating)
  }

  useEffect(() => {
    const fetchCreator = async () => {
      const creator = await findUser(prop.clerkId)
      const averageScore_ = await calculateAverageRating(prop._id)
      console.log(creator.photo)
      console.log(averageScore_)
      // @ts-ignore
      setAverageScore(averageScore_)
      setCreatorImg(creator.photo)
    };
    fetchCreator()
  })

  const promptObjectId = prop._id
  console.log(promptObjectId)
  return (
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card flex flex-col justify-center gap-2 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  sm:min-w-[15px] h-full rounded-xl p-6 border  ">
          <div className='flex justify-between '>
            <CardItem translateZ="20" className="mb-4 ">
              <img src={creatorImg} alt="user Image" width={40} height={40} className='rounded-2xl'/>
            </CardItem>
            <div>
              <p>{averageScore}</p>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path pathLength={360} d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"/>
              </svg>
            </div>
          </div>
          <CardItem
              translateZ="40"
              className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {prop.gift}
          </CardItem>
          <div className="flex justify-start gap-10 w-full pr-1">
            <CardItem
                as="p"
                translateZ="30"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <b>Personality:</b> {prop.personality}
            </CardItem>
            <CardItem
                as="p"
                translateZ="30"
                className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              <b>Age: </b>{prop.age}
            </CardItem>
          </div>
          <CardItem
              as="p"
              translateZ="30"
              className="text-neutral-500 text-sm max-w-sm mt-1 dark:text-neutral-300"
          >
            <b>HolidayType: </b>{prop.holidayType}
          </CardItem>
          <CardItem
              as="p"
              translateZ="30"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            <b>Other traits: </b>{prop.hint}
          </CardItem>
          {hasRating&&<CardItem translateZ="50" className="mt-10">
              <Rating
              getContent={getContent}
              id={id}/>
          </CardItem>}
          <div className="flex justify-between items-center mt-4">
            {hasRating?<CardItem
                translateZ={30}
                as="button"
                onClick={async()=>{
                  console.log("submit button triggered")
                  const ratedPrompt = await addScore(promptObjectId, currentScore)
                }}
                target="__blank"
                className="px-2 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Submit score →
            </CardItem>:
             <CardItem translateZ={30}>
              <Button
              onClick={()=>{
                deletePrompt(promptObjectId)
                window.location.reload()
              }}>
                Delete
              </Button>
             </CardItem> }
            <CardItem
                translateZ={30}
                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              <ProfileDrawer ans={prop.ans}/>
            </CardItem>
          </div>
          <div className="mb-2">
            <CardItem
                as='p'
                translateZ={30}
                className="bg-white text-black py-1 px-2 rounded-lg border border-black hover:bg-gray-200 focus:outline-none text-xs"
            >
              {prop.isPublic ? "Public" : "Private"}
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
  );
}
