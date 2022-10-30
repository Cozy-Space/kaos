import { useState } from "react";

export function useCodes() {
  const [codes, setCodes] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchCodes = () => {
    setLoading(true);
    fetch("/api/code")
      .then((data) => data.json())
      .then((data) => {
        setCodes(data);
        setError(false);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  };

  return { fetchCodes, codes, error, loading };
}
