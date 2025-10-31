import React from "react";

export const metadata = {
  title: "Sign in – TatariNET",
  description:
    "Access your TatariNET account or create a new one to manage projects and settings.",
};

export default function SigninPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-extrabold mb-2">Sign in to TatariNET</h1>
        <p className="text-sm text-slate-600 mb-6">
          Welcome back. Sign in to access project dashboards, previews, and
          account settings. If you don't have an account yet, you may create one
          below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Email
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full border rounded-md p-2"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full border rounded-md p-2"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" className="form-checkbox" />
                <span>Remember this device</span>
              </label>

              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <div>
              <button className="w-full inline-flex justify-center items-center px-4 py-2 bg-primary text-white rounded-md font-medium">
                Sign in
              </button>
            </div>
          </form>

          <div className="border-l pl-6">
            <h2 className="text-lg font-semibold mb-2">Create an account</h2>
            <p className="text-sm text-slate-600 mb-4">
              Creating an account lets you save projects, access private
              previews, and receive product updates.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Full name
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Jane Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full border rounded-md p-2"
                  placeholder="Choose a password"
                />
              </div>

              <div>
                <button className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-900 text-white rounded-md font-medium">
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-6 text-sm text-slate-500">
          By continuing, you agree to our{" "}
          <a href="/privacy" className="text-primary hover:underline">
            Privacy &amp; Policy
          </a>
          .
        </div>
      </div>
    </main>
  );
}
