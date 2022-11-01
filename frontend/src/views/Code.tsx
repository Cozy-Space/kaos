import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Code() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!params.code) return;
    fetch(`/api/container?code=${params.code}`)
      .then((data) => data.json())
      .then((containers) => {
        if (containers[0]) {
          navigate(`/dashboard/containers/${containers[0].id}`);
        } else {
          navigate("/dashboard");
        }
      });
  }, [params]);
  return <div></div>;
}
