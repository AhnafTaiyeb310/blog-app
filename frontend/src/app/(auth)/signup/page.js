"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signup } from "@/lib/services/authApi";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsLoading(true);
    setErrors({});

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      await signup(payload);
      router.push("/login?registered=True");
    } catch (error) {
      setErrors({server: error.message || "An error occured during registration"})
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className="flex min-h-[90vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg border-none bg-white shadow-xl shadow-purple-500/5 rounded-3xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-purple-500 to-indigo-600" />
        <CardHeader className="space-y-2 pt-8 text-center">
          <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900">Create Account</CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            Join our editorial community to share your insights
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <form onSubmit={handleSubmit} className="space-y-5">
                        
            {errors.server && (
              <div className="p-3 text-sm font-medium text-red-500
                bg-red-50 rounded-xl border border-red-100 mb-4">
                  {errors.server}
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="Felix"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-slate-100 bg-slate-50 transition-all focus:border-purple-500 focus:bg-white"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <p className="text-[11px] font-semibold text-red-500 ml-1">{errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Arvid"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-slate-100 bg-slate-50 transition-all focus:border-purple-500 focus:bg-white"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Username</Label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="username"
                  placeholder="felix_arvid"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-slate-100 bg-slate-50 pl-11 transition-all focus:border-purple-500 focus:bg-white"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              {errors.username && <p className="text-[11px] font-semibold text-red-500 ml-1">{errors.username}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-slate-100 bg-slate-50 pl-11 transition-all focus:border-purple-500 focus:bg-white"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {errors.email && <p className="text-[11px] font-semibold text-red-500 ml-1">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={isLoading}
                  className="h-12 rounded-xl border-slate-100 bg-slate-50 pl-11 pr-11 transition-all focus:border-purple-500 focus:bg-white"
                  value={formData.password}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] font-semibold text-red-500 ml-1">{errors.password}</p>}
            </div>

            <Button type="submit" disabled={isLoading} className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 font-bold text-white shadow-lg shadow-purple-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                <>
                  Create Account
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pb-8 pt-2 text-center">
          <p className="w-full text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-purple-600 hover:text-purple-700 transition-colors underline-offset-4 hover:underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}