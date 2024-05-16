export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  file: File;
  tel: string;
  role: string;
  img: string;
};

export type UserSignUpType = {
  username: string;
  email: string;
  password: string;
  file: File;
  tel: string;
};
export type UserLoginType = Omit<UserSignUpType, 'username' | 'file' | 'tel'>;

export type AuthStateType = {
  accessToken: string;
  user: UserType;
};

export type UserStateType =
  | { status: 'pending' }
  | { status: 'guest' }
  | ({ status: 'logged'; username: string; tel: string } & UserType);
