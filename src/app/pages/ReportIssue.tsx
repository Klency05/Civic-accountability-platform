import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Upload, X, Image as ImageIcon, AlertTriangle, CheckCircle2,
} from "lucide-react";
import {
  Button,
  Input, Textarea, Select,
  Card, CardHeader,
  PageHeader,
  StatusBadge, CategoryBadge, ChainTag,
  BlockchainStrip,
  colors,
} from "../design-system";

const categoryOptions = [
  { value: "pothole",     label: "🕳️ Pothole — Road damage, craters, cracks" },
  { value: "garbage",     label: "🗑️ Garbage — Waste overflow, illegal dumping" },
  { value: "streetlight", label: "💡 Streetlight — Non-functional, flickering" },
  { value: "water",       label: "💧 Water Issue — Pipe burst, flooding, shortage" },
];

const zoneOptions = [
  { value: "zone1", label: "Zone 1 – T. Nagar" },
  { value: "zone2", label: "Zone 2 – Anna Nagar" },
  { value: "zone3", label: "Zone 3 – Adyar" },
  { value: "zone4", label: "Zone 4 – Mylapore" },
  { value: "zone5", label: "Zone 5 – Velachery" },
  { value: "zone6", label: "Zone 6 – Tambaram" },
  { value: "zone7", label: "Zone 7 – Guindy" },
  { value: "zone8", label: "Zone 8 – Chromepet" },
  { value: "zone9", label: "Zone 9 – Perambur" },
  { value: "zone10", label: "Zone 10 – Kodambakkam" },
];

const priorityOptions = [
  { value: "low",    label: "Low — Minor inconvenience" },
  { value: "medium", label: "Medium — Moderate impact" },
  { value: "high",   label: "High — Safety hazard" },
];

const categoryMap: Record<string, string> = {
  pothole: "Pothole",
  garbage: "Garbage",
  streetlight: "Streetlight",
  water: "Water Issue",
};

export function ReportIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", category: "", description: "", location: "", zone: "", priority: "medium",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const newIssue = {
        id: "CIV-" + Math.floor(1000 + Math.random() * 9000),
        category: categoryMap[form.category] || form.category,
        title: form.title,
        description: form.description,
        location: form.location,
        zone: form.zone,
        priority: form.priority,
        reporter: "Citizen",
        date: new Date().toLocaleDateString("en-IN"),
        status: "Open",
        fund: 0,
        txHash: "Pending",
        createdBy: user.email || "anonymous",
        votes: 0,
        upvotedBy: []
      };

      const response = await fetch("http://localhost:5000/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIssue),
      });

      if (!response.ok) {
        throw new Error("Failed to submit issue");
      }

      setSubmitted(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setSubmitted(false);
    setForm({ title: "", category: "", description: "", location: "", zone: "", priority: "medium" });
    setImageFile(null);
    setImagePreview(null);
  };

  if (submitted) {
    return (
      <div className="p-8 flex items-center justify-center min-h-full">
        <div className="max-w-md w-full space-y-5">
          <Card padding="lg" className="text-center">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: colors.successBg }}
            >
              <CheckCircle2 className="w-10 h-10" style={{ color: colors.success }} />
            </div>
            <h2 className="text-[#0B2447]" style={{ fontWeight: 700, fontSize: "1.25rem" }}>
              Issue Reported Successfully!
            </h2>
            <p className="text-[#4B5E78] mt-2" style={{ fontSize: "0.875rem" }}>
              Your report has been submitted to Greater Chennai Corporation and permanently recorded on the blockchain.
            </p>

            <div
              className="mt-5 rounded-xl p-4 text-left space-y-3"
              style={{ background: colors.bgMuted, border: `1px solid ${colors.border}` }}
            >
              {[
                { label: "Issue ID", value: "CIV-1025", strong: true },
                { label: "Category", value: categoryMap[form.category] || form.category },
                { label: "Zone", value: zoneOptions.find(z => z.value === form.zone)?.label || "—" },
                { label: "Priority", value: form.priority.charAt(0).toUpperCase() + form.priority.slice(1) },
              ].map((r) => (
                <div key={r.label} className="flex justify-between items-center">
                  <span className="text-[#8A9BBE]" style={{ fontSize: "0.8125rem" }}>{r.label}</span>
                  <span className="text-[#0B2447]" style={{ fontWeight: r.strong ? 700 : 500, fontSize: "0.8125rem" }}>
                    {r.value}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center">
                <span className="text-[#8A9BBE]" style={{ fontSize: "0.8125rem" }}>Status</span>
                <StatusBadge status="Open" />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8A9BBE]" style={{ fontSize: "0.8125rem" }}>Tx Hash</span>
                <ChainTag hash="0x9f3c…d2a7" />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="secondary" fullWidth onClick={reset}>Report Another</Button>
              <Button variant="primary" fullWidth onClick={() => navigate("/transparency")}>Track Status →</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Report Civic Issue"
          subtitle="Submit a civic complaint. Reports are permanently logged on the Chennai blockchain registry."
        />

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Basic Info */}
          <Card padding="lg">
            <h3 className="text-[#0B2447] mb-5" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
              Basic Information
            </h3>
            <div className="space-y-4">
              <Input
                label="Issue Title"
                placeholder="e.g. Large pothole on Anna Salai causing accidents"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />
              <Select
                label="Category"
                required
                placeholder="Select issue category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                options={categoryOptions}
              />
              <Textarea
                label="Description"
                placeholder="Describe the issue in detail — severity, duration, impact on citizens…"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                required
                showCount
                maxLen={500}
              />
            </div>
          </Card>

          {/* Location */}
          <Card padding="lg">
            <h3 className="text-[#0B2447] mb-5" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
              Location Details
            </h3>
            <div className="space-y-4">
              <Input
                label="Street Address / Landmark"
                placeholder="e.g. Near Panagal Park, T. Nagar"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                required
              />
              <Select
                label="Zone / Area"
                placeholder="Select zone"
                value={form.zone}
                onChange={(e) => setForm({ ...form, zone: e.target.value })}
                options={zoneOptions}
              />
            </div>
          </Card>

          {/* Image Upload */}
          <Card padding="lg">
            <h3 className="text-[#0B2447] mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
              Photo Evidence <span className="text-[#8A9BBE]" style={{ fontWeight: 400 }}>(Optional)</span>
            </h3>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50"
                >
                  <X className="w-3.5 h-3.5 text-[#4B5E78]" />
                </button>
                <div className="mt-2 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[#19A7CE]" />
                  <span className="text-[#4B5E78]" style={{ fontSize: "0.75rem" }}>{imageFile?.name}</span>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="w-full rounded-xl py-8 flex flex-col items-center gap-3 transition-all duration-150 group"
                style={{ border: "2px dashed #E2EAF4", background: "transparent" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#19A7CE"; (e.currentTarget as HTMLButtonElement).style.background = "#EFF6FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#E2EAF4"; (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#F0F4FA" }}>
                  <Upload className="w-5 h-5 text-[#8A9BBE]" />
                </div>
                <div className="text-center">
                  <p className="text-[#0B2447]" style={{ fontWeight: 500, fontSize: "0.875rem" }}>
                    Click to upload photo evidence
                  </p>
                  <p className="text-[#8A9BBE] mt-0.5" style={{ fontSize: "0.75rem" }}>
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </button>
            )}
          </Card>

          {/* Priority */}
          <Card padding="lg">
            <h3 className="text-[#0B2447] mb-4" style={{ fontWeight: 600, fontSize: "0.9375rem" }}>
              Priority Level
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "low",    label: "Low",    desc: "Minor inconvenience",  active: "border-emerald-400 bg-emerald-50 text-emerald-700" },
                { value: "medium", label: "Medium", desc: "Moderate impact",      active: "border-amber-400 bg-amber-50 text-amber-700" },
                { value: "high",   label: "High",   desc: "Safety / emergency",   active: "border-red-400 bg-red-50 text-red-700" },
              ].map((p) => {
                const isActive = form.priority === p.value;
                return (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setForm({ ...form, priority: p.value })}
                    className={`py-3 px-4 rounded-xl border-2 text-sm transition-all ${isActive ? p.active : "border-[#E2EAF4] text-[#4B5E78] hover:border-[#C8D7ED]"}`}
                    style={{ fontWeight: isActive ? 600 : 400 }}
                  >
                    <div>{p.label}</div>
                    <div className="mt-0.5 opacity-70" style={{ fontSize: "0.75rem" }}>{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Disclaimer */}
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-xl"
            style={{ background: colors.tealPale, border: `1px solid #A5D8ED` }}
          >
            <AlertTriangle className="w-4 h-4 text-[#19A7CE] mt-0.5 flex-shrink-0" />
            <p className="text-[#0B2447]" style={{ fontSize: "0.75rem", lineHeight: "1.6" }}>
              By submitting, you confirm all information is accurate. This report will be permanently and immutably recorded on the Ethereum Sepolia blockchain for public transparency under Greater Chennai Corporation's civic accountability framework.
            </p>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            {loading ? "Submitting to blockchain…" : "Submit Report to Blockchain →"}
          </Button>
        </form>
      </div>
    </div>
  );
}
