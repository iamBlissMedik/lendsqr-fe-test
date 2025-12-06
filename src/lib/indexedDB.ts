import { IUser } from "@/types/users.types";
import { openDB } from "idb";


const DB_NAME = "usersDB";
const STORE_NAME = "users";

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("username", "username", { unique: false });
      }
    },
  });
};

// Add or update a user
export const saveUser = async (user: IUser) => {
  const db = await initDB();
  return db.put(STORE_NAME, user);
};

// Get a user by ID
export const getUser = async (id: string | number) => {
  const db = await initDB();
  return db.get(STORE_NAME, id);
};

// Get all users
export const getAllUsers = async (): Promise<IUser[]> => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

// Delete a user
export const deleteUser = async (id: string | number) => {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
};
