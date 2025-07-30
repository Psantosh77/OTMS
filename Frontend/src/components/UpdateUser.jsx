import React from "react";

const UpdateUser = ({ onClose, email }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button
          className="absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-500">Update User Info</h2>
        <p className="mb-4 text-gray-700">Welcome, <span className="font-semibold">{email}</span>!</p>
        {/* Add your update user form fields here */}
        <form>
          <div className="mb-4">
            <label className="block font-medium mb-2">Name</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Enter your name" />
          </div>
          <div className="mb-4">
            <label className="block font-medium mb-2">Phone</label>
            <input type="text" className="border rounded px-3 py-2 w-full" placeholder="Enter your phone" />
          </div>
          <button type="submit" className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold px-6 py-2 rounded shadow hover:from-yellow-400 hover:to-orange-500 transition-all">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
