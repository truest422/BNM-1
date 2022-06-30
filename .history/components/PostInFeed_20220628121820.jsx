import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { CONTRACT_ADDRESS } from "../consts/vars";
import { Spin } from "antd";
import { useVerifyMetadata } from "../hooks/useVerifyMetadata";
import moralis from "moralis";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;
moralis.initialize(appId);
moralis.serverURL = serverUrl;

const PostInFeed = ({profile}) => {

  const { Moralis, account } = useMoralis();
  const user = moralis.User.current();
  // console.log(account)

  const [postArr, setPostArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  useEffect(() => {
    const retrieveNfts = async () => {
      setLoading(true);
      await Moralis.start({ serverUrl, appId, moralisSecert });
      const nfts = await Moralis.Web3API.token.getAllTokenIds({
        address: CONTRACT_ADDRESS,
        chain: "mumbai",
      });
      const NFTs = nfts.result;
      NFTs.sort((a, b) => (a.block_number_minted > b.block_number_minted) ? 1 : -1)
      setPostArr(NFTs)
      
      setLoading(false)
    }
    retrieveNfts();
  }, []);

  useEffect(() => {
    async function getPostInfo() {
      try {
        const Posts = Moralis.Object.extend("Tweets");
        const query = new Moralis.Query(Posts)
        if (profile) {
          query.equalTo("postAcc", account);
        }
        // Finish coding the post in feed to only include posts not made by you in the feed
      }
    }
  })

  return (
    <>
      {postArr.map((nft, index) => {
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
                {nft?.metadata && JSON.parse(nft?.metadata).description}
                {nft?.metadata && (
                  <img
                    src={JSON.parse(nft?.metadata).image}
                    className="postImg"
                  ></img>
                )}
              </div>
            </div>
          </div>
          </>
        )
        }).reverse() 
      }
    </>
  )
}

export default PostInFeed