import styles from "../contact/style.module.css";
import Navigation from "@/app/modules/navigation";
import Image from "next/image";
import githubIcon from "@/public/githubIcon.svg";
import insIcon from "@/public/insIcon.svg";

export default function ContactPage() {
    return(
        <div className={styles.bg}>
            <div className={styles.navigation}>
                <Navigation/>
            </div>
            <div className={styles.page}>
                <div></div>
                <div className={styles.main}>
                    <h1>找到我🙋🏻‍♀️</h1>
                    <div className={styles.iconsAndEmail}>
                        <ul className={styles.icons}>
                            <li style={{marginLeft: '0.5rem'}}>
                                <a href='https://github.com/windywendyday'>
                                    <Image src={githubIcon} alt={'github'} width={40} />
                                </a>
                            </li>
                            <li style={{marginLeft: '2rem'}}>
                                <a href='https://www.instagram.com/twinklery_'>
                                    <Image src={insIcon} alt={'instagram'} width={40} />
                                </a>
                            </li>
                        </ul>
                        <div>
                            <a href={'mailto: tankeyi2001@163.com'}>
                                Email：tankeyi2001@163.com
                            </a>
                            <div>
                                Wechat：tankeyi_
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    )
}