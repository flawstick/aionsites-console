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
import { useCompanyStore } from "@/lib/store/useCompanyStore";

export function CreateUser({ onClose }: { onClose: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clockId, setClockId] = useState<number | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const { selectedCompany } = useCompanyStore();
  const { addUser } = useUserStore();

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const userData = {
        tenantId: selectedCompany?.tenantId as string,
        username,
        hashedPassword: password,
        firstName,
        lastName,
        clockId,
      };

      addUser(userData);
      setRequestSent(true);
      setIsLoading(false);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    setRequestSent(false);
  }, [onClose]);

  const animationVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <DialogContent className="sm:max-w-[600px] sm:max-h-[600px] overflow-hidden">
      <DialogHeader>
        <motion.div variants={animationVariants} transition={{ duration: 0.3 }}>
          <DialogTitle className="text-center">Register a User</DialogTitle>
          <DialogDescription className="text-center">
            Fill out the form below to register a user.
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
            <Label htmlFor="password" className="self-start">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            <Button type="submit">Register</Button>
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
      <p className="text-gray-500">Your user has been registered.</p>
      <Button className="mt-4" onClick={handleClose}>
        Close
      </Button>
    </motion.div>
  );
}
