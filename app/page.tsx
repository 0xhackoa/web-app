import Marquee from "@/components/magicui/marquee";
import {QuestProtocols} from "../constants/questProtocols"
import { ReviewCard } from "@/components/ReviewCard";


export default function Home() {

  const firstRow = QuestProtocols.slice(0, QuestProtocols.length / 2);
const secondRow = QuestProtocols.slice(QuestProtocols.length / 2);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="text-5xl">
        <h1 className="">QuestChain</h1>
      </div>

      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Marquee pauseOnHover className="marqueeDuration-20s">
        {firstRow.map((QuestProtocols) => (
          <ReviewCard key={QuestProtocols.username} {...QuestProtocols} />
        ))}
      </Marquee>
      
      <Marquee reverse pauseOnHover className="marqueeDuration-20s">
        {secondRow.map((QuestProtocols) => (
          <ReviewCard key={QuestProtocols.username} {...QuestProtocols} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>

     <w3m-connect-button />
      <div>
 
      </div>

    </main>
  );
}



