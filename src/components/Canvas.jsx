// src/components/Canvas.jsx

import { Box, Heading, Flex, Spacer } from '@chakra-ui/react';
import MainView from '../views/MainView.jsx';
import ListView from '../views/ListView.jsx';
import MessageView from '../views/MessageView.jsx';
import SettingsView from '../views/SettingsView.jsx';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Canvas({ activeView, setActiveView }) {
  const { signOut, session } = useAuth();

  return (
    <Box flex="1" bg="#292929" p="5" width={{ base: '100%', md: 'auto' }} height={{ base: 'calc(100vh - 120px)', md: 'auto' }}>
      { activeView === 'Main' && <MainView setActiveView={setActiveView} /> }
      { activeView === 'List' && <ListView /> }
      { activeView === 'Message' && <MessageView /> }
      { activeView === 'Settings' && <SettingsView setActiveView={setActiveView} signOut={signOut}/> }
    </Box>
  );
}
