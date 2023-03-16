import { ChangeEvent, FormEvent, InvalidEvent, useEffect, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'
import { TaskCounter } from './components/TaskCounter'

import styles from './App.module.css'
import './global.css'
import { EmptyTasks } from './components/EmptyTasks'
import { Task } from './components/Tasks'


interface Tasks{
  id: number,
  text: string,
  concluded: boolean
}

function App() {
  const [tasks, setTasks] = useState<Tasks[]>(
    [
      {
        id: 1,
        text: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
        concluded: false,
      }, 
      {
        id: 2,
        text: 'Integer urna interdum massa libero auctor neque turpis turpis semper.',
        concluded: true
      }
    ]
  )
  const [newTask, setNewTask] = useState<string>('');
  const [concludedTasks, setConcludedTasks] = useState(tasks.filter((task) => task.concluded === true))

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();

    const newObjectTask: Tasks = {
      id: Math.random() * 1000,
      text: newTask,
      concluded: false
    }

    setTasks([...tasks, newObjectTask])
    setNewTask('');
  }

  function handleAddNewTask(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("")
    setNewTask(e.target.value)
  }

  function handleNewTaskInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("Insira um valor válido para publicar a tarefa!")
  }

  function updateTasks(value: boolean, id: number, position: number){
    const updateTask = tasks.filter((task) => task.id === id)
    updateTask[0].concluded = value
    
    const updatedTasksArray = tasks

    updatedTasksArray.splice(position, 1, updateTask[0])

    setTasks(updatedTasksArray)
    setConcludedTasks(updatedTasksArray.filter((task) => task.concluded === true))
  }

  function removeTasks(id: number) {
    const removedTask = tasks.filter((task) => task.id === id)
    const tasksWithoutRemoved = tasks.filter((task) => task.id !== id)

    if(removedTask[0].concluded){
      setConcludedTasks(tasksWithoutRemoved.filter((task) => task.concluded === true))
    }

    setTasks(tasksWithoutRemoved)
  }

  const haveTasks = tasks.length !== 0
  const isNewTaskEmpty = newTask.length === 0;

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <form onSubmit={handleCreateNewTask} className={styles.form} >
          <textarea 
            placeholder='Adicione uma nova tarefa'
            name='task'
            value={newTask}
            onChange={handleAddNewTask}
            onInvalid={handleNewTaskInvalid}
            required
          />
            <button type='submit' disabled={isNewTaskEmpty}>
              Criar 
              <PlusCircle size={24} weight="bold"/>
            </button>
        </form>
        <div className={styles.taskCountContainer}>
          <TaskCounter 
            taskNumber={tasks.length}
            isConclude={false}
            text={'Tarefas Criadas'}
          />
          <TaskCounter 
            taskNumber={tasks.length}
            concludedTask={concludedTasks.length}
            isConclude
            text={'Concluídas'}
          />
        </div>
        {
          haveTasks ? 
            <div className={styles.taskContainer}>
              {tasks.map((task, i) => (
                <Task 
                  key={task.id}
                  text={task.text} 
                  id={task.id} 
                  position={i}
                  concluded={task.concluded}
                  updateTasks={updateTasks}
                  removeTasks={removeTasks}
                />
              ))}
            </div>
            : 
            <EmptyTasks />
        }
      </div>
    </div>
  )
}

export default App
