import styles from './TaskCounter.module.css';

interface TaskCounterProps {
    text: string
    taskNumber: number;
    isConclude: boolean;
    concludedTask?: number;
}

export function TaskCounter({text, taskNumber, isConclude, concludedTask}: TaskCounterProps) {

    return(
        <div className={styles.taskCounter}>
            <h1 className={ isConclude ? styles.textConcluded :  styles.text}>
                {text}
            </h1>
            <h1 className={styles.showNumber}>
                {
                    taskNumber !== 0 && isConclude ? 
                        `${concludedTask} de ${taskNumber}`
                        : taskNumber
                } 
            </h1>
        </div>
    )
}