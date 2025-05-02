import styles from "./modules.module.css";
import Link from "next/link";

export default function Navigation(){
    return (
        <div>
            <nav className={styles.nav}>
                <div className={styles.buttons}>
                    <Link href={'/'}>Articles</Link>
                    <div></div>
                </div>
                <div className={styles.buttons} style={{marginLeft: '2rem'}}>
                    <Link href={'/profile'}>Profile</Link>
                    <div></div>
                </div>
                <div className={styles.buttons} style={{marginLeft: '2rem'}}>
                    <Link href={'/contact'}>Contact</Link>
                    <div></div>
                </div>
            </nav>
        </div>
    )
}