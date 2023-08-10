// src/Dashboard.jsx

import "./index.css";
import React, { useState } from 'react';
import { Flex, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from './context/AuthContext';
import Sidebar from './components/SideBar';
import Canvas from './components/Canvas';

export default function Dashboard() {
  const { signOut, session } = useAuth();
  const direction = useBreakpointValue({ base: "column", md: "row" });
  
  const [activeView, setActiveView] = useState('Main');

  return (
    <Flex height="100vh" direction={direction}>
      <Sidebar signOut={signOut} setActiveView={setActiveView} />
      <Canvas flex="1" session={session} activeView={activeView} setActiveView={setActiveView} signOut={signOut} /> 
    </Flex>
  );
}


