import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { HStack, IconButton, Input } from '@chakra-ui/react';
import { CREATE_TODO } from '../../graphql/mutation/todoMutation';
import { GET_TODO } from '../../graphql/query/todoQuery';
import { ReactComponent as NewIcon } from '../../assets/icons/new.svg';

const TodoForm = () => {
  const [title, setTitle] = useState('');

  const [createTodo] = useMutation(CREATE_TODO, {
    variables: { todoInput: { title } },
    update(cache, { data: { createTodo } }) {
      const { getTodo } = cache.readQuery({ query: GET_TODO });

      cache.writeQuery({
        query: GET_TODO,
        data: { getTodo: [createTodo, ...getTodo] },
      });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (!title) {
      return;
    }
    createTodo(title);
    setTitle('');
  };

  return (
    <HStack mb="4">
      <Input
        size="lg"
        placeholder="Enter new todo"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <IconButton
        onClick={handleSubmit}
        size="lg"
        p="3.5"
        icon={<NewIcon />}
      ></IconButton>
    </HStack>
  );
};

export default TodoForm;
