'use client'

import React, { useState, useEffect } from 'react';
import { BitcoinNetwork, BitcoinOTA, BitcoinProvider, EVMWallet } from '@catalogfi/wallets';
// import { EthereumProvider } from '@walletconnect/ethereum-provider'
import { Orderbook, Chains, Assets, Actions, parseStatus, TESTNET_ORDERBOOK_API } from '@gardenfi/orderbook';
import { GardenJS } from '@gardenfi/core';
import { JsonRpcProvider, BrowserProvider } from 'ethers';
import { ethers } from "ethers";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { projectId } from '@/config';

const SwapComponent: React.FC = () =>  {
  const [sendAmount, setSendAmount] = useState('');
  const [receiveAmount, setReceiveAmount] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sendAmount) {
      const receiveAmountValue = (1 - 0.3 / 100) * parseFloat(sendAmount) * 1e8;
      setReceiveAmount(receiveAmountValue.toString());
    }
  }, [sendAmount]);

  const handleSwap = async () => {
    console.log("checking chwcking");
    try {
      setError('');
      setStatus('Initializing swap...');

      // Get signer from Web3 provider
      // const browserProvider = new ethers.BrowserProvider(window.ethereum);
      // const signer = await ethers.Web3Provider.getSigner();





      // Create Bitcoin OTA
      const bitcoinProvider = new BitcoinProvider(BitcoinNetwork.Mainnet);
      const bitcoinOTA = new BitcoinOTA(bitcoinProvider, signer);

      // Create EVM wallet using the same signer
      const evmWallet = new EVMWallet(signer);

      // Initialize Orderbook
      const orderbook = await Orderbook.init({
        url: TESTNET_ORDERBOOK_API, 
        signer,
      });

      // Initialize GardenJS
      const wallets = {
        [Chains.bitcoin]: bitcoinOTA,
        [Chains.ethereum]: evmWallet,
      };
      const garden = new GardenJS(orderbook, wallets);

      // Create swap
      const sendAmountInSatoshis = parseFloat(sendAmount) * 1e8;
      const receiveAmountInSatoshis = parseFloat(receiveAmount);
      
      setStatus('Creating swap order...');
      const orderId = await garden.swap(
        Assets.bitcoin.BTC,
        Assets.ethereum.WBTC,
        sendAmountInSatoshis,
        receiveAmountInSatoshis
      );

      setStatus(`Order created with ID: ${orderId}. Waiting for updates...`);

      // Subscribe to order updates
      garden.subscribeOrders(await evmWallet.getAddress(), async (orders) => {
        const order = orders.filter((order) => order.ID === orderId)[0];
        if (!order) return;

        const action = parseStatus(order);

        if (action === Actions.UserCanInitiate || action === Actions.UserCanRedeem) {
          setStatus(`Performing action: ${action}...`);
          const swapper = garden.getSwap(order);
          const swapOutput = await swapper.next();
          setStatus(`Completed action ${swapOutput.action} with transaction hash: ${swapOutput.output}`);
        }
      });
    } catch (err) {
      console.error(err);
      setError('An error occurred during the swap process. Please check your connection and try again.');
    }
  };

  return (
    <Card className="w-[350px]">
        <CardHeader>
            <CardTitle>
            <h2 className="text-2xl font-bold">BTC to WBTC Swap</h2>
            </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="sendAmount" className="block text-sm font-medium text-gray-700">
              BTC Amount to Send
            </label>
            <Input
              id="sendAmount"
              type="number"
              value={sendAmount}
              onChange={(e) => setSendAmount(e.target.value)}
              placeholder="Enter BTC amount"
            />
          </div>
          <div>
            <label htmlFor="receiveAmount" className="block text-sm font-medium text-gray-700">
              WBTC Amount to Receive (Estimated)
            </label>
            <Input
              id="receiveAmount"
              type="number"
              value={receiveAmount}
              readOnly
              placeholder="Estimated WBTC amount"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSwap} className="w-full">
          Swap BTC to WBTC
        </Button>
      </CardFooter>
      {status && (
        <Alert className="mt-4">
            <AlertTitle>Status</AlertTitle>
          <AlertDescription>{status}</AlertDescription>
        </Alert>
      )}
      {error && (
        <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </Card>
  );
};


export default SwapComponent
