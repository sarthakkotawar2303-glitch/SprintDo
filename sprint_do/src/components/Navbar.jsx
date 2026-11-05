
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        TaskFlow
      </Link>

      <Link
        to="/profile"
        className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
      >
        My Profile
      </Link>
    </header>
  );
};

export default Navbar;
