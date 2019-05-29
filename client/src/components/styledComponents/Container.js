import styled from "styled-components";
import { bgColor, borderRadius } from "./globalVars";

export const Container = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  box-shadow: 1px 3px 5px 3px rgba(0, 0, 0, 0.12);
  border-radius: ${borderRadius};
  background: ${bgColor};
  z-index: 1;
`;
