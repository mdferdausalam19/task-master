import { useState } from "react";

export default function AddTaskModal({ onSave, taskToUpdate, onCloseClick }) {
  const [task, setTask] = useState(
    taskToUpdate || {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      tags: [],
      priority: "",
      isFavorite: false,
    }
  );

  const [isAdd] = useState(Object.is(taskToUpdate, null));
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "tags") {
      value = value.split(",");
    }
    setTask({
      ...task,
      [name]: value,
    });
    setError("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (
      !task.title.trim() ||
      !task.description.trim() ||
      !task.priority.trim()
    ) {
      setError(
        "Please fill in all required fields (Title, Description, Priority)."
      );
      return;
    }

    if (task.tags.length === 0) {
      setError("Please enter at least one tag.");
      return;
    }

    onSave(task, isAdd);
    setError("");
  };

  return (
    <>
      <div
        className="bg-gray-800 opacity-50 fixed inset-0 z-40"
        onClick={onCloseClick}
      ></div>
      <form
        onSubmit={handleSave}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11 z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-2xl"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          {isAdd ? "Add New Task" : "Edit Task"}
        </h2>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <div className="space-y-9 text-white lg:space-y-10">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Title</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="title"
              value={task.title}
              onChange={handleChange}
              id="title"
              required
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="block min-h-[120px] w-full rounded-md bg-[#2D323F] px-3 py-2.5 lg:min-h-[180px]"
              type="text"
              name="description"
              value={task.description}
              onChange={handleChange}
              id="description"
              required
            ></textarea>
          </div>
          <div className="grid-cols-2 gap-x-4 max-md:space-y-9 md:grid lg:gap-x-10 xl:gap-x-20">
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="tags">Tags</label>
              <input
                className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
                type="text"
                name="tags"
                value={task.tags}
                onChange={handleChange}
                id="tags"
                required
              />
            </div>
            <div className="space-y-2 lg:space-y-3">
              <label htmlFor="priority">Priority</label>
              <select
                className="block w-full cursor-pointer rounded-md bg-[#2D323F] px-3 py-2.5"
                name="priority"
                value={task.priority}
                onChange={handleChange}
                id="priority"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
        </div>
        <div className="mt-16 flex justify-between items-center lg:mt-20">
          <button
            className="rounded bg-red-600 px-4 py-2 text-white transition-all hover:opacity-80"
            onClick={onCloseClick}
            type="button"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            {isAdd ? "Create New Task" : "Update Task"}
          </button>
        </div>
      </form>
    </>
  );
}
