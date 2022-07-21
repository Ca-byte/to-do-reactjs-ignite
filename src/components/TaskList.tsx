import styles from './TaskList.module.css';
import { Trash } from 'phosphor-react';


export function TaskList(){
  return(
    <div className={styles.TaskCard}>
      <div className={styles.rounded}>
      <input 
        name="checkbox"
        type="checkbox"
        id="checkbox"
        
      />
      <label htmlFor="checkbox"></label>
      </div>
      <span>Code tomorrow</span>
      <button
        type='button'
      >
        <Trash size={20}/>
      </button>
    </div>
  )
}