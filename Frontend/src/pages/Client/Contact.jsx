// src/pages/Contact.jsx
import React, { useState } from "react";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate form submission
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsSubmitting(false);
            setFormData({ name: '', phone: '', email: '', message: '' });
        }, 2000);
    };

    return (
        <>
            <style jsx>{`
                .contact-section {
                    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
                    position: relative;
                    overflow: hidden;
                    top: 4rem;
                }

                .contact-section::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, transparent 30%, rgba(255, 107, 53, 0.05) 50%, transparent 70%);
                    z-index: 0;
                }

                .contact-title {
                    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    font-weight: 700;
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }

                .contact-info-card {
                    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
                    border: none;
                    border-radius: 25px;
                    padding: 40px;
                    box-shadow: 0 15px 40px rgba(255, 107, 53, 0.15);
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                    height: 100%;
                }

                .contact-info-card::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                    opacity: 0;
                    transform: rotate(45deg);
                    transition: all 0.6s ease;
                    z-index: 0;
                }

                .contact-info-card:hover::before {
                    opacity: 0.05;
                }

                .contact-info-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 25px 50px rgba(255, 107, 53, 0.2);
                }

                .contact-info-card > * {
                    position: relative;
                    z-index: 1;
                }

                .contact-form-card {
                    background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
                    border: none;
                    border-radius: 25px;
                    padding: 40px;
                    box-shadow: 0 15px 40px rgba(255, 107, 53, 0.15);
                    transition: all 0.4s ease;
                    height: 100%;
                }

                .form-control-modern {
                    border: 2px solid #e9ecef;
                    border-radius: 15px;
                    padding: 15px 20px;
                    font-size: 16px;
                    transition: all 0.3s ease;
                    background: rgba(255, 255, 255, 0.9);
                    margin-bottom: 20px;
                }

                .form-control-modern:focus {
                    border-color: #ff6b35;
                    box-shadow: 0 0 0 0.2rem rgba(255, 107, 53, 0.25);
                    background: white;
                    transform: translateY(-2px);
                }

                .form-label-modern {
                    color: #495057;
                    font-weight: 600;
                    margin-bottom: 10px;
                    font-size: 16px;
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
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 10px 25px rgba(255, 107, 53, 0.3);
                }

                .btn-submit-modern::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s;
                }

                .btn-submit-modern:hover::before {
                    left: 100%;
                }

                .btn-submit-modern:hover:not(:disabled) {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(255, 107, 53, 0.4);
                }

                .btn-submit-modern:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .contact-info-item {
                    display: flex;
                    align-items: center;
                    margin-bottom: 25px;
                    padding: 15px;
                    border-radius: 15px;
                    transition: all 0.3s ease;
                }

                .contact-info-item:hover {
                    background: rgba(255, 107, 53, 0.05);
                    transform: translateX(10px);
                }

                .contact-info-icon {
                    width: 50px;
                    height: 50px;
                    background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 20px;
                    margin-right: 15px;
                    box-shadow: 0 5px 15px rgba(255, 107, 53, 0.3);
                }

                .map-container {
                    border-radius: 25px;
                    overflow: hidden;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                    margin-top: 50px;
                    transition: all 0.3s ease;
                }

                .map-container:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
                }

                .loading-spinner {
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s ease-in-out infinite;
                    margin-right: 10px;
                }

                @keyframes spin {
                    to { transform: rotate(360deg); }
                }

                .fade-in-up {
                    opacity: 0;
                    transform: translateY(50px);
                    animation: fadeInUp 0.8s ease forwards;
                }

                .fade-in-left {
                    opacity: 0;
                    transform: translateX(-50px);
                    animation: fadeInLeft 0.8s ease forwards;
                }

                .fade-in-right {
                    opacity: 0;
                    transform: translateX(50px);
                    animation: fadeInRight 0.8s ease forwards;
                }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes fadeInLeft {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes fadeInRight {
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .stagger-1 { animation-delay: 0.2s; }
                .stagger-2 { animation-delay: 0.4s; }
                .stagger-3 { animation-delay: 0.6s; }
            `}</style>

            <section className="py-5 contact-section" id="contact">
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <div className="text-center mb-5 fade-in-up">
                        <h2 className="contact-title">Contact Us</h2>
                        <p className="text-muted fs-5">
                            Have questions or need help? Reach out to us.
                        </p>
                    </div>

                    <div className="row g-5">
                        {/* Contact Info */}
                        <div className="col-md-6 fade-in-left stagger-1">
                            <div className="contact-info-card">
                                <h5 className="fw-bold mb-4" style={{ color: '#ff6b35', fontSize: '24px' }}>Get in Touch</h5>
                                
                                <div className="contact-info-item">
                                    <div className="contact-info-icon">📍</div>
                                    <div>
                                        <h6 className="fw-semibold mb-1">Our Office</h6>
                                        <p className="mb-0 text-muted">Noida, Uttar Pradesh, India</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">📞</div>
                                    <div>
                                        <h6 className="fw-semibold mb-1">Phone Number</h6>
                                        <p className="mb-0 text-muted">+91 9876543210</p>
                                    </div>
                                </div>

                                <div className="contact-info-item">
                                    <div className="contact-info-icon">📧</div>
                                    <div>
                                        <h6 className="fw-semibold mb-1">Email Address</h6>
                                        <p className="mb-0 text-muted">support@otgms.in</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="col-md-6 fade-in-right stagger-2">
                            <div className="contact-form-card">
                                <h5 className="fw-bold mb-4" style={{ color: '#ff6b35', fontSize: '24px' }}>Send Message</h5>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label form-label-modern">Full Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control form-control-modern" 
                                            id="name" 
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label form-label-modern">Phone Number</label>
                                        <input 
                                            type="tel" 
                                            className="form-control form-control-modern" 
                                            id="phone" 
                                            placeholder="e.g. +91 9876543210"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label form-label-modern">Email Address</label>
                                        <input 
                                            type="email" 
                                            className="form-control form-control-modern" 
                                            id="email" 
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required 
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="message" className="form-label form-label-modern">Message</label>
                                        <textarea 
                                            className="form-control form-control-modern" 
                                            id="message" 
                                            rows="4" 
                                            placeholder="Your message here..."
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-submit-modern w-100"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="loading-spinner"></span>
                                                Sending Message...
                                            </>
                                        ) : (
                                            'Send Message'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="container-fluid px-0 fade-in-up stagger-3">
                    <div className="map-container">
                        <iframe
                            title="OTGMS Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1756.2691669233572!2d77.39102605847041!3d28.535516530054803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce56d5d20903d%3A0x19fc9b2e4069bbd9!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1696341864245!5m2!1sen!2sin"
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contact;
