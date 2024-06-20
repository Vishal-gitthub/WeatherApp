import React from "react";
import MainPage from "./pages/MainPage";
import { ContextProvider } from "./context/Context";
const App = () => {
  return (
    <>
      <ContextProvider>
        <MainPage />
      </ContextProvider>
    </>
  );
};

export default App;
