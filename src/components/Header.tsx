import styles from './Header.module.css';
import todoLogo from '../assets/logo-todo.svg';

export function Header(){
  return(
    <div className={styles.header}>
      <img className={styles.logo} src={todoLogo} alt="Logo"  />
    </div>
  )
}