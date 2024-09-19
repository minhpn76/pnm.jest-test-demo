import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../services/index';

const Login = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm();

  const { mutateAsync, error, isPending } = useLogin(navigate)



  const onSubmit = ({ email, password }) => {
    mutateAsync({
      username: email,
      password
    })
  };

  const navigateRegister = () => {
    navigate('/register')
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
            Log in to your account
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="text"
                data-testid="email"
                {...register("email", { required: "Email is required" })}
              />
              {
                errors.email &&
                <FormErrorMessage >
                  {errors.email.message}
                </FormErrorMessage>
              }
            </FormControl>
            <FormControl isInvalid={errors.password} mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                data-testid="password"
                {...register("password", { required: "Password is required" })}
              />
              {
                errors.password &&
                <FormErrorMessage>
                  {errors.password.message}
                </FormErrorMessage>
              }
            </FormControl>
            <Stack spacing={6} mt={4}>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                fontSize="md"
                isLoading={isPending}
              >
                Log in
              </Button>
            </Stack>
          </form>
          {
            error &&
            <Text color='tomato'>
              {error.message}
            </Text>
          }
        </Stack>
        <Text mt={4} textAlign="center">
          Don't have an account? <Button variant="link" onClick={navigateRegister}>Sign up</Button>
        </Text>
      </Box>
    </Box>
  );
}

export default Login;
