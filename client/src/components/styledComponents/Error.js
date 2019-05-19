import styled from "styled-components";
import { dangerColor, successColor } from "./globalVars";
export const Error = styled.p`
  padding: 14px 0px;
  margin: 0 20px 0 0;
  border-bottom: 1px solid #e9e9e9;
  color: ${props =>
    props.alertType === "danger" ? dangerColor : successColor};
  text-align: center;
  font-size: 1.4rem;
  text-transform: uppercase;
`;
