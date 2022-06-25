import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { CONTRACT_ADDRESS } from "../consts/vars";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;

const PostInFeed = () => {

  const {
    Moralis
  } = useMoralis();

  const [postArr, setPostArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const retrieveNfts = async () => {
      setLoading(true);
      await Moralis.start({ serverUrl, appId, moralisSecert });

      const nfts = await Moralis.Web3API.token.getAllTokenIds({
        address: CONTRACT_ADDRESS,
        chain: "matic",
      });
      setPostArr(nfts.result)
      
      setLoading(false)
    }
    retrieveNfts();
  }, []);

  useEffect(() => {
    if(postArr) {
      setLoading(true);
      Promise.all(
        postArr.map(async (nft, index) => {
         
        nft.metadata = JSON.parse(nft.metadata)
        })
      ).then(() => {
        setPostArr(postArr)
      });
      setLoading(false);
    }
  }, [postArr]);
  
  // console.log(postArr[0]);

  return (
    <>
      {postArr?.map((e) => {
        if (!e.metadata.description)
          return "";
        console.log(e.metadata)
        return(
          <>
          <div className="feedPost">
            <img src={defaultImgs[0]} className="profilePic"></img>
            <div className="completeTweet">
              <div className="who">
                  Placeholder
                  <div className="accWhen">0xghdh...hdjsh - 1h</div>
              </div>
              <div className="postContent">
                {e.metadata.description}
                <img src={defaultImgs[1]} className="postImg"></img>
              </div>
            </div>
          </div>
          </>
        )
      }) 
      }
      {/* <div className="feedPost">
          <img src={defaultImgs[0]} className="profilePic"></img>
          <div className="completeTweet">
            <div className="who">
                Placeholder
                <div className="accWhen">0xghdh...hdjsh - 1h</div>
            </div>
            <div className="postContent">
              Placeholder text
              <img src={defaultImgs[1]} className="postImg"></img>
            </div>
          </div>
      </div> */}
    </>
  )
}

export default PostInFeed