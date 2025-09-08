import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, Loader2, PenLine } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

function Profile() {
  const underlineInputClass =
    "border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none focus:outline-none focus:ring-0 focus:border-none";
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [gender, setGender] = useState(currentUser?.gender || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [role, setRole] = useState(
    currentUser?.role
      ? currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)
      : ""
  );
  const [img, setImg] = useState(currentUser?.imageUrl || "");
  const [request, setRequest] = useState("");

  const [loading, setLoading] = useState(false);
  // const [file, setFile] = useState(null);
  const API_URL = "http://localhost:8000/api";

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/user/profile`, {
          withCredentials: true,
        });
        setRequest(res.data.req);
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getUserProfile();
  }, []);

  const handleApplyClick = async () => {
    try {
      const res = await axios.get(`${API_URL}/user/profile-completion`, {
        withCredentials: true,
      });
      toast.success(res?.data?.message);
      navigate("/apply-for-instructor");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setImg(imageUrl);
  };

  //Profile Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("bio", bio);

      // If the user selected a new image
      if (fileInputRef.current?.files[0]) {
        formData.append("image", fileInputRef.current.files[0]);
      }

      const res = await axios.put(`${API_URL}/user/profile/update`, formData, {
        withCredentials: true,
      });
      const updatedUser = res?.data.user;
      if (updatedUser) {
        setCurrentUser(updatedUser);
        setName(updatedUser.name);
        setPhone(updatedUser.phone);
        setGender(updatedUser.gender);
        setBio(updatedUser.bio);
        setImg(updatedUser.imageUrl);
      }
      toast.success(res.data.message || "Profile updated successfully");
      // Optionally update local auth context
      // updateCurrentUser(res.data.user);
    } catch (error) {
      console.error(error);
      toast.error(error?.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Card className="w-full rounded-2xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle className="text-xl font-bold">Profile</CardTitle>
              <CardDescription>
                Update your personal information and remember to save your
                changes.
              </CardDescription>
            </div>

            {currentUser.role === "enrollee" &&
              (request?.status === "pending" ? (
                <p
                  className="flex items-center gap-2 text-yellow-900 bg-yellow-100 p-3 rounded-md text-sm font-medium"
                  role="alert"
                >
                  <Info size={32} aria-hidden="true" />
                  Your request is under process. It will take up to 48 hours to
                  complete the verification. Thank you for your patience.
                </p>
              ) : (
                <Button size="sm" variant="outline" onClick={handleApplyClick}>
                  Apply as Instructor
                </Button>
              ))}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-4 gap-6">
              {/* Left: Avatar */}
              <div className="col-span-1 flex flex-col items-center justify-start gap-4 relative">
                <div className="relative">
                  <Avatar className="h-[150px] w-[150px] border-2 border-gray-100">
                    <AvatarImage
                      src={img || currentUser?.imageUrl}
                      alt="profile"
                      className="object-cover"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  {/* Pen button positioned on top-right of avatar */}
                  <button
                    type="button"
                    onClick={triggerFileSelect}
                    className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700 cursor-pointer z-10"
                  >
                    <PenLine size={18} />
                  </button>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Right: Form Fields */}
              <div className="col-span-3 grid gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={name}
                      placeholder="Your name..."
                      onChange={(e) => setName(e.target.value)}
                      className={underlineInputClass}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      placeholder="Your email..."
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
                      className={`${underlineInputClass} select-none  cursor-not-allowed`}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="phone">phone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      placeholder="phone number..."
                      onChange={(e) => setPhone(e.target.value)}
                      className={underlineInputClass}
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="role">Role</Label>
                    <Input
                      id="role"
                      value={role}
                      placeholder="e.g. admin, student, instructor"
                      onChange={(e) => setRole(e.target.value)}
                      readOnly
                      className={`${underlineInputClass} select-none  cursor-not-allowed`}
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    placeholder="Write a short bio..."
                    onChange={(e) => setBio(e.target.value)}
                    className={underlineInputClass}
                    rows={4}
                  />
                </div>

                <div className="flex flex-col space-y-3">
                  <Label htmlFor="gender">Gender</Label>
                  <RadioGroup
                    id="gender"
                    name="gender"
                    value={gender}
                    className="flex gap-6"
                    onValueChange={setGender}
                  >
                    {["female", "male", "other"].map((g) => (
                      <div key={g} className="flex items-center space-x-2">
                        <RadioGroupItem value={g} id={g} />
                        <Label htmlFor={g}>
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:justify-end mt-10">
              <Button
                type="button"
                variant="secondary"
                onClick={handleCancel}
                className="w-full md:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-full md:w-auto"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <p>Saving</p>
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Profile;
