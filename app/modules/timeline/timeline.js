import styles from '../modules.module.css';
import TimelineHeader from "@/app/modules/timeline/timelineHeader";
import TimelineItem from "@/app/modules/timeline/timelineItem";
export default function Timeline() {
    const textItems = [
        (
            <>
                <p className={styles.timelineItemTextSmall}>8月</p>
                <p style={{fontSize: '1.8rem'}}>👼🏻</p>
            </>
        ),
        (
            <>
                <p className={styles.timelineItemText}>小镇做题家 努力学习打怪升级🏃🏻‍♀️</p>
                <p className={styles.timelineItemTextSmall}> 考预科班、免中考、考外地生进入南宁三中 </p>
            </>
        ),
        (
            <>
                <p className={styles.timelineItemTextSmall}>9月</p>
                <p className={styles.timelineItemText}>🎓华中科技大学</p>
                <p className={styles.timelineItemTextSmall}>📍武汉</p>
                <p className={styles.timelineItemTextSmall}>新闻与信息传播学院 传播学本科</p>
            </>
        ),
        (
            <>
            <p className={styles.timelineItemTextSmall}>12月</p>
                <p className={styles.timelineItemText}>微派-青藤之恋</p>
                <p className={styles.timelineItemTextSmall}>📍武汉</p>
                <p className={styles.timelineItemTextSmall}>产品经理实习生</p>
            </>
        ),
        (
            <>
            <p className={styles.timelineItemTextSmall}>5月</p>
                <p className={styles.timelineItemText}>Zoom</p>
                <p className={styles.timelineItemTextSmall}>📍合肥</p>
                <p className={styles.timelineItemTextSmall}>产品经理实习生</p>
            </>
        ),
        (
            <>
            <p className={styles.timelineItemTextSmall}>9月</p>
                <p className={styles.timelineItemText}>🎓华中科技大学</p>
                <p className={styles.timelineItemTextSmall}>📍武汉</p>
                <p className={styles.timelineItemTextSmall}>新闻与信息传播学院 传播学硕士</p>
            </>
        ),
        (
            <>
            <p className={styles.timelineItemTextSmall}>5月</p>
                <p className={styles.timelineItemText}>Cider</p>
                <p className={styles.timelineItemTextSmall}>📍广州</p>
                <p className={styles.timelineItemTextSmall}>前端开发实习生</p>
            </>
        ),
        (
            <>
            <p className={styles.timelineItemTextSmall}>7月</p>
                <p className={styles.timelineItemText}>美团</p>
                <p className={styles.timelineItemTextSmall}>📍北京</p>
                <p className={styles.timelineItemTextSmall}>前端开发工程师</p>
            </>
        ),
        (
            <>
                <p style={{lineHeight: '3rem'}}>✨💻🩵</p>
            </>
        ),
    ]
    let index = 0
    const timelines = [
        {
            id: 0,
            header: <TimelineHeader text={'2001'} key={0} />,
            item: <TimelineItem direction={'right'} textItem={textItems[index++]} key={1} />,
        },
        {
            id: 1,
            header: <TimelineHeader text={'...'} key={2} />,
            item: <TimelineItem direction={'left'} textItem={textItems[index++]} key={3} />,
        },
        {
            id: 2,
            header: <TimelineHeader text={'2019'} key={4} />,
            item: <TimelineItem direction={'right'} textItem={textItems[index++]} key={5} />,
        },
        {
            id: 3,
            header: <TimelineHeader text={'2022'} key={6} />,
            item: <TimelineItem direction={'left'} textItem={textItems[index++]} key={7} />,
        },
        {
            id: 4,
            header: <TimelineHeader text={'2023'} key={8} />,
            item: <TimelineItem direction={'right'} textItem={textItems[index++]} key={9} />,
        },
        {
            id: 5,
            // header: <TimelineHeader text={'2023'} key={10} />,
            item: <TimelineItem direction={'left'} textItem={textItems[index++]} key={11} />,
        },
        {
            id: 6,
            header: <TimelineHeader text={'2024'} key={12} />,
            item: <TimelineItem direction={'right'} textItem={textItems[index++]} key={13} />,
        },
        {
            id: 7,
            header: <TimelineHeader text={'2025'} key={14} />,
            item: <TimelineItem direction={'left'} textItem={textItems[index++]} key={15} />,
        },
        {
            id: 8,
            header: <TimelineHeader text={'...'} key={16} />,
            item: <TimelineItem direction={'right'} textItem={textItems[index++]} key={17} />,
        },
        {
            id: 9,
            header: <TimelineHeader text={'🪽'} key={14} />,
        },
    ]

    return (
        <div className={styles.timeline}>
            {
                timelines.map((item, index) => (
                    <div key={item.id}>
                        {item.header}
                        {item.item}
                    </div>
                ))
            }
        </div>
    )
}