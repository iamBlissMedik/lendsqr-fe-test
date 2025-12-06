import axios from "@/lib/axios";
import { IUser } from "@/types/users.types";



export const getUsers = async () => {
  const { data } = await axios.get<IUser[]>("/mock/users.json");
  return data;
};
