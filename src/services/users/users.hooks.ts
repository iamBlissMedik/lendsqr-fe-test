import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./users.api";
import { formatUserDate } from "@/utils/date";
import { IUser } from "@/types/users.types";
import { getUser } from "@/lib/indexedDB";

export const useGetUsers = () => {
  const {
    data, // the resolved data
    isLoading, // true while fetching
    isError, // true if error happened
    error, // the error object
    refetch, // function to refetch
    isFetching, // true even if stale data is shown
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    select: (data) =>
      data.map((user) => ({
        ...user,
        createdAt: formatUserDate(user.createdAt),
      })),
  });

  // You can transform the data if needed
  const users = data ?? []; // default empty array if no data

  // Optional: standardize error
  const errorMessage = isError
    ? (error as { message?: string })?.message || "Something went wrong"
    : null;

  return {
    users,
    isLoading,
    isFetching,
    isError,
    error: errorMessage,
    refetch,
  };
};

export const useGetUserById = (id: string) => {
  return useQuery<IUser | undefined>({
    queryKey: ["user", id],
    queryFn: () => getUser(id),
    enabled: !!id, // only fetch if id exists
  });
};
