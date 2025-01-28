import React, { useEffect, useState } from "react";
import axios from "axios";

const VisitorMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    const fetchMessages = async () => {
      try {
        const response = await axios.get("https://employee-server-smoky.vercel.app/api/messages");
        setMessages(response.data);
      } catch (err) {
        setError("Failed to load messages.");
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  return (
    <section className="py-16 px-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Visitor Messages</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading messages...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-600 text-center">No messages yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-3 text-left">Email</th>
                  <th className="border border-gray-300 p-3 text-left">Message</th>
                  <th className="border border-gray-300 p-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg._id} className="border-b border-gray-300">
                    <td className="border border-gray-300 p-3 text-gray-700">{msg.email}</td>
                    <td className="border border-gray-300 p-3 text-gray-700">{msg.message}</td>
                    <td className="border border-gray-300 p-3 text-gray-700">
                      {new Date(msg.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default VisitorMessages;
