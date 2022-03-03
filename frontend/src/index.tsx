import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import { UserProvider } from "./context";

const queryClient = new QueryClient();

const AppContainer = styled.div`
  font-family: Roboto;
`;

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <AppContainer>
          <ChakraProvider>
            <App />
          </ChakraProvider>
        </AppContainer>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
