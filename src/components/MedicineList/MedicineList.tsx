import { useState } from "react";
import { mockMedications } from "@/constants";
import { Input } from "../common";
import { FaRegEdit } from "react-icons/fa";

export const MedicineList = () => {
  const [search, setSearch] = useState<string>("");
  const [medications, _setMedications] =
    useState<Medication[]>(mockMedications);

  const formatAge = (age: Age) => {
    const { year, month } = age;
    if (month !== undefined) {
      return `${year}y ${month}m`;
    }
    return `${year}y`;
  };

  const renderSearchBox = () => (
    <div>
      <Input
        name="Search by medication name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );

  const renderTable = () => (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-black text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th />
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Strength (mg)</th>
            <th className="border px-4 py-2 text-left">Volume (ml)</th>
            <th className="border px-4 py-2 text-left">References</th>
            <th className="border px-4 py-2 text-left">Usage Details</th>
          </tr>
        </thead>
        <tbody>
          {medications
            .filter((med) =>
              med.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((med, index) => (
              <tr key={index} className="align-top">
                <td className="border px-4 py-2.5">
                  <FaRegEdit />
                </td>
                <td className="border px-4 py-2 font-semibold">{med.name}</td>
                <td className="border px-4 py-2">
                  {med.strengthMg !== undefined ? `${med.strengthMg} mg` : "-"}
                </td>
                <td className="border px-4 py-2">
                  {med.volumeMl !== undefined ? `${med.volumeMl} ml` : "-"}
                </td>
                <td className="border px-4 py-2">
                  <ul className="list-disc pl-4">
                    {med.refs.map((ref, refIndex) => (
                      <li key={refIndex}>
                        {ref.value ? (
                          <a
                            href={ref.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-all cursor-hover"
                          >
                            {ref.label}
                          </a>
                        ) : (
                          ref.label
                        )}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="border px-4 py-2">
                  <div className="space-y-4">
                    {med.usages.map((usage, usageIndex) => (
                      <div
                        key={usageIndex}
                        className="border border-gray-200 p-2 rounded bg-gray-50"
                      >
                        <p>
                          <strong>Indication:</strong> {usage.indication}
                        </p>
                        <p>
                          <strong>Regimen:</strong> {usage.regimen}
                        </p>
                        <p>
                          <strong>Age range:</strong>{" "}
                          {formatAge(usage.ageRange.lower)} -{" "}
                          {formatAge(usage.ageRange.upper)}
                        </p>
                        <p>
                          <strong>Dose info:</strong> {usage.doseInfo.doseLower}{" "}
                          - {usage.doseInfo.doseUpper}{" "}
                          {usage.doseInfo.doseUnit.join("/")}
                        </p>
                        {usage.maxDoseAmount && usage.maxDoseUnit && (
                          <p>
                            <strong>Max dose:</strong> {usage.maxDoseAmount}{" "}
                            {usage.maxDoseUnit.join("/")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <>
      {renderSearchBox()}
      {renderTable()}
    </>
  );
};
