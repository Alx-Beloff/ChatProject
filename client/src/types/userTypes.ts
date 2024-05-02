export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  img: string;
  tel: string;
  role: string;
};

export type UserSignUpType = {
  username: string;
  email: string;
  password: string;
  img: string;
  tel: string;
};
export type UserLoginType = Omit<UserSignUpType, 'username' | 'img' | 'tel'>;

export type AuthStateType = {
  accessToken: string;
  user: UserType;
};

export type UserStateType =
  | { status: 'pending' }
  | { status: 'guest' }
  | ({ status: 'logged' } & UserType);
