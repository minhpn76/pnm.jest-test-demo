import React from 'react';
import {
  Box,
  Button,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate()

  const navigateLogin = () => {
    navigate('/login')
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
            Create a new account
          </Heading>
        </Stack>
        <Text mt={4} textAlign="center">
          Already have an account? <Button variant="link" onClick={navigateLogin}>Log in</Button>
        </Text>
      </Box>
    </Box>
  );
}

export default Register;
