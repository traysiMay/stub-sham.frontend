import React from "react";
import styled from "styled-components";

const Label = styled.div`
  margin-bottom: 5px;
`;

const SInput = styled.input`
  background: black;
  border: 2px solid white;
  color: white;
  padding: 11px;

  &.first,
  &.second {
    width: 50%;
  }
`;

interface Props {
  className: string;
  label: string;
  name: string;
  placeholder: string;
  handleChange?: any;
}
function Input({ className, label, name, placeholder, handleChange }: Props) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Label>{label}</Label>
      <SInput
        onChange={handleChange}
        className={className}
        placeholder={placeholder}
        name={name}
        type="tel"
      />
    </div>
  );
}

export default Input;
