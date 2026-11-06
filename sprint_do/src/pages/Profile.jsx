
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  doc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

import useAuth from "../hook/useAuth";
import { db } from "../config/FirebaseConfig";

const Profile = () => {
  const { currentUser, loading: authLoading, logoutUser } = useAuth();

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    bio: "",
    phone: "",
  });

  const [originalProfile, setOriginalProfile] = useState({
    name: "",
    bio: "",
    phone: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch profile whenever the authenticated user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const userRef = doc(db, "users", currentUser.uid);
        const snapshot = await getDoc(userRef);

        if (snapshot.exists()) {
          const data = snapshot.data();

          const profileData = {
            name: data.name || "",
            bio: data.bio || "",
            phone: data.phone || "",
          };

          setProfile(profileData);
          setOriginalProfile(profileData);
        } else {
          setError("Profile not found.");
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError("Unable to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Open edit form
  const handleEdit = () => {
    setProfile(originalProfile);
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  // Save profile changes
  const saveChanges = async (e) => {
    e.preventDefault();

    if (!profile.name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (
      profile.phone.trim() &&
      !/^[6-9]\d{9}$/.test(profile.phone.trim())
    ) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const userRef = doc(db, "users", currentUser.uid);

      const updatedProfile = {
        name: profile.name.trim(),
        bio: profile.bio.trim(),
        phone: profile.phone.trim(),
      };

      await updateDoc(userRef, {
        ...updatedProfile,
        updatedAt: serverTimestamp(),
      });

      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
      setIsEditing(false);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update error:", err);
      setError("Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing and restore saved values
  const handleCancel = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setError("");
  };

  // Logout
  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (err) {
      console.error("Logout error:", err);
      setError("Unable to log out.");
    }
  };

  if (authLoading || loading) {
    return <p className="p-6 text-gray-500">Loading profile...</p>;
  }

  if (!currentUser) {
    return <p className="p-6">Please log in.</p>;
  }

  return (
    <div className="max-w-2xl rounded-2xl border bg-white p-6 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-800">
        My Profile
      </h1>

      {/* User avatar and email */}
      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-100 text-3xl font-bold text-indigo-600">
          {(profile.name || currentUser.email || "U")
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <h2 className="text-lg font-semibold">
            {profile.name || "User"}
          </h2>
          <p className="text-sm text-gray-500">
            {currentUser.email}
          </p>
        </div>
      </div>

      {/* Profile display */}
      {!isEditing ? (
        <div className="mt-8 space-y-4">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="font-medium">
              {profile.name || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Mobile Number</p>
            <p className="font-medium">
              {profile.phone || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Bio</p>
            <p className="font-medium">
              {profile.bio || "Not added"}
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {success && (
            <p className="text-sm text-green-600">{success}</p>
          )}

          <button
            type="button"
            onClick={handleEdit}
            className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        /* Edit profile form */
        <form onSubmit={saveChanges} className="mt-8 space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={currentUser.email || ""}
              disabled
              className="w-full rounded-lg border bg-gray-100 px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Mobile Number
            </label>

            <input
              type="tel"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              maxLength={10}
              placeholder="Enter 10-digit mobile number"
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Bio
            </label>

            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              maxLength={300}
              rows={4}
              placeholder="Tell us about yourself"
              className="w-full resize-none rounded-lg border px-4 py-2"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleCancel}
              className="rounded-lg border px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Logout */}
      <div className="mt-8 border-t pt-6">
        <h2 className="font-semibold text-gray-800">
          Account Actions
        </h2>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-3 rounded-lg border border-red-200 bg-red-50 px-6 py-2.5 font-medium text-red-600 hover:bg-red-100"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
