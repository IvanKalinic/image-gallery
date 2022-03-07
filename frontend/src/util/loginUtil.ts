import { possibleUsers } from "../mockUsers";

export const checkIsAllowed = (email: string, password: string) => {
  return possibleUsers.find(
    (user: any) => user.email === email && user.password === password
  );
};
