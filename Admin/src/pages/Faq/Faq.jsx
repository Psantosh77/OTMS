import React, { useState } from "react";
import FaqDataGrid from "./FaqDataGrid";
import { FaPlus } from "react-icons/fa";
import FaqModal from "./FaqModal";
import "./Faq.css";

function Faq() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [faqData, setFaqData] = useState([]);

  // Function to fetch FAQ data from API
  const getFaq = async () => {
    try {
      const { postApi } = await import("../../utils/apiConfig/apiService");
      const res = await postApi({ url: "home/getfaq" });
      setFaqData(res?.data || res);
    } catch (err) {
      setFaqData([]);
      console.error("Error fetching FAQ:", err);
    }
  };

  // Fetch FAQ data on mount
  React.useEffect(() => {
    getFaq();
  }, []);

  const handleSave = async (data) => {
    // Call POST API endpoint home/addfaq with question, answer, category, and _id if editing
    try {
      const payload = {
        question: data.question,
        answer: data.answer,
        category: data.category,
      };
      if (editData && editData._id) {
        payload._id = editData._id;
      }
      const { postApi } = await import("../../utils/apiConfig/apiService");
      await postApi({ url: "home/addfaq", payload });
      alert("FAQ added successfully!");
      getFaq(); // Refresh grid after add/edit
    } catch (err) {
      alert("Error adding FAQ: " + (err?.message || JSON.stringify(err)));
    }
    setEditData(null);
  };

  return (
    <>
      <div className="faq-page">
        <div className="faq-header">
          <button className="add-btn" onClick={() => {
            setEditData(null);
            setModalOpen(true);
          }}>
            <FaPlus /> Add FAQ
          </button>
        </div>
        <FaqDataGrid
          data={faqData}
          onEdit={(data) => {
            setEditData(data);
            setModalOpen(true);
          }}
        />
        <FaqModal
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setEditData(null);
          }}
          onSubmit={handleSave}
          editData={editData}
        />
      </div>
    </>
  );
}

export default Faq;
