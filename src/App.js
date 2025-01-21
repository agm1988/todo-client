import React from 'react'
import TodoList from "./pages/TodoList"
import { Container, Typography } from "@mui/material"
import { QueryProvider } from "./context/QueryContext"
import { StatusProvider } from "./context/StatusContext"
import { PageProvider } from "./context/PageContext"
import SearchBar from "./components/SearchBar/SearchBar"
import { searchStatusesDict } from "./dictionaries/searchStatusesDict";

function App() {
  return (
    <QueryProvider>
      <StatusProvider>
        <PageProvider>
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
            <SearchBar
              statuses={searchStatusesDict}
            />
            <TodoList />
          </Container>
        </PageProvider>
      </StatusProvider>
    </QueryProvider>
  )
}

export default App
