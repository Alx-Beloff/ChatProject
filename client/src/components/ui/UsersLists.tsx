import React from 'react';
import { Stack } from 'react-bootstrap';
import DotOnlineIcon from './icons/DotOnlineIcon';
import { useAppSelector } from '../../redux/hooks';

export default function UsersLists(): JSX.Element {
  const users = useAppSelector((store) => store.messages.users);
  const users1 = users.flat();
  console.log(users);

  return (
    <Stack>
      <h6>Users online</h6>
      {users1.map((user) => (
        <div className="p-2" key={user.id}>
          <DotOnlineIcon />
          {user.username}
        </div>
      ))}
    </Stack>
  );
}
