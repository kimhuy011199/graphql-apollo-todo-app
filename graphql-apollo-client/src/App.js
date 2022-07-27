import React from 'react';
import { ChakraProvider, Container, Box, Heading } from '@chakra-ui/react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import theme from './theme';
import Footer from './components/Footer';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Container minH="100vh" display="flex" flexDir="column">
        <Box>
          <Heading textAlign="center" py="10">
            TODO LIST
          </Heading>
          <TodoForm />
          <TodoList />
        </Box>
        <Footer />
      </Container>
    </ChakraProvider>
  );
}

export default App;
