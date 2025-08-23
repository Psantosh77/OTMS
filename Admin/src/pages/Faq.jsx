import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import FaqModal from "./FaqModal";
import "./Faq.css";

function Faq() {
  const [faqs, setFaqs] = useState([
    { id: 1, category: "General", question: "What is your return policy?", answer: "You can return within 30 days.", active: true },
    { id: 2, category: "Payment", question: "Do you accept UPI?", answer: "Yes, UPI is accepted.", active: false },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [search, setSearch] = useState("");

  const handleSave = (data) => {
    if (editData) {
      setFaqs(faqs.map((f) => (f.id === editData.id ? { ...f, ...data } : f)));
    } else {
      setFaqs([...faqs, { id: Date.now(), ...data }]);
    }
    setEditData(null);
  };

  const handleDelete = (id) => {
    setFaqs(faqs.filter((f) => f.id !== id));
  };

  const filteredFaqs = faqs.filter(
    (f) =>
      f.category.toLowerCase().includes(search.toLowerCase()) ||
      f.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="faq-page">
        <div className="faq-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search FAQ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button>Search</button>
          </div>
          <button className="add-btn" onClick={() => setModalOpen(true)}>
            <FaPlus /> Add FAQ
          </button>
        </div>

        <div className="table-container">
          <table className="faq-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Question</th>
                <th>Answer</th>
                <th>Active</th>
                <th colSpan={2}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaqs.map((f) => (
                <tr key={f.id}>
                  <td>{f.category}</td>
                  <td>{f.question}</td>
                  <td>{f.answer}</td>
                  <td>
                    <span className={`status ${f.active ? "active" : "inactive"}`}>
                      {f.active ? "True" : "False"}
                    </span>
                  </td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditData(f);
                        setModalOpen(true);
                      }}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(f.id)}>
                      <FaTrash /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FaqModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSave}
        initialData={editData}
        mode={editData ? "edit" : "add"}
      />
    </>
  );
}

export default Faq;
