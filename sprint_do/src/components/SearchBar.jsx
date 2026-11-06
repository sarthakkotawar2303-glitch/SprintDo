
const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(event) => onSearchChange(event.target.value)}
      placeholder="Search tasks by title..."
      className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
    />
  );
};

export default SearchBar;
