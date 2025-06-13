import { useState } from "react";
import SearchTask from "./SearchTask";
import TaskActions from "./TaskActions";
import TaskList from "./TaskList";
import AddTaskModal from "./AddTaskModal";
import NoTaskFound from "./NoTaskFound";

export default function TaskBoard() {
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );
  const [showAddModal, setAddShowModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const updateLocalStorage = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddEditTask = (newTask, isAdd) => {
    const updatedTasks = isAdd
      ? [...tasks, newTask]
      : tasks.map((task) => (task.id === newTask.id ? newTask : task));

    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
    setAddShowModal(false);
  };

  const handleEditTask = (task) => {
    setTaskToUpdate(task);
    setAddShowModal(true);
  };

  const handleCloseClick = () => {
    setAddShowModal(false);
    setTaskToUpdate(null);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleDeleteAllClick = () => {
    setTasks([]);
    updateLocalStorage([]);
  };

  const handleFavorite = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isFavorite: !task.isFavorite } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredTasks = searchTerm.trim()
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      )
    : tasks;

  return (
    <section className="mb-20 mt-20 relative px-4" id="tasks">
      {showAddModal && (
        <AddTaskModal
          onSave={handleAddEditTask}
          taskToUpdate={taskToUpdate}
          onCloseClick={handleCloseClick}
        />
      )}
      <div className="container mx-auto">
        <div className="mb-3 p-2 flex justify-end">
          <SearchTask onSearch={handleSearch} />
        </div>
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskActions
            onAddClick={() => setAddShowModal(true)}
            onDeleteAllClick={handleDeleteAllClick}
          />
          {filteredTasks.length > 0 ? (
            <TaskList
              tasks={filteredTasks}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onFav={handleFavorite}
            />
          ) : (
            <NoTaskFound />
          )}
        </div>
      </div>
    </section>
  );
}
