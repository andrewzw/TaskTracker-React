import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Task from './components/Task'
import AddTask from './components/AddTask'
import About from './components/About'

function App() {
  const[showAddTask, setShowAddTask] = useState(false);
  const[task, setTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const tasksFromServer = await fetchTasks()
      setTask(tasksFromServer)
    }

    getTask()
  }, [])
  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }
  
  // Fetch Single Task
  const fetchSingleTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (singleTask) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(singleTask),
    })

    const data = await res.json()

    setTask([...task, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...singleTask }
    // setTask([...task, newTask])
  }

  //Delete Task
  const deleteTask= async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE'})

    setTask(task.filter((task)=> task.id !== id));
  }
  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchSingleTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updatedTask),
    })
    const data = await res.json()

    setTask(
      task.map((singleTask) =>
      singleTask.id === id ? { ...singleTask, reminder: data.reminder } : singleTask
      )
    )
  }


return (
  <Router>
    <div className='container'>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {task.length > 0 ? (
                <Task
                  task={task}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
)
}

export default App