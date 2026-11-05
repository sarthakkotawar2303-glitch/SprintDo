
const Profile = () => {
  return (
    <div className="max-w-xl rounded-xl border bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>

      <div className="mt-6 space-y-3">
        <p><span className="font-medium">Name:</span> TaskFlow User</p>
        <p><span className="font-medium">Email:</span> Not connected</p>
        <p><span className="font-medium">Account:</span> Local Demo</p>
      </div>
    </div>
  );
};

export default Profile;
