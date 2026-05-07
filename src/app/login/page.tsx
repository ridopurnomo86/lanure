import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;

  if (adminToken === process.env.ADMIN_SECRET) {
    redirect("/admin");
  }

  async function login(formData: FormData) {
    "use server";

    const secret = formData.get("secret") as string;

    if (secret === process.env.ADMIN_SECRET) {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 1 week
      });
      redirect("/admin");
    } else {
      redirect("/login?error=true");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Login Admin</h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Rahasia Admin
            </label>
            <input
              type="password"
              name="secret"
              required
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
