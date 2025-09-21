"use client";

import { useEffect, useState } from "react";

import {
  Navigator,
  Calculator,
  AlterMedicine,
  MedicineList,
} from "@/components";
import { getAllMedications } from "@/utils/mongoose";

export interface PageProps {
  medications: (Medication & { _id: string })[];
  selectedId: string | null;
  selectMedicationToEdit: (id: string) => void;
}

const HomePage = () => {
  const [medications, setMedications] = useState<
    (Medication & { _id: string })[]
  >([]);
  const [currentPageIdx, setCurrentPageIdx] = useState<number>(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectMedicationToEdit = (id: string) => {
    setSelectedId(id);
    setCurrentPageIdx(1);
  };

  const pages: { name: string; component: React.ComponentType<PageProps> }[] = [
    {
      name: "คำนวณขนาดยา",
      component: Calculator,
    },
    {
      name: "ป้อนข้อมูลยาใหม่ / แก้ไขข้อมูลยา",
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
        <Component
          medications={medications}
          selectedId={selectedId}
          selectMedicationToEdit={selectMedicationToEdit}
        />
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
        pages={pages.map((p) => p.name)}
      />
    );
  };

  useEffect(() => {
    const fetchMedications = async () => {
      const response = await getAllMedications();
      setMedications(
        response.sort((a: Medication, b: Medication) =>
          a.name.localeCompare(b.name)
        )
      );
    };

    fetchMedications();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col px-8 py-8 gap-y-8">
      {renderPage()}
      {renderNavigator()}
    </div>
  );
};

export default HomePage;
