import styles from '../modules.module.css'

export default function TimelineHeader({ text }){
    return(
        <div className={styles.timelineHeader}>
            <span className={styles.timelineHeaderText}>{text}</span>
        </div>
    )
};