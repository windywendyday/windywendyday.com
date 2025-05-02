import styles from '../modules.module.css'

export default function TimelineItem({ direction, textItem }) {
    return(
        <div className={[`${styles.timelineItem}`, `${direction === 'right' ? styles.timelineItemRight : styles.timelineItemLeft}`].join(' ')}>
            <div className={`${direction === 'right' ? styles.contentRight : styles.contentLeft}`}>
                {textItem}
            </div>
        </div>
    )
}