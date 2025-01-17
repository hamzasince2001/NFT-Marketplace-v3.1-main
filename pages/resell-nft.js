import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import { Button, Input, Loader } from "../components/index";

const resellNFT = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);

  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();
  const { id, tokenURI } = router.query;

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    setPrice(data.price);
    setImage(data.image);
  };

  useEffect(() => {
    fetchNFT();
  }, [id]);

  //RESELL

  const resell = async () => {
    await createSale(tokenURI, price, 0, true, id);

    router.push("/");
  };

  //LOADING
  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: "51vh" }}>
        <Loader />
      </div>
    );
  }
  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl">
          Resell NFT
        </h1>

        <Input
          inputType={"number"}
          title={"Price"}
          placeholder={"asset price"}
          handleClick={(e) => setPrice(e.target.value)}
        />

        {image && <img className="rounded mt-4" width={"350"} src={image} />}

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Listed NFT"}
            btnType={"primary"}
            classStyle={"rounded-xl"}
            handleClick={resell}
          />
        </div>
      </div>
    </div>
  );
};

export default resellNFT;
