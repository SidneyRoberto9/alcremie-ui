'use client';
import CountUp from 'react-countup';
import { ReactNode } from 'react';

interface StatisticItemProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export function StatisticItem({ title, value, icon }: StatisticItemProps) {
  return (
    <div className="bg-transparent m-2 rounded-md">
      <div className="flex">
        <div className="p-4 m-4 rounded-md cursor-pointer transition-all duration-200 ease-in hover:scale-110 text-violet-300 bg-lucide-600 max-w-[110px]">
          {icon}
        </div>

        <div className="flex items-center justify-center w-full mx-3 my-8 bg-lucide-600 rounded-2xl">
          <div className="flex flex-col items-center justify-center ">
            <h3 className="text-2xl mt-2 px-2">
              <CountUp end={value} delay={2} duration={3} separator="" />
            </h3>
            <h4 className="text-xl text-zinc-500">{title}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
