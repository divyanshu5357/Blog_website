import prisma from "../../config/db.js";
import jwt from "jsonwebtoken";

export const loginWithGoogle = async (profile) => {
  if (!profile) {
    throw new Error("No Google profile provided");
  }

  const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
  if (!email) {
    throw new Error("No email found in Google profile");
  }

  const firstName = profile.name?.givenName || profile.displayName?.split(" ")[0] || "User";
  const lastName = profile.name?.familyName || profile.displayName?.split(" ").slice(1).join(" ") || "";
  const avatar = profile.photos?.[0]?.value || `https://ui-avatars.com/api/?name=${encodeURIComponent(firstName)}`;

  let user = await prisma.publicUser.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    user = await prisma.publicUser.create({
      data: {
        googleId: profile.id,
        firstName,
        lastName,
        email,
        avatar,
      },
    });
  } else if (!user.googleId || !user.avatar) {
    user = await prisma.publicUser.update({
      where: { id: user.id },
      data: {
        googleId: user.googleId || profile.id,
        avatar: user.avatar || avatar,
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