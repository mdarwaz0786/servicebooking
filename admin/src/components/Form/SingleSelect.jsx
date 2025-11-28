/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import Select from "react-select";

const SingleSelect = ({
  optionsList,
  value = "",
  onChange,
  placeholder = "Select",
  labelKey = "name",
  valueKey = "_id",
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const options = useMemo(() =>
    optionsList?.map((item) => ({
      value: item?.[valueKey],
      label: item?.[labelKey],
    })) || [],
    [optionsList]
  );

  useEffect(() => {
    const found = options?.find((opt) => opt?.value === value);
    setSelectedOption(found || null);
  }, [value, options]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    onChange(selected ? selected.value : "");
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      classNamePrefix="react-select"
      styles={{
        control: (base) => ({
          ...base,
          borderColor: "#ced4da",
          boxShadow: "none",
          "&:hover": { borderColor: "#86b7fe" },
        }),
      }}
    />
  );
};

export default SingleSelect;
