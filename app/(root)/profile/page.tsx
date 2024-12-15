import React from 'react';
import SideBar from "@/components/SideBar";

const Profile = () => {
  return (
      <div>
        <SideBar
        children={mainContent()}/>
      </div>
  );
};

const mainContent= () =>{
  return (
      <p>Profile</p>
  )
}


export default Profile;
