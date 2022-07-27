import React from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { IconButton, HStack, Text, Box } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { DELETE_TODO, TOGGLE_TODO } from '../../graphql/mutation/todoMutation';
import { GET_TODOS } from '../../graphql/query/todoQuery';
import { ReactComponent as EditIcon } from '../../assets/icons/edit.svg';
import { ReactComponent as RemoveIcon } from '../../assets/icons/remove.svg';
import { ReactComponent as CheckIcon } from '../../assets/icons/check.svg';
import { ReactComponent as UncheckIcon } from '../../assets/icons/uncheck.svg';
import TodoUpdateModal from '../TodoUpdateModal';

const TodoItem = props => {
  const { todo } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [deleteTodo] = useMutation(DELETE_TODO, {
    variables: { deleteTodoId: todo._id },
    update(cache, { data: { deleteTodo } }) {
      const { todos } = cache.readQuery({ query: GET_TODOS });

      cache.writeQuery({
        query: GET_TODOS,
        data: { todos: todos.filter(item => item._id !== deleteTodo._id) },
      });
    },
  });

  const [toggleTodo] = useMutation(TOGGLE_TODO, {
    variables: { toggleTodoId: todo._id },
    update(cache, { data: { toggleTodo } }) {
      const { todos } = cache.readQuery({ query: GET_TODOS });

      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: todos.map(item =>
            item._id === toggleTodo._id ? toggleTodo : item
          ),
        },
      });
    },
  });

  const handleDelete = () => {
    deleteTodo(todo);
  };

  const handleToggle = () => {
    toggleTodo(todo);
  };

  return (
    <>
      <HStack
        bg="dark2"
        w="100%"
        borderRadius="lg"
        p="3"
        pl="4"
        justifyContent="space-between"
      >
        <HStack onClick={handleToggle} cursor="pointer" flex="1">
          <Box w="5" mr="1">
            {todo.isDone ? <CheckIcon /> : <UncheckIcon />}
          </Box>
          <Text fontWeight="500">{todo.title}</Text>
        </HStack>
        <HStack>
          <IconButton onClick={onOpen} p="3" icon={<EditIcon />}></IconButton>
          <IconButton
            onClick={handleDelete}
            p="3"
            icon={<RemoveIcon />}
          ></IconButton>
        </HStack>
      </HStack>
      <TodoUpdateModal todo={todo} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default TodoItem;
