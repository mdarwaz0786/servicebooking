import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";

const Select2Multiple = ({ optionsList, value = [], onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // convert list into react-select format
  const options = useMemo(
    () => optionsList.map(cat => ({ value: cat._id, label: cat.name })),
    [optionsList]
  );

  // sync parent value -> local state
  useEffect(() => {
    const preSelected = options.filter(opt => value.includes(opt.value));
    setSelectedOptions(preSelected);
  }, [value, options]);

  const handleChange = (selected) => {
    setSelectedOptions(selected || []);
    // sirf IDs parent ko bhejo
    onChange(selected ? selected.map(opt => opt.value) : []);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select categories"
    />
  );
};

export default Select2Multiple;
