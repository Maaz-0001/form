import { useState } from "react";

function StudentVisaForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    fatherName: "",
    dob: "",
    cnic: "",
    phone: "",
    email: "",
    city: "",
    lastDegree: "",
    institute: "",
    marks: "",
    targetCountry: "",
    course: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Enter a valid email";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!/^\d{5}-\d{7}-\d{1}$/.test(formData.cnic)) newErrors.cnic = "Enter a valid CNIC (e.g., 12345-1234567-1)";
    if (!formData.dob.trim()) newErrors.dob = "Date of birth is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.lastDegree.trim()) newErrors.lastDegree = "Last degree is required";
    if (!formData.institute.trim()) newErrors.institute = "Institute is required";
    if (!formData.marks.trim()) newErrors.marks = "Marks are required";
    if (!formData.targetCountry.trim()) newErrors.targetCountry = "Target country is required";
    if (!formData.course.trim()) newErrors.course = "Course is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validate();

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    setSubmitted(false);
    return;
  }

  setErrors({});

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/submit-form`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (data.success) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Could not connect to server. Please try again later.");
  }
};

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";
  const errorClass = "text-sm text-red-500 mt-1";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Student Visa Application</h1>
        <p className="text-gray-500 mb-6">Fill in your details and we'll get in touch with you.</p>

        {submitted && (
          <div className="mb-6 p-3 rounded-lg bg-green-100 text-green-700 text-sm">
            Form submitted successfully! We'll contact you soon.
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={inputClass} placeholder="Ali Khan" />
            {errors.fullName && <p className={errorClass}>{errors.fullName}</p>}
          </div>

          <div>
            <label className={labelClass}>Father's Name</label>
            <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className={inputClass} placeholder="Ahmed Khan" />
            {errors.fatherName && <p className={errorClass}>{errors.fatherName}</p>}
          </div>

          <div>
            <label className={labelClass}>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={inputClass} />
            {errors.dob && <p className={errorClass}>{errors.dob}</p>}
          </div>

          <div>
            <label className={labelClass}>CNIC / Passport No.</label>
            <input type="text" name="cnic" value={formData.cnic} onChange={handleChange} className={inputClass} placeholder="12345-1234567-1" />
            {errors.cnic && <p className={errorClass}>{errors.cnic}</p>}
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="03001234567" />
            {errors.phone && <p className={errorClass}>{errors.phone}</p>}
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
            {errors.email && <p className={errorClass}>{errors.email}</p>}
          </div>

          <div>
            <label className={labelClass}>City</label>
            <select name="city" value={formData.city} onChange={handleChange} className={inputClass}>
              <option value="">Select City</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Lahore">Lahore</option>
              <option value="Karachi">Karachi</option>
            </select>
            {errors.city && <p className={errorClass}>{errors.city}</p>}
          </div>

          <div>
            <label className={labelClass}>Last Degree</label>
            <input type="text" name="lastDegree" value={formData.lastDegree} onChange={handleChange} className={inputClass} placeholder="e.g. BSc, FSc" />
            {errors.lastDegree && <p className={errorClass}>{errors.lastDegree}</p>}
          </div>

          <div>
            <label className={labelClass}>Institute</label>
            <input type="text" name="institute" value={formData.institute} onChange={handleChange} className={inputClass} placeholder="Institute Name" />
            {errors.institute && <p className={errorClass}>{errors.institute}</p>}
          </div>

          <div>
            <label className={labelClass}>Marks / GPA</label>
            <input type="number" name="marks" value={formData.marks} onChange={handleChange} className={inputClass} placeholder="e.g. 85%" />
            {errors.marks && <p className={errorClass}>{errors.marks}</p>}
          </div>

          <div>
            <label className={labelClass}>Target Country</label>
            <input type="text" name="targetCountry" value={formData.targetCountry} onChange={handleChange} className={inputClass} placeholder="e.g. UK, Canada" />
            {errors.targetCountry && <p className={errorClass}>{errors.targetCountry}</p>}
          </div>

          <div>
            <label className={labelClass}>Course / Field of Interest</label>
            <input type="text" name="course" value={formData.course} onChange={handleChange} className={inputClass} placeholder="e.g. Computer Science" />
            {errors.course && <p className={errorClass}>{errors.course}</p>}
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass}>Message (optional details)</label>
            <textarea name="message" value={formData.message} onChange={handleChange} rows="4" className={inputClass} placeholder="Any additional information..." />
            {errors.message && <p className={errorClass}>{errors.message}</p>}
          </div>

          <div className="sm:col-span-2">
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
              Submit Application
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default StudentVisaForm;