import React, { useEffect, useState } from "react";
import { apiService } from "../../utils/apiService";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react"; // FAQ icon

const FAQSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("accessToken");
        const res = await apiService.post("/faq/getfaq", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res?.data?.success) {
          setFaqs(res.data.data.filter((item) => item.isActive));
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

  if (loading) return <p className="text-center text-white">Loading FAQs...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      {/* Container for Left + Right Cards */}
      <div className="flex flex-col md:flex-row gap-6 w-full lg:w-3/4">
        
       
      
       <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-4">
         <h2 className="text-2xl fw-bold text-center text-black mb-3rem">
      Frequently Asked Questions
    </h2>
  <div className="w-full max-w-2xl rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20 p-6">
   

    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={faq._id}
          className="rounded-xl border border-white/20 bg-white/5 shadow-sm overflow-hidden transition"
        >
          {/* Question Header */}
         <button
  className="w-full flex items-center justify-between p-4 bg-black/40 backdrop-blur-md rounded-xl hover:bg-black/50 transition w-100"
  onClick={() => toggleFAQ(index)}
>
  <span className="font-semibold text-lg text-white">
    {faq.question}
  </span>
  <motion.div
    animate={{ rotate: openIndex === index ? 180 : 0 }}
    transition={{ duration: 0.3 }}
    className="ml-4 flex-shrink-0"
  >
    <ChevronDown className="w-6 h-6 text-blue-400" />
  </motion.div>
</button>

          {/* Answer Section */}
       <AnimatePresence>
  {openIndex === index && (
    <motion.div
      initial={{ maxHeight: 0, opacity: 0 }}
      animate={{ maxHeight: 500, opacity: 1 }}
      exit={{ maxHeight: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="overflow-hidden px-4 pb-4 text-gray-200"
    >
      <p className="mt-2">{faq.answer}</p>
      <span className="text-xs text-blue-300 block mt-2">
        Category: {faq.category}
      </span>
    </motion.div>
  )}
</AnimatePresence>
        </div>
      ))}
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default FAQSection;
