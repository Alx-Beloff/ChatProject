import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import sendIcon from '../../../public/icons8-send-letter-48.png';

export default function MessageForm({ submitMessage }): JSX.Element {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        submitMessage(input);
        setInput('');
      }}
    >
      <InputGroup
        className="px-3 py-2"
        style={{
          backgroundColor: 'white',
          boxShadow: '0 0 30px rgba(0, 0, 0, 0.12)',
          clipPath: 'inset(-50px -1px 0px -1px)',
        }}
      >
        <Form.Control
          placeholder="Сообщение"
          value={input}
          onChange={changeHandler}
          style={{ borderRadius: '50px' }}
        />

        <button
          type="submit"
          style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '-15px' }}
        >
          <img src={sendIcon} alt="Back Icon" width="50" height="50" />
        </button>
      </InputGroup>
    </Form>
  );
}
