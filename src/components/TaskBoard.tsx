import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { TaskList } from './TaskList';
import { PlusCircle } from 'phosphor-react';
import ClipBoardSvg from '../assets/clipboard.svg';
import styles from './TaskBoard.module.css';
import {v4 as uuidv4} from 'uuid';

export function TaskBoard() {
  const [tasks, setTask] = useState([
    {
      id: uuidv4(),
      title: 'Code tomorrow',
      isComplete: false,
    },
  ]);
  const [newTask, setNewTask] = useState({} as any);

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();
    setTask([...tasks, newTask]);
    setNewTask({
      id: uuidv4(),
      title: '',
      isComplete: false,
    });
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('');
    setNewTask({
      id: uuidv4(),
      title: event.target.value,
      isComplete: true,
    });
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Hey, add a task first!');
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeletedOne = tasks.filter((task) => {
      return task.id !== taskToDelete;
    });

    setTask(tasksWithoutDeletedOne);
  }

  return (
    <>
      <form onSubmit={handleAddNewTask} className={styles.todoForm}>
          <textarea
            placeholder="Add a new task"
            value={newTask.title}
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
          />
          <button type="submit">
            Create
            <PlusCircle weight="bold" size={18} />
          </button>
      </form>

      <header className={styles.taskContainer}>
          <div className={styles.taskCreated}>
            <p>Tasks created</p>
            <span>{tasks.length}</span>
          </div>
          <div className={styles.taskDone}>
              <p>Tasks done</p>
              <span>
                {tasks.filter((task) => task.isComplete).length}
              </span>{' '}
              de <span>{tasks.length}</span>
          </div>
      </header>

      <main className={styles.taskBox}>
          {tasks.length === 0 ? (
              <div className={styles.taskBoxContent}>
                <img src={ClipBoardSvg} alt="Clipboard icon" />
                <p>
                  You don't have any tasks registered yet. Create
                  tasks and[] organize your tasks
                </p>
              </div>
          ) : (
              ''
          )}
          {tasks.map((task) => {
            return (
              <TaskList
                key={task.id}
                id={task.id}
                content={task.title}
                isComplete={task.isComplete}
                onDeleteTask={deleteTask}
              />
            );
          })}
      </main>
    </>
  );
}