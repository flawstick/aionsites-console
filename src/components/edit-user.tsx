"use client";

import React, { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LoadingAnimation } from "./animations";
import { motion } from "framer-motion";
import { useUserStore } from "@/lib/store/useUserStore";

export function EditUser({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const [username, setUsername] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [coverPicture, setCoverPicture] = useState<string>("");
  const [clockId, setClockId] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const { users, updateUser, fetchUser } = useUserStore();

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const user = users.find((u: any) => u._id === userId);
        setUsername(user?.username as string);
        setFirstName(user?.firstName as string);
        setLastName(user?.lastName as string);
        setBio(user?.profile?.bio || "");
        setProfilePicture(user?.profile?.profilePicture || "");
        setCoverPicture(user?.profile?.coverPicture || "");
        setClockId(user?.clockId);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchAndSetUser();
  }, [userId, onClose]);

  useEffect(() => {
    setRequestSent(false);
  }, [onClose]);

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const fetchedUser = await fetchUser(userId);

      if (!fetchedUser) {
        throw new Error("User not found");
      }

      const userData = {
        ...fetchedUser,
        username,
        firstName,
        lastName,
        profile: {
          bio,
          profilePicture,
          coverPicture,
        },
        clockId,
      };

      updateUser(userId, userData);
      setRequestSent(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error updating user:", error);
      setIsLoading(false);
    }
  };

  const animationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <DialogContent className="sm:max-w-[600px] sm:max-h-[800px] overflow-auto">
      <DialogHeader>
        <motion.div
          className="sticky"
          variants={animationVariants}
          transition={{ duration: 0.3 }}
        >
          <DialogTitle className="text-center">Edit User</DialogTitle>
          <DialogDescription className="text-center">
            Update the user details below.
          </DialogDescription>
        </motion.div>
      </DialogHeader>
      {!isLoading && !requestSent && (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center space-y-4 py-4"
        >
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="username" className="self-start">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="firstName" className="self-start">
              First Name
            </Label>
            <Input
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="lastName" className="self-start">
              Last Name
            </Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="bio" className="self-start">
              Bio
            </Label>
            <Input
              id="bio"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="profilePicture" className="self-start">
              Profile Picture URL
            </Label>
            <Input
              id="profilePicture"
              placeholder="Profile Picture URL"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="coverPicture" className="self-start">
              Cover Picture URL
            </Label>
            <Input
              id="coverPicture"
              placeholder="Cover Picture URL"
              value={coverPicture}
              onChange={(e) => setCoverPicture(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Label htmlFor="clockId" className="self-start">
              Worker ID
            </Label>
            <Input
              id="clockId"
              type="number"
              placeholder="Worker ID"
              value={clockId}
              onChange={(e) => setClockId(parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <Button type="submit">Update</Button>
          </div>
        </form>
      )}
      {isLoading && <LoadingAnimation />}
      {requestSent && <CheckAnimation handleClose={onClose} />}
    </DialogContent>
  );
}

function CheckAnimation({ handleClose }: { handleClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="flex flex-col w-full items-center justify-center space-y-4"
    >
      <motion.svg
        initial={{ width: 0 }}
        animate={{ width: 69 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          d="M4 12l5 5 11-11"
        />
      </motion.svg>
      <h2 className="text-2xl font-bold">Thank you!</h2>
      <p className="text-gray-500">User details have been updated.</p>
      <Button className="mt-4" onClick={handleClose}>
        Close
      </Button>
    </motion.div>
  );
}
