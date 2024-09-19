import { Container, Skeleton, Stack } from '@chakra-ui/react'
import { React, Suspense } from 'react'

import AppLayout from './layouts/AppLayout'
import Home from './pages/Home/index'
import Login from './pages/Login/index'
import Register from './pages/Register/index'

const lazyLoad = (children) => {
  return (
    <Suspense
      fallback={
        <Container>
          <Stack>
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        </Container>
      }
    >
      {children}
    </Suspense>
  )
}

export const initRoutes = () => {
  return [
    {
      path: '/',
      element: <AppLayout/>,
      children: [
        {
          index: true,
          element: lazyLoad(<Home/>)
        },
        {
          path: '/login',
          element: lazyLoad(<Login/>)
        },
        {
          path: '/register',
          element: lazyLoad(<Register/>)
        },
      ]
    }
  ]
}