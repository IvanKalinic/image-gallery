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
  outline: none;
  display: flex;
  padding-left: 1rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
`;

export const PostContainer = styled.div`
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.25);
  width: 23rem;
  height: 7.625rem;
  display: flex;
  align-items: center;
  jusitfy-content: space-around;
  margin-left: 1.5rem;
`;

export const UploadBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: ${({ image }: { image: string }) =>
    !image ? "0.125rem dashed #ffffff" : "0rem"};
  border-radius: 0.625rem;
  width: 35vw;
  height: 50vh;
  background-color: #e5e5e5;
  cursor: pointer;
  margin-right: 5rem;
`;

export const Icon = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  border-radius: 50%;
  z-index: 102;
  border: 0.125rem solid black;
  width: 2rem;
  height: 2rem;
  &:hover {
    border: 0.125rem solid #8c3103;
  }
`;

export const Circle = styled.span`
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: ${navbarColor};
  border: 0.125rem solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PersonContainer = styled.span`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: white;
  border: 0.125rem solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 0.5rem;
`;
