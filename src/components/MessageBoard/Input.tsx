import { makeStyles, TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState, ChangeEvent, FormEvent } from 'react';

export interface IMessageInputProps {
  onSubmit(text: string): void;
}

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginTop: spacing(1)
  }
}));

export function MessageInput({ onSubmit }: IMessageInputProps) {
  const classes = useStyles();

  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.length === 0) return;
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        value={text}
        onChange={handleChange}
        variant="outlined"
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        color="secondary"
        className={classes.button}
        disabled={text.length === 0}
      >
        <Send />
      </Button>
    </form>
  );
}
