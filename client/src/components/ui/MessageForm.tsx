import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from './icons/ChatQuotesIcon';

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
      <InputGroup className="px-3 py-2">
        <Form.Control placeholder="Сообщение" value={input} onChange={changeHandler} />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
