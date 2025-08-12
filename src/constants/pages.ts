import { Calculator, AlterMedicine, MedicineList } from "@/components";

export interface Page {
  name: string;
  component: React.ComponentType<any>;
}

export const pages: Page[] = [
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
