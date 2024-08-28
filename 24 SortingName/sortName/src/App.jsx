import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import SortName from "./components/SortName";

function App() {
  return (
    <div id="root" className="app-container">
      <ChakraProvider>
        <SortName />
      </ChakraProvider>
    </div>
  );
}

export default App;
