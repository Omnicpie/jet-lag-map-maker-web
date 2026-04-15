import { useEffect, useState } from "react";

const useMediaQuery = (query: string) => {
  const matcher = window.matchMedia(query);
  const [matches, setMatches] = useState(matcher.matches);

  const handler = (e: MediaQueryList) => setMatches(e.matches);

  useEffect(() => {
    //@ts-expect-error matcher typing is bad
    matcher.addEventListener("change", handler);
    return () => {
      //@ts-expect-error matcher typing is bad
      matcher.removeEventListener("change", handler);
    };
  }, [matcher]);

  return matches;
};

export default useMediaQuery;
