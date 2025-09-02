import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateThread({
  onClose,
  onSubmit,
  loading,
  successMessage,
  errorMessage,
  title,
  content,
  setTitle,
  setContent,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-200 text-2xl"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-100">
          Create a New Thread
        </h2>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-4">
          <Input
            placeholder="Thread title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            required
            className="bg-gray-800 text-gray-100 border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500"
          />
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            disabled={loading}
            required
            className="bg-gray-800 text-gray-100 border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {loading ? "Posting..." : "Post Thread"}
          </Button>

          {/* Messages */}
          {successMessage && (
            <p className="text-green-400 text-sm text-center">
              {successMessage}
            </p>
          )}
          {errorMessage && (
            <p className="text-red-400 text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default CreateThread;
