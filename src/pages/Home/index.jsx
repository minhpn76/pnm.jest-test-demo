import {
  Box,
  Heading,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';

const Home = () => {
  const name = localStorage.getItem('username') || ''

  let textWelcome = 'Welcome to Jest Demo' 
  if (name) {
    textWelcome += `, ${name}!`
  }

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        maxW="md"
        w="full"
        p={8}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.700')}
      >
        <Stack spacing={4}>
          <Heading fontSize="2xl" textAlign="center">
            {textWelcome}
          </Heading>
        </Stack>
  
      </Box>
    </Box>
  );
}

export default Home;
