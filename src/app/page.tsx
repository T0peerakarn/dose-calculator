"use client";

import { useState } from "react";

import { Navigator } from "@/components";
import { pages } from "@/constants";

const HomePage = () => {
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);

  const renderPage = () => {
    const Component = pages[currentPageIdx].component;

    return (
      <div className="w-full h-full p-8 bg-blue-200">
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
