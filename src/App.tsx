import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { PlusCircle } from 'phosphor-react'
import { Header } from './components/Header'
import { TaskCounter } from './components/TaskCounter'

import styles from './App.module.css'
import './global.css'
import { EmptyTasks } from './components/EmptyTasks'


function App() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTask, setNewTask] = useState<string>('');

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault();

    setTasks([...tasks, newTask])
    setNewTask('');
  }

  function handleAddNewTask(e: ChangeEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("")
    setNewTask(e.target.value)
  }

  function handleNewTaskInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
    e.target.setCustomValidity("Insira um valor válido para publicar a tarefa!")
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
              <PlusCircle size={20} weight="bold"/>
            </button>
        </form>
        <div className={styles.taskContainer}>
          <TaskCounter 
            taskNumber={3}
            isConclude={false}
            text={'Tarefas Criadas'}
          />
          <TaskCounter 
            taskNumber={3}
            concludedTask={1}
            isConclude
            text={'Concluídas'}
          />
        </div>
        <EmptyTasks />
      </div>
    </div>
  )
}

export default App
