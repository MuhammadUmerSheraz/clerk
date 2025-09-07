import { SignedIn, SignedOut } from "@clerk/nextjs";
import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <div className="text-center">
      <SignedOut>
        <h1 className="text-4xl font-bold mb-4">Welcome to our App!</h1>
        <p className="text-lg text-gray-600">Please sign in to continue</p>
      </SignedOut>
      <SignedIn>
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg text-gray-600">You are now signed in</p>
        <UserProfile />
      </SignedIn>
    </div>
  );
}
