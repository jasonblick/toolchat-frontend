// App.jsx

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Routing from "./Routing";
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <AuthProvider>
          <AppProvider>
            <Routing />
          </AppProvider>
        </AuthProvider>
      </Router>
    </ChakraProvider>
  );
}

