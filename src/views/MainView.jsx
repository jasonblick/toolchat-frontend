// src/views/MainView.jsx

import {
    Box, Button, Heading, useBreakpointValue, Flex, Image, Text
} from '@chakra-ui/react';
import addchat from '../assets/addchat.svg';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Session } from '../classes/Session';
import React from 'react';

export default function MainView({ setActiveView }) {
    const { setActiveSession } = useAppContext();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { session } = useAuth();

    return (
        <Box>
            <Flex direction="column" align="center" marginTop="20px">
                <Heading color="white" width="80%" size={isMobile ? "md" : "lg"} align="center">New Troubleshooting Chat</Heading>
                <Box width="50%" height="3px" borderRadius="5px" bg="white" marginTop="40px" />
            </Flex>
            <Flex direction="column" align="center" justify="start" height="100%" width="100%" pt="0">
                <Button
                    marginTop="40px"
                    bg="#4b4b4b"
                    _hover={{ bg: "#00b34d" }}
                    borderRadius="20px"
                    color="white"
                    height="70px"
                    align="center"
                    width={isMobile ? "50%" : "120px"}
                    onClick={() => {
                        (async () => {
                            const newSession = new Session('system', 'interview');
                            setActiveSession(newSession);
                            setActiveView('Message');
                        })();
                    }}
                >
                    <Flex alignItems="center" justifyContent="center" width="100%" height="100%">
                        <Image src={addchat} alt="Start New Troubleshooting Chat" boxSize="50px" />
                    </Flex>
                </Button>
            </Flex>
        </Box>
    );
}
