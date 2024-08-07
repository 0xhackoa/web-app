'use client'

import React, { useEffect, useState } from 'react';
import { deserialize } from '@anon-aadhaar/core';
import { useRouter } from "next/navigation";
import { useAnonAadhaar } from '@anon-aadhaar/react';
import { useAccount } from "wagmi";


export default function Play() {
  const [anonAadhaar] = useAnonAadhaar();
  const { isConnected } = useAccount();
  const [eligibleUser, setEligibleUser] = useState(false)
  const router = useRouter();


  useEffect(() => {
    const aaObj = localStorage.getItem("anonAadhaar");
    const anonAadhaarProofs = JSON.parse(aaObj!).anonAadhaarProofs;

    deserialize(
      anonAadhaarProofs[Object.keys(anonAadhaarProofs).length - 1].pcd
    ).then((result) => {
      console.log("anonAadresulthaar", result);
      setEligibleUser(result.proof.ageAbove18 === "1" && true)
  
    });
  }, [anonAadhaar]);

  if(!isConnected){
    router.push("./");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Who is your Winning Swimmer?</h1>
 {/* check if its connected to wallet and anon data available for age then show play page */}
    {!eligibleUser ? (
      <h1>User must be above 18 to place a bet!</h1>
    )
  : (
    <h1>Please place your bet</h1>
  )}
    </main>
  ) 
} 