// src/views/ListView.jsx

import {
  Box, Button, Heading, useBreakpointValue, Flex, Image, Text
} from '@chakra-ui/react';
import addchat from '../assets/addchat.svg';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Session } from '../classes/Session';
import React from 'react';

export default function ListView({ setActiveView }) {
  const { setActiveSession } = useAppContext();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { session } = useAuth();

  return (
      <Box>
          <Flex direction="column" align="center" marginTop="20px">
              <Heading color="white" width="80%" size={isMobile ? "md" : "lg"} align="center">Library</Heading>
              <Box width="50%" height="3px" borderRadius="5px" bg="white" marginTop="40px" />
          </Flex>
      </Box>
  );
}

