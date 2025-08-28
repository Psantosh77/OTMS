const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: false,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Example dummy FAQ data for car repair service
// You can use this for seeding or testing
/*
[
  {
    question: "What types of car repair services do you offer?",
    answer: "We offer engine diagnostics, brake repair, oil changes, AC servicing, battery replacement, and more.",
    category: "General"
  },
  {
    question: "How long does a typical car repair take?",
    answer: "Most repairs are completed within 1-2 days, depending on the complexity and parts availability.",
    category: "Service Time"
  },
  {
    question: "Do you use genuine spare parts?",
    answer: "Yes, we use only genuine and manufacturer-approved spare parts for all repairs.",
    category: "Parts"
  },
  {
    question: "Can I book a service online?",
    answer: "Absolutely! You can book your car repair service online through our website or mobile app.",
    category: "Booking"
  },
  {
    question: "Is there a warranty on repairs?",
    answer: "We provide a 6-month warranty on all major repairs and replaced parts.",
    category: "Warranty"
  }
]
*/

faqSchema.statics.updateIsActive = async function (_id, isActive) {
  return this.findByIdAndUpdate(_id, { isActive }, { new: true });
};

const FaqModel = mongoose.model('Faq', faqSchema);
module.exports = FaqModel;
