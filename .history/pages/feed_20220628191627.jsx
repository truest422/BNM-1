import React from "react";
import PostInFeed from "../components/PostinFeed";
import Sidebar from "../components/Sidebar";
import Rightbar from "../components/Rightbar";

const feed = () => {
  
  return (
    <>
      <div className='page'>
          {/* <div className='sideBar'>
              <Sidebar />
          </div> */}
            <div className="mainWindow">
              {/* <div className="postContent"> */}
                <PostInFeed profile={false} />
              {/* </div> */}
            </div>
            {/* <div className='rightBar'>
              <Rightbar />
            </div> */}
        </div>  
    </>
  );
};

export default feed;