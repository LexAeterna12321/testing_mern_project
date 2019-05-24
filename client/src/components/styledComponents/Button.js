import styled from "styled-components";
import { mainColor, dangerColor, borderRadius } from "./globalVars";
export const Button = styled.button`
  padding: 12px 0;
  margin: 20px 0;
  width: 100%;
  background: ${props => (props.error ? dangerColor : mainColor)};
  color: #fff;
  font-size: 18px;
  border: 0;
  border-radius: ${borderRadius};
  cursor: pointer;
  font-family: "Baloo Bhai", cursive;
  letter-spacing: 3px;
  & a {
    text-decoration: none;
    color: #fff;
  }
`;

export const GrayedButton = styled(Button)`
  background: #afafaf;
`;
