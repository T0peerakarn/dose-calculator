import { Button } from "../common";

interface NavigatorProps {
  currentPageIdx: number;
  setCurrentPageIdx: (newPageIdx: number) => void;
  pages: string[];
}

export const Navigator = ({
  currentPageIdx,
  setCurrentPageIdx,
  pages,
}: NavigatorProps) => {
  const renderPageButtons = () => {
    return (
      <>
        {pages.map((page, idx) => (
          <Button
            key={idx}
            title={page}
            onClick={() => setCurrentPageIdx(idx)}
            isToggle={currentPageIdx === idx}
          />
        ))}
      </>
    );
  };

  return (
    <div className="flex justify-evenly gap-x-8 mt-auto">
      {renderPageButtons()}
    </div>
  );
};
