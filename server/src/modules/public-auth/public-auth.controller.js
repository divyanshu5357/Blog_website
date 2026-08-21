import { loginWithGoogle } from "./public-auth.service.js";

export const googleCallback = async (req, res) => {
  try {
    const response = await loginWithGoogle(req.user);

    let redirectPath = "/";
    if (req.query.state) {
      try {
        const parsedState = JSON.parse(req.query.state);
        if (parsedState.redirect && typeof parsedState.redirect === "string") {
          redirectPath = parsedState.redirect;
        }
      } catch (e) {
        if (typeof req.query.state === "string" && req.query.state.startsWith("/")) {
          redirectPath = req.query.state;
        }
      }
    } else if (req.query.redirect && typeof req.query.redirect === "string") {
      redirectPath = req.query.redirect;
    }

    const encodedRedirect = encodeURIComponent(redirectPath);
    const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");

    res.redirect(`${clientUrl}/google-success?token=${response.token}&redirect=${encodedRedirect}`);
  } catch (err) {
    console.error("Error in googleCallback handler:", err);
    const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
    res.redirect(`${clientUrl}/?auth_error=server_error`);
  }
};

export const me = async (req, res) => {
  res.json({
    success: true,
    data: req.publicUser,
  });
};