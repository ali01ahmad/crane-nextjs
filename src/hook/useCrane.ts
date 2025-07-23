import { useQuery, useMutation } from "@apollo/client";
import { GET_CRANES, CREATE_CRANE } from "@/service/graphql/crane";
import { useEffect } from "react";

export const useCranes = () => {

  const { data, loading, error } = useQuery(GET_CRANES);
  const [CreateCrane] = useMutation(CREATE_CRANE, {
     refetchQueries: [{ query: GET_CRANES }],
  });


console.log("Cranes data:", data);
  useEffect(() => {
    if (loading) {
      console.log("Loading cranes...");
    } else if (error) {
      console.error("Error fetching cranes:", error);
    } else {
      console.log("Cranes fetched successfully:", data?.cranes);
    }
  }, [loading, error, data]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching cranes:", error);
    }
  }, [error]);

  type CreateCraneVariables = {
    serial_number: string;
    model: string;
    location: string;
    status: string;
  };

  // Function to create a new crane
  const createCrane = async (variables: CreateCraneVariables) => {
    const { serial_number, model, location, status } = variables;
    try {
        
        const response = await CreateCrane({
            variables: { serial_number, model, location, status },
        });
        return response.data.createCrane;
    } catch (error) {
        console.error("Error creating crane:", error);
    }
  };

  return {
    cranes: data?.cranes || [],
    loading,
    error,
    createCrane,
  };
};
