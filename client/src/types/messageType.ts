export type MessageType = {
  text: string;
  spotId: number;
  userId: number;
  id: number;
  User: UserUserType;
  updatedAt: string | number | Date;
};

export type UserUserType = {
  username: string;
  img: string;
};

export type MessageFormType = {
  text: string;
};
