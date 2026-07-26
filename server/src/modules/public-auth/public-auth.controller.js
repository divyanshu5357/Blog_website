import { loginWithGoogle } from "./public-auth.service.js";

export const googleCallback = async (req, res) => {
  const response = await loginWithGoogle(req.user);

  res.redirect(
    `${process.env.CLIENT_URL}/google-success?token=${response.token}`
  );
};

export const me = async (req, res) => {
  res.json({
    success: true,
    data: req.publicUser,
  });
};