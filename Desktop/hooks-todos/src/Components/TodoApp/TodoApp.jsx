import React, { useState, useEffect } from 'react';
// material ui core
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
// Components
import TodoList from '../TodoList/TodoList';
import TodoForm from '../TodoForm/TodoForm';
// uuid
import uuid from 'uuid/dist/v4';

function TodoApp() {
  const initialTodos = [
    { id: 1, task: 'Clean House', completed: false },
    { id: 2, task: 'Create a Website ', completed: true },
    { id: 3, task: 'Take kids to football match ', completed: false },
  ];
  const [todos, setTodos] = useState(initialTodos);
  // define our own function
  const addTodo = (newTodoText) => {
    setTodos([...todos, { id: uuid(), task: newTodoText, completed: false }]);
  };

  // remove Todo
  const removeTodo = (todoId) => {
    //filter out remove todo
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);
    // call setTodos with new todos array
    setTodos(updatedTodos);
  };
  // toggle todo
  const toggleTodo = (todoId) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(updatedTodos);
  };

  // edit todo
  const editTodo = (todoId, newTask) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, task: newTask } : todo,
    );
    setTodos(updatedTodos);
  };

  return (
    <Paper
      style={{ padding: 0, margin: 0, height: '100vh', backgroundColor: '#fafafa' }}
      elevation={0}
    >
      <AppBar color="primary" position="static" style={{ height: '64px' }}>
        <Toolbar>
          <Typography color="inherit">TODOS WITH HOOKS</Typography>
        </Toolbar>
      </AppBar>
      <Grid container justify="center" style={{ marginTop: '1rem' }}>
        <Grid item xs={11} md={8} lg={4}>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={todos}
            removeTodo={removeTodo}
            toggleTodo={toggleTodo}
            editTodo={editTodo}
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TodoApp;
//TodoAPP
//TodoForm
//TodoList
//TodoItem

//ID, TASK, COMPLETED
