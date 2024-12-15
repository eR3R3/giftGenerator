import React from 'react';
import SideBar from "@/components/SideBar";

const Search = () => {
  return (
      <div>
        <SideBar
            children={mainContent()}/>
      </div>
  );
};

const mainContent= () =>{
  return (
      <p>search</p>
  )
}


export default Search;
