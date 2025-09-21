import React, { useState, useEffect, useRef } from "react";

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  setValue: (newValue: string) => void;
  disabled?: boolean;
}

export const Select = ({
  name,
  options,
  value,
  setValue,
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel =
    options.find((o) => o.value === value)?.label || `กรุณาเลือก ${name}`;

  return (
    <div className="w-full flex flex-col" ref={containerRef}>
      <label className="text-xs mb-1">{name}</label>

      <div
        className={`relative rounded-lg ${
          disabled ? "bg-gray-200" : "bg-white"
        } transition-all`}
      >
        <div
          className={`p-2 border cursor-pointer select-none ${
            disabled ? "pointer-events-none text-gray-500" : ""
          } ${isOpen ? "rounded-t-lg" : "rounded-lg"}`}
          onClick={() => !disabled && setIsOpen((prev) => !prev)}
        >
          {selectedLabel}
        </div>

        {isOpen && !disabled && (
          <div className="absolute top-full w-full left-0 border border-t-0 rounded-b-lg bg-white max-h-60 overflow-y-auto z-10">
            <input
              type="text"
              placeholder={`ค้นหา ${name}`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-2 border-b text-sm focus:outline-none box-border"
              autoFocus
            />

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => {
                    setValue(option.value);
                    setIsOpen(false);
                    setSearch(""); // reset search
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500 text-sm">ไม่พบรายการ</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
