import React from 'react';
import { useQuery } from '@apollo/client';
import { VStack, Center, Spinner, Text } from '@chakra-ui/react';
import TodoItem from '../TodoItem';
import { GET_TODOS } from '../../graphql/query/todoQuery';

const TodoList = () => {
  const { loading, error, data } = useQuery(GET_TODOS);

  if (loading) {
    return (
      <Center minH="100vh">
        <Spinner size="xl" color="primary" thickness="1.5" />
      </Center>
    );
  }

  if (error) {
  }

  return (
    <>
      {data?.todos?.length > 0 ? (
        <VStack alignItems="flex-start" h="60vh" overflowY="scroll">
          {data?.todos.map(item => (
            <TodoItem key={item._id} todo={item} />
          ))}
        </VStack>
      ) : (
        <Text mt="10" textAlign="center" fontSize="20">
          Well done! You are free 🤙
        </Text>
      )}
    </>
  );
};

export default TodoList;
