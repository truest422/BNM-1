import React, {useState, useEffect} from 'react';
import { defaultImgs } from "../public/defaultImgs";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { CONTRACT_ADDRESS } from "../consts/vars";
import { Spin } from "antd";
import { useVerifyMetadata } from "../hooks/useVerifyMetadata";

const appId = process.env.NEXT_PUBLIC_MORALIS_APPLICATION_ID;
const serverUrl = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;
const moralisSecert = process.env.NEXT_PUBLIC_MORALIS_SECERT;

// TRY TO RESOLVE THE 
const PostInFeed = ({profile}) => {

  const { Moralis, account } = useMoralis();

  const [postArr, setPostArr] = useState([]);
  const [loading, setLoading] = useState(false);
  const { verifyMetadata } = useVerifyMetadata();
  const Posts = Moralis.Object.extend("Tokens");
  const query = new Moralis.Query(Posts);
  // console.log(query)

  const resolveLink = (url) => {
    if (!url || !url.includes("ipfs://")) return url;
    return url.replace("ipfs://", "https://gateway.ipfs.io/ipfs/");
  };

  // TRY TO RESOLVE THE IPFS LINK IN THE SETTINGS PAGE
  useEffect(() => {
    const retrieveNfts = async () => {
      setLoading(true);
      await Moralis.start({ serverUrl, appId, moralisSecert });
      const nfts = await Moralis.Web3API.token.getAllTokenIds({
        address: CONTRACT_ADDRESS,
        chain: "matic",
      });
      // console.log(nfts)
      const NFTs = nfts.result;
      console.log(NFTs)
      NFTs.sort((a, b) => (a.block_number_minted > b.block_number_minted) ? 1 : -1)
      // NFTs.metadata = JSON.parse(nfts.metadata)
      setPostArr(NFTs)
      
      setLoading(false)
    }
    retrieveNfts();
  }, []);

  return (
    <>
      {postArr.map((nft, index) => {
        //Verify Metadata
        nft = verifyMetadata(nft);
        // console.log(nft)
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
                {nft?.metadata && nft?.metadata.description}
                {nft?.metadata && (
                  <img
                    src={nft?.metadata.image}
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