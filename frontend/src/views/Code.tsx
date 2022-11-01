import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Code() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.code) navigate(`/dashboard/containers/${params.code}`);
  }, [params]);
  return <div></div>;
}
