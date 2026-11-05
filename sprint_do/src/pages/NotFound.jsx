
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>

      <p className="text-gray-500">Sorry, this page doesn't exist.</p>

      <Link
        to="/"
        className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
