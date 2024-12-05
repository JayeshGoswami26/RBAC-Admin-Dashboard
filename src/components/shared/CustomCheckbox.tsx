import React from 'react';

interface CustomCheckboxProps {
  id: string;
  name: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  id,
  name,
  checked,
  onChange,
  label
}) => {
  return (
    <div className="cntr flex items-center gap-2">
      <input
        id={id}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden-xs-up"
      />
      <label htmlFor={id} className="cbx"></label>
      <label htmlFor={id} className="lbl text-sm capitalize text-gray-300">
        {label}
      </label>
    </div>
  );
};

export default CustomCheckbox;