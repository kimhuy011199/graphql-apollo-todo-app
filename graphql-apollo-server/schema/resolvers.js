const Todo = require('../models/todoModel');

const resolvers = {
  Query: {
    todos: async (parent, args) => {
      try {
        return await Todo.find();
      } catch (error) {
        throw new Error(error);
      }
    },
  },

  Mutation: {
    createTodo: async (parent, args) => {
      try {
        const { title } = args.todoInput;
        const data = { title, isDone: false };
        return await Todo.create(data);
      } catch (error) {
        throw new Error(error);
      }
    },
    toggleTodo: async (parent, args) => {
      try {
        const { id } = args;
        const todo = await Todo.findById(id);
        todo.isDone = !todo.isDone;
        return await todo.save();
      } catch (error) {
        throw new Error(error);
      }
    },
    updateTodo: async (parent, args) => {
      try {
        const { id, todoInput } = args;
        return await Todo.findOneAndUpdate({ _id: id }, todoInput, {
          new: true,
        });
      } catch (error) {
        throw new Error(error);
      }
    },
    deleteTodo: async (parent, args) => {
      try {
        const { id } = args;
        return await Todo.findByIdAndDelete(id);
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = { resolvers };
