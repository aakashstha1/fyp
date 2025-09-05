import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function CreateThread({
  onClose,
  onSubmit,
  loading,
  title,
  content,
  setTitle,
  setContent,
  category,
  setCategory,
  categories, // [{id,label}]
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative border border-gray-200 dark:border-gray-700">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl"
          aria-label="Close"
        >
          ×
        </button>

        {/* Heading */}
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900 dark:text-gray-100">
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
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            disabled={loading}
            required
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus-visible:ring-2 focus-visible:ring-blue-500"
          />

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={loading}
              required
              className="w-full rounded-xl p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            {loading ? "Posting..." : "Post Thread"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CreateThread;
