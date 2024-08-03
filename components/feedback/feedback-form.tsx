import Button from "../ui/button";
import { FeedbackFormProps } from "@/types/types";

const FeedbackForm: React.FC<FeedbackFormProps> = ({
  form,
  errors,
  successMessage,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      data-testid="feedback-form"
    >
      <div>
        <h1 className="text-2xl font-bold mb-4">Feedback form</h1>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your name"
            aria-label="Name"
            aria-describedby={errors.name ? "name-error" : undefined}
            aria-required="true"
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        <p id="name-error" role="alert" className="text-red-700 min-h-[24px]">
          {errors.name || "\u00A0"}
        </p>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter your email"
            aria-label="Email"
            aria-describedby={errors.email ? "email-error" : undefined}
            aria-required="true"
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        <p id="email-error" role="alert" className="text-red-700 min-h-[24px]">
          {errors.email || "\u00A0"}
        </p>
      </div>
      <div>
        <label htmlFor="feedback" className="block text-sm font-medium">
          Feedback
          <textarea
            id="feedback"
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            placeholder="Enter your feedback"
            aria-label="Feedback"
            aria-describedby={errors.feedback ? "feedback-error" : undefined}
            aria-required="true"
            className={`mt-1 block w-full p-2 border rounded-md ${
              errors.feedback ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        <p
          id="feedback-error"
          role="alert"
          className="text-red-700 min-h-[24px]"
        >
          {errors.feedback || "\u00A0"}
        </p>
      </div>
      <Button
        type="submit"
        className="px-4 py-2 bg-white text-primary font-semibold shadow-md hover:bg-gray-100 transition duration-300 rounded-md"
      >
        Submit
      </Button>
      {errors.form && (
        <div
          role="alert"
          className="flex items-center font-bold text-red-700 border-2 border-red-700 rounded p-2"
        >
          <p>{errors.form}</p>
        </div>
      )}
      {successMessage && (
        <div
          role="status"
          className="flex items-center font-bold text-green-700 border-2 border-green-700 rounded p-2"
        >
          <p>{successMessage}</p>
        </div>
      )}
    </form>
  );
};

export default FeedbackForm;
