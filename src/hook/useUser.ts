import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/service/graphql/user";
import { useEffect } from "react";

export const useUsers = () => {
    console.log('userUsers')
  const { data, loading, error } = useQuery(GET_USERS);


  useEffect(() => {
    if (error) {
      console.error("Error fetching users:", error);
    }
  }, [error]);


  return {
    users: data?.users || [],
    loading,
    error,
  };
};
