import React, { useRef, useState } from "react";
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
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Info, PenLine } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
const user = {
  name: "John Doe",
  email: "john@example.com",
  contact: "9800000000",
  role: "enrollee",
  gender: "male",
  isVerified: false,
  verificationStatus: "pending",
  imageUrl: "https://example.com/profile.jpg",
};
function Profile() {
  const underlineInputClass =
    "border-b border-gray-400 border-t-0 border-l-0 border-r-0 rounded-none focus:outline-none focus:ring-0 focus:border-none";

  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [contact, setContact] = useState(user.contact);
  const [role, setRole] = useState(user.role);
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(user.imageUrl);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const imageUrl = URL.createObjectURL(selectedFile);
    setImg(imageUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, gender, contact, role, img });
    alert("Form submitted (frontend only)");
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-7xl mx-auto mt-8">
      <Card className="w-full rounded-2xl shadow-xl">
        <CardHeader>
          <div className="flex items-center justify-between w-full">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information below.
              </CardDescription>
            </div>

            {user.role === "enrollee" &&
              (user.verificationStatus === "pending" ? (
                <p
                  className="flex items-center gap-2 text-yellow-900 bg-yellow-100 p-3 rounded-md text-sm font-medium"
                  role="alert"
                >
                  <Info size={16} aria-hidden="true" />
                  Your request is under process. It will take up to 48 hours to
                  complete the verification. Thank you for your patience.
                </p>
              ) : (
                <Button size="sm" variant="outline">
                  Apply as Instructor
                </Button>
              ))}
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Left: Avatar */}
              <div className="col-span-1 flex flex-col items-center justify-start gap-4">
                <Avatar className="h-[150px] w-[150px] border-2 border-gray-100">
                  <AvatarImage
                    src={img}
                    alt="profile"
                    className="object-cover"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <button
                  type="button"
                  onClick={triggerFileSelect}
                  className="bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700"
                >
                  <PenLine size={18} />
                </button>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Right: Form Fields */}
              <div className="col-span-2 grid gap-5">
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
                    <Label htmlFor="contact">Contact</Label>
                    <Input
                      id="contact"
                      value={contact}
                      placeholder="Contact number..."
                      onChange={(e) => setContact(e.target.value)}
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
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 md:flex-row md:justify-end">
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
            onClick={handleSubmit}
          >
            Save
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Profile;
