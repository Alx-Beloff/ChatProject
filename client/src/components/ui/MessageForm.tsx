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
        style={{ backgroundColor: 'white', boxShadow: '30px black' }}
      >
        <Form.Control
          placeholder="Сообщение"
          value={input}
          onChange={changeHandler}
          style={{ borderRadius: '50px' }}
        />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <img src={sendIcon} alt="Back Icon" width="30" height="30" />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
