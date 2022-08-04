import {
  ChangeEvent,
  FormEvent,
  InvalidEvent,
  useEffect,
  useState,
} from 'react';
import { TaskList } from './TaskList';
import { PlusCircle } from 'phosphor-react';
import ClipBoardSvg from '../assets/clipboard.svg';
import styles from './TaskBoard.module.css';
import { v4 as uuidv4 } from 'uuid';

type TaskProps = {
  id: string;
  title: string;
  isComplete?: boolean;
};

const items = JSON.parse(localStorage.getItem('todos') || '');

export function TaskBoard() {
  const [tasks, setTask] = useState<TaskProps[]>(items);
  const [newTask, setNewTask] = useState({} as TaskProps);

  console.log(JSON.stringify(tasks, null, 2));

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    const newTaskList = [...tasks, newTask];

    setTask(newTaskList);
    

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
      isComplete: false,
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

  function handleToggleTaskCompletion(id: string) {
    const editedTasks = tasks.map((task) => {
      if (task.id === id) {
        return {
          ...task,
          isComplete: !task.isComplete,
        };
      }

      return task;
    });

    setTask(editedTasks);

  }

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className={styles.container}>
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
                      tasks and organize your tasks
                  </p>
              </div>
          ) : (
              ''
          )}
          {tasks.map((task, index) => (
              <TaskList
                  key={index}
                  id={task.id}
                  content={task.title}
                  isComplete={task.isComplete}
                  onCompleted={handleToggleTaskCompletion}
                  onDeleteTask={deleteTask}
              />
          ))}
      </main>
   </div>
  );
}
