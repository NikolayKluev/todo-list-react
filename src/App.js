import './App.scss';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TaskDetails from './pages/TaskDetails';
import { ToastContainer, Zoom, Slide, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExecutorsCrDel from './pages/ExecutorsCrDel';

function App() {

  // хук, чтобы получить функцию навигации
  const navigate = useNavigate();

  const createTask = () => {
    navigate('/create-task'); // Переходим на страницу 
  };

  const execCrDel = () => {
    navigate('/exec-create-del');
  };

  return (

    <div className='app'>
      <nav>
        <h1>
          <Link to='/'>ToDoList</Link>
        </h1>
        <div className='two-buttons-nav'>
          <button className='bt-add' type='button' onClick={createTask}>Создать задание</button>
          <button className='bt-add' type='button' onClick={execCrDel}>Исполнители</button>
        </div>

      </nav>
      <hr></hr>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-task' element={< CreateTask />} />
        <Route path='/task/:id' element={<TaskDetails />} />
        <Route path='exec-create-del' element={<ExecutorsCrDel />} />
      </Routes>
      <hr></hr>
      <p>ToDoApp 2026</p>
      <ToastContainer position="top-center" autoClose={1000} hideProgressBar={true} transition={Flip} />
    </div>

  );
}

export default App;
