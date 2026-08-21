import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePublicUser, sanitizeRedirectUrl } from "../context/PublicUserContext";

export default function GoogleSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { fetchPublicUser } = usePublicUser();
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleAuthSuccess = async () => {
      const token = params.get("token");

      if (token) {
        localStorage.setItem("publicToken", token);
      }

      // Hydrate PublicUserContext before redirecting so user is immediately authenticated
      const user = await fetchPublicUser(token);

      const queryRedirect = params.get("redirect");
      const savedRedirect = localStorage.getItem("redirectAfterLogin");
      localStorage.removeItem("redirectAfterLogin");

      const targetPath = queryRedirect || savedRedirect || "/";
      const safeUrl = sanitizeRedirectUrl(targetPath);

      if (user) {
        navigate(safeUrl, { replace: true });
      } else {
        setError(true);
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      }
    };

    handleAuthSuccess();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#fefaf8]">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 text-center max-w-sm">
        {error ? (
          <p className="text-red-600 font-semibold">Authentication failed. Redirecting...</p>
        ) : (
          <p className="text-[#4A2B4D] font-semibold text-lg animate-pulse">Signing you in...</p>
        )}
      </div>
    </div>
  );
}