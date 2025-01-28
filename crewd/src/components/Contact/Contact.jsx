import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
 
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await axios.post("https://employee-server-smoky.vercel.app/api/messages", { email, message });

      if (response.data.success) {
        setSuccess("Message sent successfully!");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 min-h-screen ">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg p-10 shadow-xl rounded-2xl border border-green-300/50">
        <h2 className="text-4xl font-extrabold text-black text-center mb-6 drop-shadow-lg">
          Contact Us
        </h2>
        <p className="text-black text-center mb-6 text-lg">
          Have a question or feedback? Send us a message!
        </p>

       
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-green-300 bg-transparent rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-black font-semibold">Message</label>
            <textarea
              className="w-full p-3 border border-green-300 bg-transparent rounded-lg text-black placeholder-black focus:outline-none focus:ring-2 focus:ring-green-400"
              rows="4"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-green-400 text-black py-3 rounded-lg font-semibold hover:from-green-700 hover:to-green-500 transition duration-300 shadow-lg"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && <p className="text-black text-center mt-3">{success}</p>}
          {error && <p className="text-red-800 text-center mt-3">{error}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
