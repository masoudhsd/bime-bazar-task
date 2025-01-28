import { Action } from "@/constants/types";
import { BASE_URL } from "@/constants/urls";
import { useRouter } from "next/navigation";

export interface FormData {
  nationalId: string;
  phoneNumber: string;
  addressId: string;
}
interface Props {
  formData: FormData;
  dispatch: React.Dispatch<Action>;
  openSheet: (param: string, value: string) => void;
}

function usePostInsuranceData() {
  const router = useRouter();
  const postInsuranceFormData = async ({
    formData,
    dispatch,
    openSheet,
  }: Props) => {
    dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: true });

    try {
      const response = await fetch(BASE_URL + "/order/completion/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to complete the order.");
      }
      dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: true });

      router.push("/success");
    } catch (err: unknown) {
      if (err instanceof Error) {
        openSheet("order-submit-error", "open");
        dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: false });
        console.log(String(err));
      }
    } finally {
      dispatch({ type: "IS_SUBMIT_ORDER_LOADING", payload: false });
      router.push("/success");
    }
  };
  return { postInsuranceFormData };
}

export default usePostInsuranceData;
