import React from 'react'
import TodoList from "./pages/TodoList"
import { Container, Typography } from "@mui/material"

function App() {
  return (
    <Container
      className="App"
      maxWidth={false}
      fixed
      style={{ background: '#FFFFFF' }}
    >
      <header className="App-header">
        <Typography variant="h3" align="center">
          Welcome to Todo Client
        </Typography>
      </header>
      <TodoList />
    </Container>
  )
}

export default App
