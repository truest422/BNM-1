import React from "react";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";
import NewsFeed from "../components/NewsFeed";

const feed = () => {
  
  return (
    <>
      <div className='page'>
          {/* <div className='sideBar'>
              <Sidebar />
          </div> */}
            <div className="mainWindow">
              <div className="postContent">
                <PostInFeed />
              </div>
            </div>
            {/* <div className='rightBar'>
              <Rightbar />
            </div> */}
        </div>  
    </>
  );
};

export default feed;