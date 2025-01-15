import { useState } from "react";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
    const [accountType, setAccountType] = useState(null);
    const [uploadedPhoto, setUploadedPhoto] = useState("");

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        const response = await fetch("https://api.imgbb.com/1/upload?key=f672d40464065dd6ecfec4c17a491399", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        if (data.success) {
            setUploadedPhoto(data.data.display_url);
        } else {
            alert("Photo upload failed. Try again.");
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
                        <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white">
                            Get your free account now.
                        </h1>

                        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                            {/* Account Type Dropdown */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                                    Select Account Type
                                </label>
                                <select
                                    required
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                                    onChange={(e) => setAccountType(e.target.value)}
                                    value={accountType || ""}
                                >
                                    <option value="" disabled>
                                        Select a Role
                                    </option>
                                    <option value="HR">HR</option>
                                    <option value="Employee">Employee</option>
                                </select>
                            </div>

                            {/* Username Field */}
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Username</label>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    className="form-input"
                                />
                            </div>

                            {/* Email Field */}
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email</label>
                                <input
                                    type="email"
                                    placeholder="example@example.com"
                                    required
                                    className="form-input"
                                />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    required
                                    className="form-input"
                                />
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Confirm Password</label>
                                <input
                                    type="password"
                                    placeholder="********"
                                    required
                                    className="form-input"
                                />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Salary</label>
                                <input type="number" placeholder="50000" required className="form-input" />
                            </div>

                            {/* Designation Field */}
                            <div>
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Designation</label>
                                <select
                                    required
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring focus:ring-blue-400 focus:outline-none"
                                    disabled={accountType === null}
                                >
                                    <option value="" disabled>
                                        Select a Designation
                                    </option>
                                    {accountType === "HR" ? (
                                        <option value="HR">HR</option>
                                    ) : (
                                        <>
                                            <option value="Digital Marketer">Digital Marketer</option>
                                            <option value="Software Engineer">Software Engineer</option>
                                            <option value="Project Manager">Project Manager</option>
                                            <option value="Team Lead">Team Lead</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            {/* Image Upload */}
                            <div className="md:col-span-2">
                                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Upload Photo</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    required
                                    onChange={handlePhotoUpload}
                                    className="form-input"
                                />
                                {uploadedPhoto && (
                                    <img src={uploadedPhoto} alt="Uploaded" className="mt-4 rounded-md w-24" />
                                )}
                            </div>

                            {/* Social Login Buttons */}
                            <div className="md:col-span-2 flex flex-col gap-4">
                                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2">
                                    <FaGoogle /> Register with Google
                                </button>
                            </div>

                            {/* Submit Button */}
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
