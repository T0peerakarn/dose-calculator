"use client";

import { useState } from "react";

import {
  Navigator,
  Calculator,
  AlterMedicine,
  MedicineList,
} from "@/components";

const HomePage = () => {
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const pages = [
    {
      name: "คำนวณขนาดยา",
      component: Calculator,
    },
    {
      name: "ป้อนข้อมูลยาใหม่",
      component: AlterMedicine,
    },
    {
      name: "รายชื่อยา",
      component: MedicineList,
    },
  ];

  const renderPage = () => {
    const Component = pages[currentPageIdx].component;

    return (
      <div className="w-full h-full flex flex-col gap-y-4 overflow-y-scroll">
        <Component />
      </div>
    );
  };

  const renderNavigator = () => {
    return (
      <Navigator
        currentPageIdx={currentPageIdx}
        setCurrentPageIdx={(newPageIdx: number) =>
          setCurrentPageIdx(newPageIdx)
        }
        pages={pages}
      />
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col px-8 py-8 gap-y-8">
      {renderPage()}
      {renderNavigator()}
    </div>
  );
};

export default HomePage;
