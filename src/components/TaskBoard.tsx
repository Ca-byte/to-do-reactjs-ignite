import styles from './TaskBoard.module.css';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import ClipBoardSvg from '../assets/clipboard.svg'
import { TaskList } from './TaskList';



export function TaskBoard(){
	return(
		<>
		<form className={styles.todoForm}>
			<textarea
				placeholder='Add a new task'
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
				<span>0</span>
			</div>
			<div className={styles.taskDone}>
				<p>Tasks done</p>
				<span>0</span>
			</div>
		</header>

		<main className={styles.taskBox}>
			<div className={styles.taskBoxContent}>
				<img src={ClipBoardSvg} alt="Clipboard icon" />
				<p>
					You don't have any tasks registered yet.
					Create tasks and organize your tasks
				</p>
			</div>
		</main>
			<TaskList />
		</>
	)
}