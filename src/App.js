import "./App.css";
import Footer from "./components/Footer/Footer";
import NewTaskForm from "./components/NewTaskForm";
import TaskList from "./components/TaskList/TaskList";

function App() {
  const taskData = {
    description: "Completed task",
    created: "created 17 seconds ago",
  };

  return (
    <div className="todoapp">
      <NewTaskForm />
      <TaskList taskData={taskData} />
      <Footer />
    </div>
  );
}

export default App;
