import { Action } from "@/constants/types";
import { BASE_URL } from "@/constants/urls";

function useFetchAddresses() {
  const fetchAddresses = async (dispatch: React.Dispatch<Action>) => {
    try {
      const response = await fetch(BASE_URL + "/my-addresses/");
      if (!response.ok) {
        throw new Error("Failed to fetch addresses.");
      }
      const data = await response.json();
      dispatch({ type: "SET_ADDRESSES", payload: data });
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
      console.error(err);
    }
  };
  return { fetchAddresses };
}

export default useFetchAddresses;
