// import dynamic from 'next/dynamic';
import  SwapComponent  from '@/components/SwapComponent';

// const DynamicSwapComponent = dynamic(() => import('@/components/SwapComponent'), {
//     ssr: false,
//     loading: () => <p>Loading...</p>
//   });
  

export default function SwapPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">BTC to WBTC Swap</h1>
      {/* <DynamicSwapComponent /> */}
      <SwapComponent/>
    </div>
  );
}
