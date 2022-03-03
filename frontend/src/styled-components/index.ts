import styled from "styled-components";
import { navbarColor, loginColors } from "../global_styles";

export const FixedNavbarWrapper = styled.div`
  position: fixed;
  top: 0;
  height: 5.25rem;
  width: 100vw;
  background-color: ${navbarColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LoginNavbarWrapper = styled.div`
  position: relative;
  top: 3.75rem;
  left: -10vw;
  height: 6.875rem;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${navbarColor};
`;

export const LoaderContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const UniversalWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  text-align: center;
  h1 {
    font-size: 10rem;
  }
  h3 {
    color: hsl(209, 34%, 30%);
    margin-bottom: 1.5rem;
  }
`;

export const SearchWrapper = styled.input`
  border: 1px solid #a0aec0;
  width: 23.125rem;
  height: 3rem;
  color: ${loginColors};
  margin-top: 2rem;
  outline: none;
  display: flex;
  padding-left: 1rem;
`;
