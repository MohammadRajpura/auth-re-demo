import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase.config";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const { user, loading } = useAuth();
  const [profile, setProfile] = useState(null);
  // test
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          // fallback to auth details
          setProfile({
            name: user.displayName,
            email: user.email,
          });
        }
      };
      fetchProfile();
    }
  }, [user]);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="flex items-center justify-between bg-gray-100 p-5">
        <h1 className="text-6xl font-bold text-center mb-0">The Firebase 🎉</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign Out
        </button>
      </div>

      <div className="max-w-lg mx-auto p-6">
        <Card className="shadow-lg rounded-2xl">
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <div className="text-center space-y-2">
              <p>
                <strong>Name:</strong> {profile?.name}
              </p>
              <p>
                <strong>Email:</strong> {profile?.email}
              </p>
              <p>
                <strong>Gender:</strong> {profile?.gender || "Not set"}
              </p>
              <p>
                <strong>Birthdate:</strong> {profile?.birthdate || "Not set"}
              </p>
            </div>
            <Button
              onClick={() => navigate("/edit-profile")}
              className="w-full"
            >
              Edit Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;
