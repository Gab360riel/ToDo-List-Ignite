import styles from './EmptyTasks.module.css'

import clipboard from '../../assets/clipboard.svg'
import { Separator } from '../Separator'

export function EmptyTasks() {
    return(
        <div>
            <Separator />
            <div className={styles.container} >
                <img src={clipboard} />
                <h1 className={styles.boldText}>
                    Você ainda não tem tarefas cadastradas 
                </h1>
                <h1 className={styles.lighterText}>
                    Crie tarefas e organize seus itens a fazer
                </h1>
            </div>
        </div>
    )
}