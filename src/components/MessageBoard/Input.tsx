import { makeStyles, TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import React, { ChangeEvent, FormEvent, useCallback } from 'react'

export interface IMessageInputProps {
  value: string;
  onChange(e: ChangeEvent<HTMLInputElement>): void;
  onSubmit(e: FormEvent): void;
}

const useStyles = makeStyles(({ spacing }) => ({
  button: {
    marginTop: spacing(1)
  }
}))

export function MessageInput({ value, onChange, onSubmit }: IMessageInputProps) {
  const classes = useStyles();

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  }, [onSubmit]);

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        value={value}
        onChange={onChange}
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
  )
}
