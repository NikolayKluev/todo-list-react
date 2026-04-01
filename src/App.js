import './App.scss';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import TaskDetails from './pages/TaskDetails';

function App() {

  // хук, чтобы получить функцию навигации
  const navigate = useNavigate();

  const createTask = () => {
    navigate('/create-task'); // Переходим на страницу 
  };

  return (
    
      <div className='app'>
        <nav>
          <h1>
            <Link to='/'>ToDoList</Link>
          </h1>
          <button className='bt-add' type='button' onClick={createTask}>Создать задание</button>
        </nav>
        <hr></hr>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-task' element={< CreateTask />}/>
          <Route path='/task/:id' element={<TaskDetails />}/>           
        </Routes>
        <hr></hr>
      </div>
    
  );
}

export default App;
