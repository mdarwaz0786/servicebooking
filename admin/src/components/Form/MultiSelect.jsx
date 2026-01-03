/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from "react";
import Select from "react-select";

const MultiSelect = ({ optionsList, value = [], onChange, placeholder = "Select", labelKey = "name", valueKey = "_id", disabled = false, isClearable = true }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = useMemo(() =>
    optionsList?.map((item) => ({
      value: item?.[valueKey],
      label: item?.[labelKey],
    })) || [], [optionsList]);

  useEffect(() => {
    const preSelected = options?.filter((opt) => value?.includes(opt?.value));
    setSelectedOptions(preSelected);
  }, [value, options]);

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
    onChange(selected ? selected.map((opt) => opt?.value) : []);
  };

  return (
    <Select
      isMulti
      isDisabled={disabled}
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder={placeholder}
      classNamePrefix="react-select"
      isClearable={isClearable}
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

export default MultiSelect;
