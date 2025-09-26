import React, { useState } from "react";

export default function AfterloginDetailsModal({ form, selectedCar, user, onClose }) {
  const [agree, setAgree] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleSubmit = () => {
    if (!agree) return alert("⚠️ Please accept Terms & Conditions");
    setShowSnackbar(true);

    // Auto close snackbar after 3 sec
    setTimeout(() => {
      setShowSnackbar(false);
      onClose();
    }, 3000);
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirm Your Details</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>
            <p><b>Location:</b> {form.location}</p>
            <p><b>Date:</b> {form.date}</p>
            <p><b>Model:</b> {selectedCar.brand} {selectedCar.model}</p>

            <div className="form-check mt-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={agree}
                onChange={() => setAgree(!agree)}
              />
              <label className="form-check-label">
                I agree to the Terms & Conditions
              </label>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={!agree}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {showSnackbar && (
        <div
          className="position-fixed bottom-0 start-50 translate-middle-x bg-success text-white px-4 py-2 rounded shadow"
          style={{ zIndex: 2000, marginBottom: "20px" }}
        >
          ✅ Thank you! Your request is confirmed.
        </div>
      )}
    </div>
  );
}
