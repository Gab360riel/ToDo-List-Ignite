import { useEffect, useState } from 'react'
import { Check, Trash } from 'phosphor-react'

import styles from './Tasks.module.css'

interface TaskProps {
    text: string
    id: string
    position: number
    concluded: boolean
    updateTasks: (value: boolean, id: string, position: number) => void
    removeTasks: (id: string) => void
}

export function Task({ text, id, position, concluded, updateTasks, removeTasks }: TaskProps) {
    const [checked, setChecked] = useState(false)

    function changeStatus() {
        setChecked(!checked)

        updateTasks(!checked, id, position)
    }

    function deleteTask() {
        removeTasks(id)
    }

    useEffect(() => {
        setChecked(concluded)
    }, [concluded])

    const classes = {
        container: checked ? styles.checkedContainer : '',
        content: checked ? styles.concludedContent : '',
        button: checked ? styles.checkedButton : ''
    }

    return(
        <article className={`${styles.container} ${classes.container}`}>
           <div>
                <button
                    className={`${styles.button} ${classes.button}`}
                    onClick={changeStatus}
                >
                    {checked ? <Check size={24} weight="bold"/> : null}
                </button>
                <h1
                    className={`${styles.content} ${classes.content}`}
                >
                    {text}
                </h1>
           </div>
            <button className={styles.delete} onClick={deleteTask}>
                <Trash size={24}/>
            </button>
        </article>
    )
}