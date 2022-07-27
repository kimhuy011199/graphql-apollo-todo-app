import React, { useState } from 'react';
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { UPDATE_TODO } from '../../graphql/mutation/todoMutation';
import { GET_TODOS } from '../../graphql/query/todoQuery';

const TodoUpdateModal = props => {
  const { todo, isOpen, onClose } = props;

  const [updatedValue, setUpdatedValue] = useState(todo.title);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    variables: { updateTodoId: todo._id, todoInput: { title: updatedValue } },
    update(cache, { data: { updateTodo } }) {
      const { todos } = cache.readQuery({ query: GET_TODOS });

      cache.writeQuery({
        query: GET_TODOS,
        data: {
          todos: todos.map(item =>
            item._id === updateTodo._id ? updateTodo : item
          ),
        },
      });
    },
  });

  const handleUpdate = async () => {
    if (todo.title === updatedValue) {
      return;
    }
    await updateTodo(todo, updatedValue);
    onClose();
  };

  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update todo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Input
            value={updatedValue}
            onChange={e => setUpdatedValue(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={handleUpdate}
            mr={3}
            backgroundColor="primary"
            _hover={{
              background: 'blue.400',
            }}
            disabled={todo.title === updatedValue}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TodoUpdateModal;
