import { Container } from "@chakra-ui/react"
import { Outlet } from "react-router-dom"

const AppLayout = () => {
  return (
    <main>
      <Container>  
        <Outlet />
      </Container>
    </main>
  )
}

export default AppLayout