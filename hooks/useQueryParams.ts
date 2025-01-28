import { useSearchParams, useRouter } from "next/navigation";

type UseQueryParamsReturn = {
  setQueryParam: (key: string, value?: string) => void;
};

export default function useQueryParams(): UseQueryParamsReturn {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setQueryParam = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`?${params.toString()}`);
  };

  return { setQueryParam };
}
