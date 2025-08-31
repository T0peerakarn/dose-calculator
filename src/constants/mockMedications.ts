export const mockMedications: Medication[] = [
  {
    name: "Aluminium hydroxide + Magnesium hydroxide + Simeticone 60 mg 240 ml",
    refs: [
      {
        label: "phan.moph.go.th",
        value: "https://phan.moph.go.th/kanya/download/page02/06.pdf",
      },
    ],
    usages: [
      {
        indication: "Anti-flatulence, GERD",
        regimen: "ac 30 นาที หรือ pc 1 ชม. หรือเมื่อมีอาการ",
        ageRange: {
          lower: {
            year: 3,
          },
          upper: {
            year: 12,
          },
        },
        doseInfo: {
          doseLower: 0.5,
          doseUpper: 1,
          doseUnit: ["ml", "kg", "dose"],
        },
        maxDoseAmount: 30,
        maxDoseUnit: ["ml", "dose"],
      },
    ],
  },
  {
    name: "Amoxicillin + Clavulonate potassium 400+57 mg/5ml",
    strengthMg: 400,
    volumeMl: 5,
    refs: [
      {
        label: "pediatriconcall",
        value: "https://www.pediatriconcall.com/drugs/drugs-a-to-z",
      },
      {
        label: "idmp.ucsf.edu",
        value:
          "https://idmp.ucsf.edu/maximum-dosing-amoxicillin-and-amoxicillin-clavulanate",
      },
    ],
    usages: [
      {
        indication: "Infection treatment",
        regimen: "ทุก 8-12 ชม. ไม่เกิน 10 วัน",
        ageRange: {
          lower: {
            year: 0,
          },
          upper: {
            year: 12,
          },
        },
        doseInfo: {
          doseLower: 20,
          doseUpper: 90,
          doseUnit: ["mg", "kg", "day"],
        },
        maxDoseAmount: 2000,
        maxDoseUnit: ["mg", "day"],
      },
    ],
  },
  {
    name: "Cetirizine hydrochloride syrup 1mg/ml 60ml",
    strengthMg: 1,
    volumeMl: 1,
    refs: [
      {
        label: "แอพ ped dose",
      },
    ],
    usages: [
      {
        indication: "Antihistamine",
        regimen: "OD",
        ageRange: {
          lower: {
            year: 0,
            month: 6,
          },
          upper: {
            year: 0,
            month: 11,
          },
        },
        doseInfo: {
          doseLower: 2.5,
          doseUpper: 2.5,
          doseUnit: ["mg", "day"],
        },
        maxDoseAmount: 5,
        maxDoseUnit: ["mg", "day"],
      },
      {
        indication: "Antihistamine",
        regimen: "OD or BID",
        ageRange: {
          lower: {
            year: 0,
            month: 12,
          },
          upper: {
            year: 0,
            month: 23,
          },
        },
        doseInfo: {
          doseLower: 2.5,
          doseUpper: 2.5,
          doseUnit: ["mg", "day"],
        },
        maxDoseAmount: 5,
        maxDoseUnit: ["mg", "day"],
      },
      {
        indication: "Antihistamine",
        regimen: "2.5 mg OD or BID, 5 mg OD",
        ageRange: {
          lower: {
            year: 2,
          },
          upper: {
            year: 5,
          },
        },
        doseInfo: {
          doseLower: 2.5,
          doseUpper: 5,
          doseUnit: ["mg", "day"],
        },
        maxDoseAmount: 5,
        maxDoseUnit: ["mg", "day"],
      },
      {
        indication: "Antihistamine",
        regimen: "OD",
        ageRange: {
          lower: {
            year: 6,
          },
          upper: {
            year: 12,
          },
        },
        doseInfo: {
          doseLower: 5,
          doseUpper: 10,
          doseUnit: ["mg", "day"],
        },
        maxDoseAmount: 5,
        maxDoseUnit: ["mg", "day"],
      },
    ],
  },
  {
    name: "Guaifenesin  100 mg/5ml 60 ml oral solution (Glyceryl Guaiacolate)",
    strengthMg: 100,
    volumeMl: 5,
    refs: [
      {
        label: "drugs.com",
        value: "https://www.drugs.com/dosage/guaifenesin.html",
      },
    ],
    usages: [
      {
        indication: "Common cold",
        regimen: "6 divided doses",
        ageRange: {
          lower: {
            year: 0,
            month: 1,
          },
          upper: {
            year: 2,
          },
        },
        doseInfo: {
          doseLower: 12,
          doseUpper: 12,
          doseUnit: ["mg", "kg", "day"],
        },
        maxDoseAmount: 600,
        maxDoseUnit: ["mg", "day"],
      },
      {
        indication: "Common cold",
        regimen: "ทุก 4 ชม ตามที่ต้องการ",
        ageRange: {
          lower: {
            year: 2,
          },
          upper: {
            year: 5,
          },
        },
        doseInfo: {
          doseLower: 50,
          doseUpper: 100,
          doseUnit: ["mg"],
        },
        maxDoseAmount: 1.2,
        maxDoseUnit: ["g", "day"],
      },
      {
        indication: "Common cold",
        regimen: "ทุก 4 ชม ตามที่ต้องการ",
        ageRange: {
          lower: {
            year: 6,
          },
          upper: {
            year: 11,
          },
        },
        doseInfo: {
          doseLower: 100,
          doseUpper: 200,
          doseUnit: ["mg"],
        },
        maxDoseAmount: 1.2,
        maxDoseUnit: ["g", "day"],
      },
    ],
  },
  {
    name: "Lactulose Solution 10 g/15 ml 100 ml",
    strengthMg: 1000,
    volumeMl: 15,
    refs: [
      {
        label: "app peddose",
      },
    ],
    usages: [
      {
        indication: "Constipation",
        regimen: "วันละ 2 ครั้ง ปรับยาตามอาการ",
        ageRange: {
          lower: {
            year: 0,
            month: 1,
          },
          upper: {
            year: 0,
            month: 11,
          },
        },
        doseInfo: {
          doseLower: 2.5,
          doseUpper: 2.5,
          doseUnit: ["ml"],
        },
      },
      {
        indication: "Constipation",
        regimen: "วันละ 2 ครั้ง ปรับยาตามอาการ",
        ageRange: {
          lower: {
            year: 1,
          },
          upper: {
            year: 4,
          },
        },
        doseInfo: {
          doseLower: 2.5,
          doseUpper: 10,
          doseUnit: ["ml"],
        },
      },
      {
        indication: "Constipation",
        regimen: "วันละ 2 ครั้ง ปรับยาตามอาการ",
        ageRange: {
          lower: {
            year: 5,
          },
          upper: {
            year: 17,
          },
        },
        doseInfo: {
          doseLower: 5,
          doseUpper: 20,
          doseUnit: ["ml"],
        },
      },
    ],
  },
];
