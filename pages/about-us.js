import React from "react";

//INTERNAL IMPORT
import { Banner, Action } from "../components/index";

const aboutUs = () => {
  return (
    <div>
      <Banner
        name={
          <>
            Welcome to global nfts <br /> CryptoKing
          </>
        }
        childStyles={"md:text-4xl sm:text-2xl xs:text-xl text-left"}
        parentStyle={
          "justify-start mb-7 h-72 sm:h-60 p-12 xs:p-4 xs:h-44 rounded"
        }
      />

      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-3/5 md:w-full">
          <section className="dark:text-gray-100">
            <div className="container max-w-5xl px-4 py-12 mx-auto">
              <div className="grid gap-4 mx-4">
                <div className="col-span-12 sm:col-span-3">
                  <div className="text-center sm:text-left mb-14 before:block before:w-24 before:h-3 before:mb-5 before:rounded-md before:mx-auto sm:before:mx-0 before:bg-[#705df2]">
                    <h3 className="text-3xl font-semibold">Crypto King</h3>
                    <span className="text-sm font-bold tracki uppercase dark:text-gray-400">
                       NFT Marketplace
                    </span>
                  </div>
                </div>

                <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
                  <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:dark:bg-gray-700">
                    {/* //1 */}
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:top-1 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-[#705df2]">
                      <h3 className="text-xl font-semibold tracki">
                        Lorem ipsum dolor, sit
                      </h3>
                      <time className="text-xs tracki uppercase dark:text-green-400">
                        Dec 2023
                      </time>

                      <p className="mt-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Error fugit quo, adipisci impedit asperiores culpa
                        labore possimus saepe illo, facere a accusamus omnis,
                        natus autem eos consequuntur cum eum quisquam!
                      </p>
                    </div>

                    {/* //2 */}
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:top-1 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-[#705df2]">
                      <h3 className="text-xl font-semibold tracki">
                        Lorem ipsum dolor, sit
                      </h3>
                      <time className="text-xs tracki uppercase dark:text-green-400">
                        Dec 2023
                      </time>

                      <p className="mt-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Error fugit quo, adipisci impedit asperiores culpa
                        labore possimus saepe illo, facere a accusamus omnis,
                        natus autem eos consequuntur cum eum quisquam!
                      </p>
                    </div>

                    {/* //3 */}
                    <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:top-1 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-[#705df2]">
                      <h3 className="text-xl font-semibold tracki">
                        Lorem ipsum dolor, sit
                      </h3>
                      <time className="text-xs tracki uppercase dark:text-green-400">
                        Dec 2023
                      </time>

                      <p className="mt-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Error fugit quo, adipisci impedit asperiores culpa
                        labore possimus saepe illo, facere a accusamus omnis,
                        natus autem eos consequuntur cum eum quisquam!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Action />
        </div>
      </div>
    </div>
  );
};

export default aboutUs;
