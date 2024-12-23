'use client'

import React, {useEffect, useState} from 'react';
import SideBar from "@/components/SideBar";
import {ProfileCard} from "@/components/ProfileCard";
import {findAllPromptsBig} from "@/lib/actions/user.actions";
import {TextGenerateEffect} from "@/components/ui/text-generate-effect";

const Search = () => {
  return (
      <div>
        <SideBar
            children={mainContent()}/>
      </div>
  );
};

const mainContent= () =>{
  const [allPrompts, setAllPrompts] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(() => {
    const fetchAllPromptsBig = async () =>{
      const allPrompts = await findAllPromptsBig()
      setAllPrompts(allPrompts)
      setSearchedResults(allPrompts)
    }
    fetchAllPromptsBig()
  }, []);


  const filterUsers = (searchText: any) => {
    const regex = new RegExp(searchText, "i");
    return allPrompts.filter(
        (prompt) =>
            // @ts-ignore
            regex.test(prompt.creator) ||
            // @ts-ignore
            regex.test(prompt.gift) ||
            // @ts-ignore
            regex.test(prompt.holidayType) ||
            // @ts-ignore
            regex.test(prompt.personality) ||
            // @ts-ignore
            regex.test(prompt.hint) ||
            // @ts-ignore
            regex.test(prompt.ans)
    );
  };

  const handleSearchChange = (e: any) => {
    // @ts-ignore
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
        // @ts-ignore
        setTimeout(() => {
          const searchResult = filterUsers(e.target.value);
          setSearchedResults(searchResult);
        }, 500)
    );
  };


  console.log(allPrompts);

  const wordsOne='Prompt gallery'
  const wordsTwo='You can see all the public gift prompts that are created by all the users'
  return (
      <div>
        <TextGenerateEffect className="font-extrabold text-9xl pl-8 pt-3" words={wordsOne}/>
        <TextGenerateEffect className="font-extrabold text-3xl pl-8" words={wordsTwo}/>
        <div className="px-16 mt-20 mb-20">
          <input
              type='text'
              placeholder='Search for anything related'
              value={searchText}
              onChange={handleSearchChange}
              required
              className='block w-full rounded-md border border-gray-200 bg-white py-2.5 font-satoshi pl-5 pr-12 text-sm shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0; peer'
          />
        </div>
        <div className='flex justify-start px-8 gap-12 w-full h-full flex-wrap  '>
          {searchedResults.map((prompt, id) => {
            return (
                <ProfileCard
                    prop={prompt}
                    id={id}
                    hasRating={true}
                    key={id}/>
            )
          })}
        </div>
      </div>
  );
}


export default Search;
