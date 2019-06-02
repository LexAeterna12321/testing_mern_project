import styled from "styled-components";
import { mainColor } from "./globalVars";
export const TypingContainer = styled.div`
  color: ${mainColor};
  width: 100%;
  height: ${props => (props.isTyping ? "50px" : "0")};
  text-overflow: ellipsis;
`;
