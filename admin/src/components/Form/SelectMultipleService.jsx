import { useState, useEffect, useMemo } from "react";
import Select from "react-select";

const SelectMultipleService = ({ optionsList, value = [], onChange, isClearable = true }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = useMemo(() =>
    optionsList?.map((item) => ({
      value: item?._id,
      label: item?.name,
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
      isClearable={isClearable}
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select services"
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

export default SelectMultipleService;
