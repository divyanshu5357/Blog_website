import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function GoogleSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      localStorage.setItem("publicToken", token);
    }

    const redirect =
      localStorage.getItem("redirectAfterLogin") || "/";

    localStorage.removeItem("redirectAfterLogin");

    navigate(redirect, { replace: true });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen text-xl font-semibold">
      Signing you in...
    </div>
  );
}