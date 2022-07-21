import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { TaskList } from './TaskList';
import { PlusCircle } from 'phosphor-react';
import ClipBoardSvg from '../assets/clipboard.svg'
import styles from './TaskBoard.module.css';

export function TaskBoard(){
  const [tasks, setTask] = useState(['Code tomorrow']);
  const [newTask, setNewTask] = useState('');


  function handleAddNewTask(event: FormEvent){
    event.preventDefault();
    setTask([...tasks, newTask]);
    setNewTask('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('');
    setNewTask(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>){
    event.target.setCustomValidity('Hey, add a task first!');
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task !== taskToDelete
    })

    setTask(tasksWithoutDeletedOne);
  }

	return(
		<>
      <form onSubmit={handleAddNewTask} className={styles.todoForm}>
        <textarea
          placeholder='Add a new task'
          value={newTask}
          onChange={handleNewTaskChange}
          onInvalid={handleNewTaskInvalid}
          required
        />
        <button
          type='submit'
        >
          Create
          <PlusCircle weight='bold' size={18} />
        </button>
      </form>

      <header className={styles.taskContainer}>
        <div className={styles.taskCreated}>
          <p>Tasks created</p>
          <span>{tasks.length}</span>
        </div>
        <div className={styles.taskDone}>
          <p>Tasks done</p>
          <span>0</span> de <span>{tasks.length}</span>
        </div>
      </header>

      <main className={styles.taskBox}>
        {
          tasks.length === 0 
          ?
          (
            <div className={styles.taskBoxContent}>
              <img src={ClipBoardSvg} alt="Clipboard icon" />
              <p>
                You don't have any tasks registered yet.
                Create tasks and organize your tasks
              </p>
            </div> 
          ):('')
        }
        {
          tasks.map(task => {
            return(
              <TaskList 
                key={task}
                id={task}
                content={task}
                onDeleteTask={deleteTask}
              />
            )
          })
        }
      </main>
		</>
	)
}