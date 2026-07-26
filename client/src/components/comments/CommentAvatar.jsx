export default function CommentAvatar({ user }) {
  const initials = `${user?.firstName?.[0] || ""}${
    user?.lastName?.[0] || ""
  }`.toUpperCase();

  if (user?.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.firstName}
        className="w-12 h-12 rounded-full object-cover border"
      />
    );
  }

  return (
    <div className="w-12 h-12 rounded-full bg-violet-700 text-white flex items-center justify-center font-bold">
      {initials || "U"}
    </div>
  );
}