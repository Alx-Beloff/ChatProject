import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from './icons/SendIcon';

export default function MessageForm(): JSX.Element {
  return (
    <Form>
      <InputGroup className="mb-3">
        <Form.Control placeholder="Your message" />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
