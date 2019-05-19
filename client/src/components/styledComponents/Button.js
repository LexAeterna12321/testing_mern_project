import styled from "styled-components";

export const Button = styled.button`
  padding: 12px 0;
  margin: 20px 0;
  width: 100%;
  background: ${props => (props.error ? "#b32e44" : "#575ed8")};
  color: #fff;
  font-size: 18px;
  border: 0;
  border-radius: 10px;
  cursor: pointer;
`;
