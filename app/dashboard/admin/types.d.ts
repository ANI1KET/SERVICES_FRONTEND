import { Permission, Role } from '@prisma/client';

export type Lister = {
  id: string;
  role: Role;
  email: string;
  promoting: Permission[];
  permission: Permission[];
};

export type Listers = Array<Lister>;

export type ListerResponse = {
  total: number;
  users: Listers;
};

export type ListerCategory = {
  OWNER: ListerResponse;
  BROKER: ListerResponse;
};
