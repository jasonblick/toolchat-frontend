// src/views/SettingsView.jsx

import {
    Box, Button, Heading, useBreakpointValue, Flex, Image, Text
  } from '@chakra-ui/react';
  import addchat from '../assets/addchat.svg';
  import { useAuth } from '../context/AuthContext';
  import { useAppContext } from '../context/AppContext';
  import { Session } from '../classes/Session';
  import React from 'react';
  
  export default function SettingsView({ signOut, setActiveView }) {
    const { setActiveSession } = useAppContext();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { session } = useAuth();
  
    return (
        <Box>
            <Flex direction="column" align="center" marginTop="20px">
                <Heading color="white" width="80%" size={isMobile ? "md" : "lg"} align="center">Settings</Heading>
                <Box width="50%" height="3px" borderRadius="5px" bg="white" marginTop="40px" />
            </Flex>
            <Flex direction="column" align="center" justify="start" height="100%" width="100%" pt="0">
                <Button 
                    marginTop="40px" 
                    bg="#4b4b4b"
                    _hover={{ bg: "#00b34d" }}
                    borderRadius="20px"
                    color="white"
                    width={isMobile ? "50%" : "120px"}
                    height="70px"
                    onClick={signOut}
                >
                    LOGOUT
                </Button>
            </Flex>
        </Box>
    );
  }
  
  