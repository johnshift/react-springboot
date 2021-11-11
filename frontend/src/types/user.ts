export const REF_USER_TYPE = 0;
export const REF_VEIL_TYPE = 1;

export type UserT = {
  id: number;
  name: string;
  desc: string;
  type: 0 | 1; // 0 = user, 1 = veil
};
