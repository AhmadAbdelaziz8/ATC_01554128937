import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Lock, User } from "lucide-react";

const RegisterForm = ({
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  isAdmin,
  setIsAdmin,
  onSubmit,
  onTogglePanel,
  error,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center h-full px-6 sm:px-12 text-center"
    >
      <CardHeader className="w-full p-0 mb-6">
        <CardTitle className="text-3xl font-bold text-slate-800 dark:text-white">
          Create Account
        </CardTitle>
        <CardDescription className="text-slate-500 dark:text-slate-400 mt-2">
          to start booking amazing events
        </CardDescription>
      </CardHeader>
      <div className="w-full space-y-4 mb-6 max-w-xs mx-auto">
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            placeholder="Full Name"
            required
            className="pl-10 h-11 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="email"
            placeholder="Email"
            required
            className="pl-10 h-11 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            type="password"
            placeholder="Password"
            required
            className="pl-10 h-11 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <input
            id="admin-role"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          <label
            htmlFor="admin-role"
            className="ml-2 block text-sm text-slate-600 dark:text-slate-300"
          >
            Request Admin Role
          </label>
        </div>
      </div>
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>
      )}
      <Button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-12 rounded-full text-sm uppercase tracking-wider transition-transform duration-150 hover:scale-105"
      >
        Sign Up
      </Button>
      <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onTogglePanel}
          className="font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:underline focus:outline-none"
        >
          Sign In
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
