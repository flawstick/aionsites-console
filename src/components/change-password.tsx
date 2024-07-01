"use client";

import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/lib/store/useUserStore";
import { useCompanyStore } from "@/lib/store/useCompanyStore";

const formSchema = z
  .object({
    newPassword: z.string().min(8, {
      message: "New password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password confirmation must be at least 8 characters.",
    }),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export function ChangePasswordDialog({
  userId,
  onClose,
}: {
  userId: string;
  onClose: () => void;
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { changePassword } = useUserStore();
  const { selectedCompany } = useCompanyStore();

  useEffect(() => {
    form.reset();
  }, [onClose, userId]);

  const onSubmit = async (data: any) => {
    if (
      changePassword(
        data.newPassword,
        data.confirmPassword,
        userId,
        selectedCompany?.tenantId!,
      )
    )
      onClose();
    else console.error("Error changing password");
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-center">Change Password</DialogTitle>
        <DialogDescription className="text-center">
          Enter your new password and confirm it below. Click save when you're
          done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="New Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Your new password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }: any) => (
              <FormItem>
                <FormLabel>Confirm New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Re-enter your new password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
