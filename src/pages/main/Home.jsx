import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  // test
  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-center mb-8">
        Welcome to Home Page 🎉
      </h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
