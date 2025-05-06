import styles from "./page.module.css";
import avatar from '../public/avatar.png'
import background from '../public/background.png'
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/app/modules/navigation";

export default function Home() {
    const articles = [
        { id: 1, title: "们社科女也有春天。。" },
        // { id: 2, title: "前端秋招指北" },
        // { id: 3, title: "八股（困难版）之JS" },
        // { id: 4, title: "八股（困难版）之CSS" },
        // { id: 5, title: "八股（困难版）之React" },
        // { id: 6, title: "八股（困难版）之Vue" },
        // { id: 7, title: "八股（困难版）之Webpack" },
        // { id: 8, title: "八股（困难版）之网络" },
        // { id: 9, title: "八股（困难版）之计算机基础" },
        // { id: 10, title: "八股（困难版）之手写代码和看输出" },
        // { id: 11, title: "八股（困难版）之浏览器" },
        // { id: 12, title: "八股（困难版）之性能优化" },
        // { id: 16, title: "最近从中感受到能量的一些句子" },
    ]
    return (
        <div className={styles.app}>
            <div className='top'>
                <div>
                    <Image src={background} alt={'background'} className={styles.background}/>
                </div>
                <div className={styles.info}>
                    <div className={styles.info1}>
                        <div>
                            <Image className={styles.avatar} src={avatar} alt={'avatar'}/>
                        </div>
                        <div>
                            <div className={styles.name}>windywendyday</div>
                            <p className={styles.text}>前端开发🧸</p>
                            <p className={styles.text}>本硕 HUST 传播学</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.main}>
                <div style={{marginTop: '1.25rem'}}>
                    <Navigation />
                </div>
                <div className={styles.list}>
                    <ul>
                        {
                            articles.map(article => (
                                <li key={article.id} className={styles.listItem}>
                                    <Link href={`/articles/${article.id}`}> {article.title}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}
