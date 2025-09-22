import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const EditProfile = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", gender: "", birthdate: "" });

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm(docSnap.data());
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        ...form,
        email: user.email,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <div className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label>Gender</Label>
          <Input name="gender" value={form.gender} onChange={handleChange} />
        </div>
        <div>
          <Label>Birthdate</Label>
          <Input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={handleChange}
          />
        </div>
        <Button className="w-full" onClick={handleSave}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditProfile;
