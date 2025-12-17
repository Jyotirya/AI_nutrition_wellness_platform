import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, updateProfile, logout } from "@/lib/api";
import { Edit, Save, X, LogOut } from "lucide-react";

export function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  /* ---------------- Fetch Profile ---------------- */
  useEffect(() => {
    async function fetchProfile() {
      try {
        const { data } = await getProfile();
        setProfile(data);
        setForm(data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  /* ---------------- Handlers ---------------- */
  const handleUserChange = (e: any) => {
    setForm({
      ...form,
      user: { ...form.user, [e.target.name]: e.target.value },
    });
  };

  const handleDetailsChange = (e: any) => {
    setForm({
      ...form,
      details: { ...form.details, [e.target.name]: e.target.value },
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateProfile(form);
      setProfile(form);
      setEditMode(false);
    } catch {
      setError("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    const refresh = localStorage.getItem("refresh");
    if (refresh) await logout(refresh);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  if (loading) return <Centered text="Loading profile..." />;
  if (!profile) return <Centered text={error} error />;

  /* ---------------- UI ---------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-white">
      <div className="max-w-4xl mx-auto p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Profile</h1>
          <button
            onClick={handleLogout}
            style={{
    display: "flex",
    alignItems: "center",
    backgroundColor: "#dc2626", // red-600
    color: "white",
    padding: "10px 16px",
    borderRadius: "10px",
    zIndex: 9999,
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  }}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">

          {/* Account Info */}
          <Section
            title="Account Information"
            action={
              !editMode ? (
                <ActionButton onClick={() => setEditMode(true)} icon={<Edit size={16} />} text="Edit" />
              ) : (
                <>
                  <ActionButton onClick={handleSave} loading={saving} icon={<Save size={16} />} text="Save" />
                  <ActionButton
                    onClick={() => {
                      setForm(profile);
                      setEditMode(false);
                    }}
                    icon={<X size={16} />}
                    variant="secondary"
                    text="Cancel"
                  />
                </>
              )
            }
          >
            <Grid>
              <Input label="First Name" name="first_name" value={form.user.first_name} onChange={handleUserChange} disabled={!editMode} />
              <Input label="Last Name" name="last_name" value={form.user.last_name} onChange={handleUserChange} disabled={!editMode} />
              <Input label="Email" value={profile.user.email} disabled />
            </Grid>
          </Section>

          {/* Health Details */}
          <Section title="Health Details">
            <Grid>
              <Input label="Age" name="age" value={form.details.age} onChange={handleDetailsChange} disabled={!editMode} />
              <Select label="Gender" name="gender" value={form.details.gender} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Height (cm)" name="height" value={form.details.height} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Weight (kg)" name="weight" value={form.details.weight} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Activity Level" name="activity_level" value={form.details.activity_level} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Exercise" name="exercise" value={form.details.exercise} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Food Preference" name="food_preference" value={form.details.food_preference} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Allergies" name="allergies" value={form.details.allergies} onChange={handleDetailsChange} disabled={!editMode} />
              <Input label="Goal" name="goal" value={form.details.goal} onChange={handleDetailsChange} disabled={!editMode} />
            </Grid>
          </Section>

        </div>
      </div>
    </div>
  );
}

/* ---------------- Reusable UI ---------------- */

const Centered = ({ text, error }: any) => (
  <div className={`min-h-screen flex items-center justify-center ${error ? "text-red-500" : "text-gray-600"}`}>
    {text}
  </div>
);

const Section = ({ title, children, action }: any) => (
  <div>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-2">{action}</div>
    </div>
    {children}
  </div>
);

const Grid = ({ children }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
);

const Input = ({ label, ...props }: any) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 disabled:bg-gray-100"
    />
  </div>
);

const Select = ({ label, ...props }: any) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select
      {...props}
      className="w-full mt-1 px-4 py-2 border rounded-lg bg-gray-50 disabled:bg-gray-100"
    >
      <option value="">Select</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  </div>
);

const ActionButton = ({ text, icon, variant = "primary", loading, ...props }: any) => (
  <button
    {...props}
    disabled={loading}
    className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm
      ${variant === "primary" ? "bg-lime-500 text-white hover:bg-lime-600" : "bg-gray-200 hover:bg-gray-300"}
      disabled:opacity-50`}
  >
    {icon} {loading ? "Saving..." : text}
  </button>
);
