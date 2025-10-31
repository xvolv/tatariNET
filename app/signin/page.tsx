import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign in – TatariNET",
  description: "Sign in is not supported on this site; redirecting to home.",
};

export default function SigninPage() {
  // The signin UI was removed — redirect to the homepage so prerender/build won't fail.
  redirect("/");
}
