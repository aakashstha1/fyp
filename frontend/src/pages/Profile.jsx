import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    role: "Enrolee",
    bio: "Passionate about crafting beautiful and accessible UIs.",
    imageUrl: "https://i.pravatar.cc/300?img=4",
  });

  const [editedProfile, setEditedProfile] = useState({ ...profile });

  const handleChange = (e) => {
    setEditedProfile({ ...editedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setEditMode(false);
  };

  return (
    <div className="min-h-[calc(100vh-150px)] flex items-center justify-center bg-white dark:bg-gray-900 px-4 py-10">
      <Card className="w-full max-w-xl p-6 shadow-xl rounded-3xl bg-white dark:bg-gray-800 transition-all duration-500">
        <CardContent className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
          {/* Left side: Profile Picture */}
          <div className="flex flex-col items-center relative min-w-[130px]">
            <Avatar className="h-32 w-32 border-4 border-white shadow-md">
              <AvatarImage
                src={editMode ? editedProfile.imageUrl : profile.imageUrl}
                alt="Profile"
              />
              <AvatarFallback className="text-4xl">
                {(editMode ? editedProfile.name : profile.name)[0]}
              </AvatarFallback>
            </Avatar>

            {editMode && (
              <Input
                name="imageUrl"
                value={editedProfile.imageUrl}
                onChange={handleChange}
                placeholder="Image URL"
                className="mt-3 text-sm"
              />
            )}

            {!editMode && (
              <Button
                size="sm"
                variant="outline"
                className="mt-3"
                onClick={() => {
                  setEditMode(true);
                  setEditedProfile(profile);
                }}
              >
                Edit
              </Button>
            )}
          </div>

          {/* Right side: Profile Info */}
          <div className="flex-1 w-full">
            {/* Name */}
            <div className="flex items-center mb-3">
              <label className="w-20 text-sm font-medium text-gray-600 dark:text-gray-300">
                Name:
              </label>
              {editMode ? (
                <Input
                  name="name"
                  value={editedProfile.name}
                  onChange={handleChange}
                  className="flex-1"
                />
              ) : (
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {profile.name}
                </p>
              )}
            </div>

            {/* Email (not editable) */}
            <div className="flex items-center mb-3">
              <label className="w-20 text-sm font-medium text-gray-600 dark:text-gray-300">
                Email:
              </label>
              <p className="text-gray-600 dark:text-gray-300 flex-1">{profile.email}</p>
            </div>

            {/* Role */}
            <div className="flex items-center mb-3">
              <label className="w-20 text-sm font-medium text-gray-600 dark:text-gray-300">
                Role:
              </label>
              {editMode ? (
                <div className="flex flex-col flex-1">
                  <Select
                    value={editedProfile.role}
                    onValueChange={(value) =>
                      setEditedProfile({ ...editedProfile, role: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Enrolee">Enrolee</SelectItem>
                      <SelectItem value="Instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                  {editedProfile.role === "Instructor" && (
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-1">
                      Requested for Instructor
                    </p>
                  )}
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <p className="italic text-purple-600 dark:text-purple-400">
                    {profile.role}
                  </p>
                  {profile.role === "Instructor" && (
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 mt-1">
                      Requested for Instructor
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bio (same line, responsive) */}
            <div className="flex flex-col sm:flex-row items-center mb-3">
              <label className="w-20 text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-0">
                Bio:
              </label>
              {editMode ? (
                <Textarea
                  name="bio"
                  value={editedProfile.bio}
                  onChange={handleChange}
                  rows={1}
                  className="flex-1 resize-none min-h-[38px]"
                />
              ) : (
                <p className="text-gray-700 dark:text-gray-200 flex-1">{profile.bio}</p>
              )}
            </div>

            {/* Buttons */}
            {editMode && (
              <div className="flex justify-end gap-2 mt-4">
                <Button size="sm" onClick={handleSave}>
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
