"use client";

import React from "react";
import useFeedback from "./useFeedback";
import FeedbackForm from "../../components/feedback/feedback-form";
import BackToHome from "@/components/ui/back-to-home";

const Feedback: React.FC = () => {
  const { form, errors, successMessage, handleChange, handleSubmit } =
    useFeedback();

  return (
    <div>
      <BackToHome />
      <div className="container max-w-4xl mx-auto flex-grow p-6 ">
        <FeedbackForm
          form={form}
          errors={errors}
          successMessage={successMessage}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Feedback;
