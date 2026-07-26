import prisma from "../../config/db.js";
import jwt from "jsonwebtoken";

export const loginWithGoogle = async (profile) => {
  const email = profile.emails[0].value;

  let user = await prisma.publicUser.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    user = await prisma.publicUser.create({
      data: {
        googleId: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email,
        avatar: profile.photos?.[0]?.value,
      },
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user,
  };
};