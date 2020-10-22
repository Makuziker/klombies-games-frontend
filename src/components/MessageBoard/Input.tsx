import { makeStyles, TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { useState, ChangeEvent, FormEvent, useCallback } from 'react'

export interface IMessageInputProps {
  onSubmit(text: string): void;
}

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginTop: spacing(1)
  }
}))

export function MessageInput({ onSubmit }: IMessageInputProps) {
  const classes = useStyles();

  const [text, setText] = useState('')

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setText(value)
  }, []);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSubmit(text);
  }, [onSubmit, text]);

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
      >
        <Send />
      </Button>
    </form>
  );
}
