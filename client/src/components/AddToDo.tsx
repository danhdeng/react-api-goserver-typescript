import { Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/hooks';
import React, { useState } from 'react';
import { KeyedMutator } from 'swr';
import { ENDPOINT_URL, Todo } from '../App';

export const AddToDo = ({ mutate }: { mutate: KeyedMutator<Todo[]> }) => {
  const [open, setOpen] = useState(false);
  const form = useForm({
    initialValues: {
      title: '',
      body: '',
    },
  });

  const createTodo = async (values: { title: string; body: string }) => {
    const updated = await fetch(`${ENDPOINT_URL}/api/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());
    mutate(updated);
    form.reset();
    setOpen(false);
  };

  return (
    <>
      <Modal opened={open} onClose={() => setOpen(false)} title="Create Todo">
        <form onSubmit={form.onSubmit(createTodo)}>
          <TextInput
            required
            mb={12}
            label="Todo"
            placeholder="What is your new task"
            {...form.getInputProps('title')}
          />
          <TextInput
            required
            mb={12}
            label="Body"
            placeholder="Tell me more about...."
            {...form.getInputProps('body')}
          />
          <Button type="submit">Create Task</Button>
        </form>
      </Modal>

      <Group position="center">
        <Button fullWidth mb={12} onClick={() => setOpen(true)}>
          Add New Task
        </Button>
      </Group>
    </>
  );
};
