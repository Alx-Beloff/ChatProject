export type SpotType = {
  id: number;
  name: string;
  address: string;
  description: string;
  img: string;
};


export type SpotFormType = Omit<SpotType, 'id'>;