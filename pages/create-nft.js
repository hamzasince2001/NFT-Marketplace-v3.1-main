import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { useTheme } from "next-themes";
import toast from "react-hot-toast";
import axios from "axios";

//INTERNAL IMPORT
import { NFTContext } from "../context/NFTContext";
import { Button, Input, Loader, Banner } from "../components/index";
import images from "../assets";

//INFURA
// const projectId = "YOUR_PRIVATE_KEY";
// const projectSecretKey = "YOUR_SECRECT_KEY";
// const auth = `Basic ${Buffer.from(`${projectId}:${projectSecretKey}`).toString(
//   "base64"
// )}`;

// const subdomain = "YOUR_SUBDOMAIN";

// const client = ipfsHttpClient({
//   host: "infura-ipfs.io",
//   port: 5001,
//   protocol: "https",
//   headers: {
//     authorization: auth,
//   },
// });

//---UPLOAD TO IPFS FUNCTION
// const uploadToIPFS = async (file) => {
//   if (file) {
//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       console.log("umar");
//       const response = await axios({
//         method: "post",
//         url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         data: formData,
//         headers: {
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTY5YmUwOC00ZGVmLTQ4YWItODJlMi03YjRmZTJhNWU5MTYiLCJlbWFpbCI6InVtYXIzNjFmYXJvb3FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFhYmZkZTdhMGQ3MTRmYzliNjJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMTU3ZDRjZjNmZWU1ZjdhMTI3YzI2NzU0N2VkZTI3Mjk0NTM4YzFiNGJkNGY2MzM5MWQxY2Y0YjNjMjk2NmFkNSIsImlhdCI6MTcxMDMxNTM2MX0.7mlHSNkQGHXN3KPlOeA2qoGQlDGLiUjhO6Lo0hptI0A', 

//           "Content-Type": "multipart/form-data",
//         },
//       });
//       const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//       return ImgHash;
//     } catch (error) {
//       console.log("Unable to upload audio to Pinata");
//     }
//   }
// };


const CreateItem = () => {
  const { createSale, isLoadingNFT } = useContext(NFTContext);
  const [fileUrl, setFileUrl] = useState(null);

  const notifyError = (msg) => toast.error(msg, { duration: 2000 });

  const { theme } = useTheme;

  // const uploadToInfura = async (file) => {
  //   try {
  //     const added = await client.add({ content: file });

  //     const url = `${subdomain}/ipfs/${added.path}`;
  //     console.log(url);
  //     setFileUrl(url);
  //   } catch (error) {
  //     console.log("Error uploading file", error);
  //   }
  // };
  const uploadToInfura = async (file) => {
  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log("umar");
      const response = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTY5YmUwOC00ZGVmLTQ4YWItODJlMi03YjRmZTJhNWU5MTYiLCJlbWFpbCI6InVtYXIzNjFmYXJvb3FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFhYmZkZTdhMGQ3MTRmYzliNjJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMTU3ZDRjZjNmZWU1ZjdhMTI3YzI2NzU0N2VkZTI3Mjk0NTM4YzFiNGJkNGY2MzM5MWQxY2Y0YjNjMjk2NmFkNSIsImlhdCI6MTcxMDMxNTM2MX0.7mlHSNkQGHXN3KPlOeA2qoGQlDGLiUjhO6Lo0hptI0A', 

          "Content-Type": "multipart/form-data",
        },
      });
      const ImgHash = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
      setFileUrl(ImgHash);
      // return ImgHash;
    } catch (error) {
      console.log("Unable to upload audio to Pinata");
    }
  }
};

  const onDrop = useCallback(async (acceptedFile) => {
    await uploadToInfura(acceptedFile[0]);
  }, []);

  const {
    getInputProps,
    getRootProps,
    isDragAccept,
    isDragActive,
    isDragReject,
  } = useDropzone({ onDrop, maxSize: 500000000000 });

  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed ${
        isDragActive ? "border-file-active" : ""
      }  ${isDragAccept ? "border-file-accept" : ""}
      ${isDragReject ? "border-file-reject" : ""}`,
    [isDragAccept, isDragActive, isDragReject]
  );

  const [fileType, setFileType] = useState("Image");

  const [formInput, updateFormInput] = useState({
    price: "",
    name: "",
    description: "",
    category: "",
    tokenPrice: "",
  });

  const router = useRouter();

  // //---CREATE NFT FUNCTION
// const createNFT = async (name, price, image, description, router) => {
//   if (!name || !description || !price || !image)
//     return setError("Data Is Missing"), setOpenError(true); 

//   const metadata = {
//     name,
//     description,
//     image,
//     attributes: [
//       {
//         trait_type: "Price",
//         value: price
//       }
//     ]
//   };

//   try {
//     const response = await axios({
//       method: "post",
//       url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
//       data: {
//         pinataContent: metadata
//       },
//       headers: {
//      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTY5YmUwOC00ZGVmLTQ4YWItODJlMi03YjRmZTJhNWU5MTYiLCJlbWFpbCI6InVtYXIzNjFmYXJvb3FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFhYmZkZTdhMGQ3MTRmYzliNjJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMTU3ZDRjZjNmZWU1ZjdhMTI3YzI2NzU0N2VkZTI3Mjk0NTM4YzFiNGJkNGY2MzM5MWQxY2Y0YjNjMjk2NmFkNSIsImlhdCI6MTcxMDMxNTM2MX0.7mlHSNkQGHXN3KPlOeA2qoGQlDGLiUjhO6Lo0hptI0A', 
//         'Content-Type': 'application/json'
//       },
//     });
//     const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
//     console.log(url);
//        try {
//           await createSale(url, price);
//           router.push("/searchPage");
//           } catch (error) {
//               setError("Error while creating NFT");
//           setOpenError(true);
//           }
//   } catch (error) {
//     console.log("Unable to upload NFT metadata to Pinata");
//   }
// };

  const createMarket = async () => {
    const { name, description, price, category, tokenPrice } = formInput;

    if (!name || !description || !price || !fileUrl || !category || !tokenPrice)
      return notifyError("Please Provide all Data");

    //UPLOAD TO IPFS
    const data = JSON.stringify({
      name,
      description,
      category,
      image: fileUrl,
    });

    // try {
    //   const added = await client.add(data);
    //   const url = `${subdomain}/ipfs/${added.path}`;

    //   await createSale(url, formInput.price, formInput.tokenPrice);
    //   router.push("/");
    // } catch (error) {
    //   console.log("Error uploading to file", error);
    // }
      try {
    const response = await axios({
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      data: {
        pinataContent: data
      },
      headers: {
     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwZTY5YmUwOC00ZGVmLTQ4YWItODJlMi03YjRmZTJhNWU5MTYiLCJlbWFpbCI6InVtYXIzNjFmYXJvb3FAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImFhYmZkZTdhMGQ3MTRmYzliNjJkIiwic2NvcGVkS2V5U2VjcmV0IjoiMTU3ZDRjZjNmZWU1ZjdhMTI3YzI2NzU0N2VkZTI3Mjk0NTM4YzFiNGJkNGY2MzM5MWQxY2Y0YjNjMjk2NmFkNSIsImlhdCI6MTcxMDMxNTM2MX0.7mlHSNkQGHXN3KPlOeA2qoGQlDGLiUjhO6Lo0hptI0A', 
        'Content-Type': 'application/json'
      },
    });
    const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    console.log(url);
       try {
          await createSale(url, formInput.price, formInput.tokenPrice);
          router.push("/");
          } catch (error) {
            console.log("Error uploading to file", error);
          // setOpenError(true);
          }
  } catch (error) {
    console.log("Unable to upload NFT metadata to Pinata");
  }
// };

  };

  if (isLoadingNFT) {
    return (
      <div className="flexCenter" style={{ height: "51vh" }}>
        <Loader />
      </div>
    );
  }

  console.log(formInput);

  return (
    <div className="flex justify-center sm:px-4 p-12">
      <div className="w-3/5 md:w-full">
        <Banner
          name={<> Create new item</>}
          childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
          parentStyle="justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
        />
        <h1 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-10">
          Select Category
        </h1>

        <div className="mt-7 w-full flex flex-wrap place-content-between md:justify-center gap-x-5">
          <Button
            btnName={"Image"}
            btnType={"primary"}
            classStyle={`rounded sm:mt-4  ${
              formInput.category == "Image" && "active_gray"
            }`}
            handleClick={(e) => (
              setFileType(e.target.innerText),
              updateFormInput({ ...formInput, category: e.target.innerText })
            )}
          />
          <Button
            btnName={"Audio"}
            btnType={"primary"}
            classStyle={`rounded sm:mt-4  ${
              formInput.category == "Audio" && "active_gray"
            }`}
            handleClick={(e) => (
              setFileType(e.target.innerText),
              updateFormInput({ ...formInput, category: e.target.innerText })
            )}
          />
          <Button
            btnName={"Video"}
            btnType={"primary"}
            onClick={() => setFileType("Video")}
            classStyle={`rounded sm:mt-4  ${
              formInput.category == "Video" && "active_gray"
            }`}
            handleClick={(e) => (
              setFileType(e.target.innerText),
              updateFormInput({ ...formInput, category: e.target.innerText })
            )}
          />
        </div>

        <div className="mt-16">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
            Upload file
          </p>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG , WEBM, MP3, MP4, Max 100mb
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src={images.upload}
                    width={100}
                    height={100}
                    objectFit="contain"
                    alt="upload"
                    className={theme == "light" ? "filter invert" : undefined}
                  />
                </div>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>
              </div>
            </div>

            {/* //LOAD COMPONENT */}

            {fileUrl && (
              <aside>
                <div>
                  {fileType === "Image" ? (
                    <img src={fileUrl} alt="ASSET_FILE"  />
                  ) : fileType === "Video" ? (
                    <video
                      src={fileUrl}
                      color="#705df2"
                      className="createPageVideo"
                      controls
                    ></video>
                  ) : (
                    <audio controls className="createPagePlayer changePosition">
                      <source src={fileUrl} type="audio/ogg" />
                      <source src={fileUrl} type="audio/mpeg" />
                      Your browser dose not support the audio tag
                    </audio>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>

        {/* //INPUT COMPONENT */}
        <Input
          inputType={"input"}
          title={"Name"}
          placeholder={"Asset Name"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <Input
          inputType={"textarea"}
          title={"Description"}
          placeholder={"Asset Description"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />
        <Input
          inputType={"number"}
          title={"Price"}
          placeholder={"ether price"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, price: e.target.value })
          }
        />
        <Input
          inputType={"number"}
          title={"Native token price"}
          placeholder={"ether price"}
          handleClick={(e) =>
            updateFormInput({ ...formInput, tokenPrice: e.target.value })
          }
        />

        <div className="mt-7 w-full flex justify-end">
          <Button
            btnName={"Create Item"}
            btnType={"primary"}
            classStyle={"rounded"}
            handleClick={createMarket}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
