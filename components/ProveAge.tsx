'use client'

import React, { useEffect, useContext } from "react";
import { Card, CardContent, CardFooter, CardTitle,} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import {AppContext}  from "@/context";
import { LaunchProveModal, useAnonAadhaar } from "@anon-aadhaar/react";

  const LaunchMode = ({
    isTest,
    setIsTestMode,
    address,
  }: {
    isTest: boolean;
    setIsTestMode: (isTest: boolean) => void;
    address: string;
  }) => {
    return (
      <span onClick={() => setIsTestMode(isTest)}>
        <LaunchProveModal
          nullifierSeed={Math.floor(Math.random() * 1983248)}
          signal={address}
          fieldsToReveal={[ 'revealAgeAbove18' ]}
          buttonStyle={{
            borderRadius: "8px",
            border: "solid",
            borderWidth: "1px",
            boxShadow: "none",
            fontWeight: 500,
            borderColor: "#009A08",
            color: "#009A08",
            fontFamily: "rajdhani",
          }}
          buttonTitle={isTest ? "PROCEED" : "USE YOUR REAL AADHAAR"}
        />
      </span>
    );
  };


const ProveAge: React.FC = () => {
    const [anonAadhaar] = useAnonAadhaar();
    const { setIsTestMode } = useContext(AppContext);
    const { isConnected, address } = useAccount();
    const router = useRouter();
  
    useEffect(() => {
      if (anonAadhaar.status === "logged-in") {
        router.push("./play");
      }
    }, [anonAadhaar]);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-lg shadow-xl">
      <Card className="">
      <CardTitle className="p-2 text-center">
          Only over 18 are allowed to place bets
      </CardTitle>

      <CardContent className="px-6 pt-4">
          Please prove you are over 18 using your Aadhaar QR code
      </CardContent>

      <CardFooter className="p-2 justify-center">

        {isConnected ? (
         <LaunchMode
           isTest={true}
           setIsTestMode={setIsTestMode}
           address={address as string}
         />) :
         <w3m-button/> 
        }
      </CardFooter>
    </Card>
    </div>
    </div>
  );
};

export default ProveAge;