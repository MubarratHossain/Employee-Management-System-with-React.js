import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/Authprovider";

const Register = () => {
  const { registerWithEmail } = useContext(AuthContext);
  const [accountType, setAccountType] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [salary, setSalary] = useState(null);
  const navigate = useNavigate();

  const handlePhotoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=f672d40464065dd6ecfec4c17a491399`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        const imageUrl = data.data.url;
        setUploadedPhoto(imageUrl);
      } else {
        Swal.fire({
          title: "Error",
          text: "Image upload failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An unexpected error occurred during image upload.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleAccountTypeChange = (event) => {
    const selectedType = event.target.value;
    setAccountType(selectedType);
    const fixedSalaries = { HR: 50000, Employee: 30000 };
    setSalary(fixedSalaries[selectedType]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    const username = formData.get("username");
    const bankAccountNumber = formData.get("bankAccountNumber");

    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!passwordRegex.test(password)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 6 characters long, include at least one uppercase letter, and one special character.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Error",
        text: "Passwords do not match!",
        icon: "error",
        confirmButtonText: "Try Again",
      });
      return;
    }

    const registrationData = {
      email,
      password,
      username,
      bankAccountNumber,
      salary,
      accountType,
      uploadedPhoto,
    };

    try {
      await registerWithEmail(email, password, uploadedPhoto);

      Swal.fire({
        title: "Account Created",
        text: `Account created successfully for ${accountType}.`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "There was an issue creating your account. Please try again.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <section className="m-4 rounded-xl bg-slate-300">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
          }}
        ></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize">
              Get your free account now.
            </h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
              <div className="md:col-span-2 text-center mb-4">
                {uploadedPhoto ? (
                  <img
                    src={uploadedPhoto}
                    alt="Uploaded"
                    className="w-32 h-32 rounded-full mx-auto"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-600">Select Account Type</label>
                <select
                  required
                  className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                  onChange={handleAccountTypeChange}
                  value={accountType || ""}
                >
                  <option value="" disabled>
                    Select a Role
                  </option>
                  <option value="HR">HR</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@example.com"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  required
                  className="form-input"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm text-gray-600">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="********"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Bank Account Number</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  placeholder="1234567890"
                  required
                  className="form-input"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-600">Fixed Salary</label>
                <input
                  type="text"
                  value={salary || ""}
                  readOnly
                  className="form-input bg-gray-200 cursor-not-allowed"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-600">Upload Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={handlePhotoUpload}
                  className="form-input"
                />
              </div>

              <div className="md:col-span-2">
                <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
