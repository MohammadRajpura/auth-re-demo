"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase.config";
import { toast } from "sonner";
import { Navigate, useSearchParams } from "react-router-dom";

// ✅ Zod schema
const ForgetSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
});

// ✅ Arrow function component
const ForgetPass = () => {
  const form = useForm({
    resolver: zodResolver(ForgetSchema),
    defaultValues: {
      email: "",
    },
  });
  // Test
  const onSubmit = (values) => {
    sendPasswordResetEmail(auth, values.email)
      .then((res) => {
        console.log(res);

        toast.success("Password reset email sent!");
      })
      .catch((error) => {
        toast.error("Error sending password reset email:", error);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-[400px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Forget Password
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button type="submit" className="w-full">
                Sent Email to Forget Password
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgetPass;
