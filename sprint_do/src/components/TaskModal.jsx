
import TaskForm from "./TaskForm";

const TaskModal = ({ editingTask, onClose, onUpdateTask }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">
            Edit Task
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
            aria-label="Close edit dialog"
          >
            &times;
          </button>
        </div>

        <TaskForm
          editingTask={editingTask}
          onUpdateTask={onUpdateTask}
          onCancelEdit={onClose}
        />
      </div>
    </div>
  );
};

export default TaskModal;
