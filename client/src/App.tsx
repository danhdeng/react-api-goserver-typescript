import { Box, List, ListItem, ThemeIcon } from '@mantine/core';
import { CheckCircleIcon } from '@primer/octicons-react';
import useSWR from 'swr';
import './App.css';
import { AddToDo } from './components/AddToDo';
export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export const ENDPOINT_URL = 'http://localhost:4000';

const fetcher = (url: string) =>
  fetch(`${ENDPOINT_URL}/${url}`).then((r) => r.json());

function App() {
  const { data, mutate } = useSWR<Todo[]>('api/todos', fetcher);

  const markTodoAsDone = async (id: number) => {
    const updated = fetch(`${ENDPOINT_URL}/api/todos/${id}/done`, {
      method: 'PATCH',
    }).then((r) => r.json());
    mutate(updated);
  };
  return (
    <Box
      sx={(theme) => ({
        padding: '2rem',
        width: '100%',
        maxWidth: '40rem',
        margin: '0 auto',
      })}
    >
      <List>
        {data?.map((todo) => {
          return (
            <ListItem
              onClick={() => markTodoAsDone(todo.id)}
              key={`todo___${todo.id}`}
              icon={
                todo.done ? (
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <CheckCircleIcon size={20} />
                  </ThemeIcon>
                ) : (
                  <ThemeIcon color="gray" size={24} radius="xl">
                    <CheckCircleIcon size={20} />
                  </ThemeIcon>
                )
              }
            >
              {todo.title} -- {todo.body}{' '}
            </ListItem>
          );
        })}
      </List>
      <AddToDo mutate={mutate} />
    </Box>
  );
}

export default App;
