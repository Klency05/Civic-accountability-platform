import { useState } from "react";
import { useNavigate } from "react-router";
import { UserPlus } from "lucide-react";

export function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Signup failed");
      }

      // Auto-login after signup
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center" style={{ background: "#EEF2F9" }}>
      <div className="w-full max-w-md p-8 rounded-2xl" style={{ background: "#fff", boxShadow: "0 8px 32px rgba(11,36,71,0.12)" }}>
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg, #19A7CE, #0E8FAF)" }}>
            <UserPlus className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#0B2447]">Sign Up</h1>
          <p className="text-[#8A9BBE] text-sm mt-2">Create CivicChain Account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg" style={{ background: "#FEE2E2", color: "#991B1B", fontSize: "0.875rem" }}>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-[#0B2447] mb-1.5">Username</label>
            <input
              type="text"
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2EAF4] focus:border-[#19A7CE] focus:outline-none text-[#0B2447]"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B2447] mb-1.5">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2EAF4] focus:border-[#19A7CE] focus:outline-none text-[#0B2447]"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B2447] mb-1.5">Password</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2EAF4] focus:border-[#19A7CE] focus:outline-none text-[#0B2447]"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#0B2447] mb-1.5">Confirm Password</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-[#E2EAF4] focus:border-[#19A7CE] focus:outline-none text-[#0B2447]"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg font-semibold text-white transition-all mt-6"
            style={{
              background: loading ? "#A8C5DA" : "linear-gradient(135deg, #19A7CE, #0E8FAF)",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-[#8A9BBE] mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-[#19A7CE] font-semibold hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}