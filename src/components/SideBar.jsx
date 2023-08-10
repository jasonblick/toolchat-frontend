// src/components/SideBar.jsx

import { 
    Box, useBreakpointValue, IconButton, Button, Collapse, Flex, Image 
} from '@chakra-ui/react';
import { useState } from 'react';
import vertical from '../assets/vertical.png';
import horizontal from '../assets/horizontal.png';
import add from '../assets/add.svg'; 
import list from '../assets/list.svg'; 
import settings from '../assets/settings.svg'; 
import down from '../assets/down.svg'; 
import up from '../assets/up.svg';
import tool from '../assets/tool.svg'; 

export default function Sidebar({ signOut, setActiveView }) {
    const [show, setShow] = useState(false);
    const isMobile = useBreakpointValue({ base: true, md: false });

    const ButtonWithIcon = ({ iconSrc, label, onClickHandler }) => (
        <Button 
            aria-label={label}
            leftIcon={isMobile ? null : <Image src={iconSrc} alt={label} boxSize="30px" />}
            onClick={onClickHandler}
            margin="5px"
            bg="transparent"
            color="white"
            _hover={{ bg: "#008f3e" }}
            justifyContent={isMobile ? "center" : "start"}
            alignItems="center"
            flexDirection="row"
        >
            {isMobile ? <Image src={iconSrc} alt={label} boxSize="35px" /> : label}
        </Button>
    );

    const IconsDisplay = (
        <Flex direction={isMobile ? "row" : "column"} spacing="4">
            <ButtonWithIcon iconSrc={add} label="New" onClickHandler={() => setActiveView('Main')} />
            <ButtonWithIcon iconSrc={list} label="Library" onClickHandler={() => setActiveView('List')} />
            <ButtonWithIcon iconSrc={settings} label="Settings" onClickHandler={() => setActiveView('Settings')} />
        </Flex>
    );

    return (
        <Box 
            width={{ base: "full", md: '250px' }} 
            height={{ base: 'auto', md: '100vh' }} 
            bg="#109249" 
            color="white" 
            p={isMobile ? 4 : 8}
            m="0"
        >
            <Flex direction="column" align="center" justify={isMobile ? "center" : "start"} height="100%" pt={isMobile ? "0" : "10%"}>
                {isMobile ? (
                    <>
                        <Flex align="center" justify="space-between" mb={1} width="100%">
                            <Image src={tool} alt="prepchat" width="40px" height="40px" />
                            <IconButton
                                aria-label="Menu"
                                icon={<Image src={show ? up : down} alt="Menu toggle" boxSize="30px" />}
                                onClick={() => setShow(!show)}
                                bg="transparent"
                                _hover={{ bg: "transparent" }}
                            />
                        </Flex>
                        <Collapse in={show}>
                            {IconsDisplay}
                        </Collapse>
                    </>
                ) : (
                    <>
                        <Image src={tool} alt="prepchat" width="90px" height="90px" />
                        <Box width="80%" height="3px" borderRadius="5px" bg="white" marginBottom="30px" marginTop="40px"/>
                        {IconsDisplay}
                    </>
                )}
            </Flex>
        </Box>
    );
}
