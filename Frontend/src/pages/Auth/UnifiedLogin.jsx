import React, { useState } from "react";



const UnifiedLogin = () => {
    const [userType, setUserType] = useState("Client"); // Default to Client

    const renderForm = () => {
        switch (userType) {
            case "Admin":
                return (
                    <div className="fade-in-up stagger-2">
                        <input type="text" placeholder="Username" className="form-control-modern" />
                        <input type="password" placeholder="Password" className="form-control-modern" />
                        <button className="btn-submit-modern w-100">Login as Admin</button>
                    </div>
                );
            case "Vendor":
                return (
                    <div className="fade-in-up stagger-2">
                        <input type="text" placeholder="Email or Mobile" className="form-control-modern" />
                        <input type="password" placeholder="Password" className="form-control-modern" />
                        <button className="btn-submit-modern w-100">Login as Vendor</button>
                    </div>
                );
            case "Client":
                return (
                    <div className="fade-in-up stagger-2">
                        <div className="form-row">
                            <input type="text" placeholder="Full Name" className="form-control-modern" />
                            <input type="text" placeholder="Address" className="form-control-modern" />
                        </div>
                        <div className="form-row">
                            <input type="text" placeholder="Vehicle Number" className="form-control-modern" />
                            <input type="text" placeholder="Vehicle Model" className="form-control-modern" />
                        </div>
                        <div className="form-row">
                            <input type="text" placeholder="Vehicle Brand" className="form-control-modern" />
                            <input type="text" placeholder="Mobile Number" className="form-control-modern" />
                        </div>
                        <button className="btn-submit-modern w-100">Submit Details</button>
                    </div>
                );

            default:
                return (
                    <p className="text-muted text-center mt-4 fade-in-up stagger-2">
                        Please select a user type to continue.
                    </p>
                );
        }
    };

    return (
        <>
            <style jsx>{`
        .login-container {
          background: linear-gradient(145deg, #fff 0%, #f8f9fa 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }
        .login-box {
          background: #fff;
          border-radius: 25px;
          box-shadow: 0 10px 30px rgba(255, 107, 53, 0.12);
          padding: 40px 30px;
          max-width: 800px;
          width: 100%;
        }
          .form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-row .form-control-modern {
  flex: 1;
}

        .form-control-modern {
          border: 2px solid #e9ecef;
          border-radius: 15px;
          padding: 15px 20px;
          font-size: 16px;
          background: rgba(255, 255, 255, 0.9);
          margin-bottom: 20px;
          width: 100%;
          outline: none;
        }
        .form-control-modern:focus {
          border-color: #ff6b35;
          box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.15);
        }
        .btn-submit-modern {
          background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
          border: none;
          border-radius: 15px;
          padding: 15px 40px;
          color: white;
          font-weight: 600;
          font-size: 18px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
        }
        .btn-submit-modern:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .login-title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 20px;
          color: #ff6b35;
          text-align: center;
        }
        select {
          margin-bottom: 25px;
        }
      `}</style>

            <div className="login-container">
                <div className="login-box">
                    <div className="login-title">Select User Type</div>
                    <select
                        className="form-control-modern"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                    >

                        <option value="Client">Client</option>
                        <option value="Vendor">Vendor</option>
                        <option value="Admin">Admin</option>
                    </select>

                    {renderForm()}
                </div>
            </div>
        </>
    );
};

export default UnifiedLogin;
