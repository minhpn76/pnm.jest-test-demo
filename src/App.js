import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { initRoutes } from './app-routes';

const router = createBrowserRouter(initRoutes())

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router}/>
    </ChakraProvider>
  );
}

export default App;
