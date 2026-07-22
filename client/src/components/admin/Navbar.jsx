import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="bg-white shadow px-8 h-20 flex items-center justify-between">

      <div className="relative">

        <Search
          className="absolute left-3 top-3 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg pl-10 pr-4 py-2 w-80"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center">
            D
          </div>

          <div>

            <h3 className="font-semibold">
              Divyanshu
            </h3>

            <p className="text-sm text-gray-500">
              Super Admin
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}