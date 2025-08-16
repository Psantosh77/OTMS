import React, { useEffect, useState } from "react";
import { apiService } from "../../utils/apiService";

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await apiService.get("/home/getfaq", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res?.data?.success) {
          setFaqs(res.data.data.filter((item) => item.isActive)); // sirf active faqs
        } else {
          setError("Failed to fetch FAQs");
        }
      } catch (err) {
        console.error("FAQ Fetch Error:", err);
        setError("Something went wrong while fetching FAQs.");
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  if (loading) return <p className="text-center">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className="p-4 border rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg">{faq.question}</h3>
            <p className="text-gray-600 mt-2">{faq.answer}</p>
            <span className="text-xs text-blue-500">Category: {faq.category}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
