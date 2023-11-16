import React from 'react';
import { Button, Flex, ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
      <Flex align="center" justify="center">
        <Button colorScheme='blue'>Wallet</Button>
      </Flex>
    </ChakraProvider>
  );
}

export default App;
