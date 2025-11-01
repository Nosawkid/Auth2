import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { CircleUserRound, Mail, ShieldUser } from "lucide-react";

const UserDashboard = () => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
      if (!auth?.accessToken) return;
      try {
        const res = await axios.get("/api/users/me", {
          headers: {
            Authorization: `Bearer ${auth?.accessToken}`,
          },
          withCredentials: true,
        });

        console.log("Data", res.data);

        setProfile(res.data);
      } catch (error) {
        console.log("Fetching error", error);
      }
    };
    console.log(auth);
    fetchProfile();
  }, [auth]);
  return (
    <div className="container mx-auto mt-10 p-6 dark:text-white">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">User Profile</h2>
      {profile ? (
        <>
          <div className="bg-white dark:bg-gray-600 rounded p-4 shadow">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">
              Profile Info
            </h3>
            <div className="space-y-3">
              <p>
                <strong>
                  {" "}
                  <ShieldUser className="inline dark:text-white" /> Usernme:{" "}
                </strong>{" "}
                {profile.username}
              </p>
              <p>
                <strong>
                  <Mail className="inline" /> Email:{" "}
                </strong>{" "}
                {profile.email}
              </p>
              <p>
                {" "}
                <strong>
                  <CircleUserRound className="inline" /> Role:{" "}
                </strong>{" "}
                {profile.role.toUpperCase()}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>No data here</p>
        </>
      )}
    </div>
  );
};

export default UserDashboard;
