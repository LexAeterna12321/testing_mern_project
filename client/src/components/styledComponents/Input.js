import styled from "styled-components";
import { borderRadius } from "./globalVars";
export const Input = styled.input`
  font-family: "Baloo Bhai", cursive;
  padding: 10px 20px;
  margin: 5px 0;
  box-sizing: border-box;
  background: #eee;
  border: 0;
  display: block;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #eee;
  border-radius: ${borderRadius};
  font-size: 1.2rem;
`;
