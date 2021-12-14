import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    if(newTaskTitle != '' && tasks.filter(task => task.title.toLocaleLowerCase() == newTaskTitle.toLocaleLowerCase()).length == 0) {
      const getFreeId = (l: Task[], n: number = 0): number =>  {
        return l[n] == null || l[n].id != n ? n : getFreeId(l, n + 1)
      }

      const newTask: Task = {
        id: getFreeId(tasks),
        title: newTaskTitle,
        isComplete: false
      }
      setTasks([...tasks, newTask].sort((a, b) => a.id - b.id))
      console.log(newTask.id)
      console.log(tasks)
    }
  }
  function handleToggleTaskCompletion(id: number) {
    setTasks([...tasks.filter(task => task.id != id), {...tasks.filter(task => task.id == id)[0], isComplete: tasks.filter(task => task.id == id)[0].isComplete ? false : true}])
  }

  function handleRemoveTask(id: number) {
    setTasks([...tasks.filter(task => task.id != id)])
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}