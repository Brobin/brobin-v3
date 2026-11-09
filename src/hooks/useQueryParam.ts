import { useRouter } from "next/router";

/** A string URL query parameter, updated in place without a page reload. */
export function useQueryParam(key: string) {
  const router = useRouter();
  const value = typeof router.query[key] === "string" ? router.query[key] : null;

  const setValue = (next: string | null) =>
    router.replace(
      { pathname: router.pathname, query: next ? { [key]: next } : {} },
      undefined,
      { shallow: true },
    );

  return [value as string | null, setValue] as const;
}
