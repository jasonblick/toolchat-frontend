// src\views\MessageView.jsx

import { Box, Flex, useBreakpointValue, VStack, HStack, Text, Textarea, Button } from '@chakra-ui/react';
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { findSimilarTextChunks, invokeDocQA } from '../api/backend';

export default function MessageView() {
    const isMobile = useBreakpointValue({ base: true, md: false });
    const [messages, setMessages] = useState([
        { type: 'system', content: 'Hi there, I\'m an AI problem solving assistant trained on technical documentation, what can I help you with today?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);
    const textAreaRef = useRef(null);
    const { session } = useAuth();

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleInput = (e) => {
        const target = e.target;
        target.style.height = '22px'; 
        target.style.height = `${Math.min(target.scrollHeight, 80)}px`;
    };

    const handleSend = async () => {
        if (inputValue.trim() !== "") {
            // Save the user message locally
            setMessages(prevMessages => [...prevMessages, { type: 'user', content: inputValue.trim() }]);
            setInputValue('');
            textAreaRef.current.style.height = '40px';
    
            // Call the API to get similar text chunks
            try {
                const docid = "0-28119a49-c0a3-4ae0-98c2-873d7a7ee38d";
                const similarChunks = await findSimilarTextChunks(session.access_token, inputValue.trim(), docid);
                const similarChunksString = similarChunks.data.map(chunk => chunk.text_chunk).join('\n');
                console.log("Similar chunks found:", similarChunksString);
    
                // Call invokeDocQA function after successfully getting similar chunks
                const docQAResponse = await invokeDocQA(
                    session.access_token,
                    "gpt-3.5-turbo",
                    inputValue.trim(),
                    "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",
                    similarChunksString
                );
    
                let body = JSON.parse(docQAResponse.result.body);
                let content = body.content;
    
                console.log("DocQA Response:", content);
    
                // Add the system message with content from docqa response
                setMessages(prevMessages => [...prevMessages, { type: 'system', content: content }]);
    
            } catch (error) {
                console.error("Error retrieving similar text chunks or invoking DocQA:", error);
            }
        }
    };

    const textSize = isMobile ? "sm" : "lg";

    return (
        <Box height="100%" display="flex" flexDirection="column" width={{ base: '100%', md: '70%' }} paddingTop="20px" marginLeft="auto" marginRight="auto">
            <VStack align="start" overflowY="auto" flex="1" spacing={4} pb="3" pl="10px" pr="10px"
                css={{
                    '&::-webkit-scrollbar': {
                        width: '5px',
                    },
                    '&::-webkit-scrollbar-track': {
                        backgroundColor: 'transparent',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        backgroundColor: '#555',
                        borderRadius: '4px',
                    },
                }}
            >
                {messages.map((msg, index) => (
                    <HStack key={index} justifyContent={msg.type === 'user' ? 'flex-end' : 'flex-start'} width="100%">
                        <Box 
                            bg={msg.type === 'system' ? "#00b34d" : "#4b4b4b"}
                            borderRadius="20px"
                            px="4"
                            py="3"
                            maxWidth="70%"
                            wordBreak="break-word" // Ensures that the content breaks correctly
                        >
                            <Text fontSize={textSize} color="white">{msg.content}</Text>
                        </Box>
                    </HStack>
                ))}
                <div ref={messagesEndRef}></div>
            </VStack>
            
            <Box position="sticky" bottom={0} zIndex={10} p="2" backgroundColor="#292929">
                <Flex align="center" justifyContent="center">
                    <Box width={{ base: "100%", md: "50%" }} height="2px" borderRadius="5px" bg="white" marginBottom="20px" />
                </Flex>
                
                <Flex>
                    <Textarea 
                        ref={textAreaRef}
                        variant="filled"
                        value={inputValue}
                        onInput={handleInput}
                        onChange={e => setInputValue(e.target.value)}
                        placeholder="Type your message..."
                        borderRadius="20px"
                        bg="#4b4b4b"
                        _hover={{ bg: "#454545" }}
                        color="white"
                        width="85%"
                        minHeight="20px"
                        maxHeight="80px"
                        overflowY="auto"
                        resize="none"
                        wrap="hard"
                        fontSize={textSize}
                        css={{
                            '&::-webkit-scrollbar': {
                                width: '5px',
                                display: textAreaRef.current && textAreaRef.current.scrollHeight > 80 ? 'block' : 'none',
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: '#292929',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: '#555',
                                borderRadius: '4px',
                            },
                        }}
                    />
                    <Button 
                        ml="2"
                        bg="#00b34d"
                        color="white"
                        borderRadius="20px"
                        _hover={{ bg: "#008f3e" }}
                        width="15%"
                        onClick={async () => {
                            if (inputValue.trim() !== "") {
                                await handleSend();
                            }
                        }}
                    >
                        Send
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}