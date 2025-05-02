import Navigation from "@/app/modules/navigation";
import styles from './style.module.css';
import Image from "next/image";
import pics2 from '@/public/pics2.jpg'
import Link from "next/link";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";
import Timeline from "@/app/modules/timeline/timeline";

const getPostData = async function () {
    const fileContents = fs.readFileSync('/Users/tankeyi/WebstormProjects/mynewwebsite/app/articles/markdownArticles/text1.md', 'utf8');

    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
        contentHtml,
        ...matterResult.data,
    };
}

async function Profile() {
    const tags = [
        {key: 1, text: 'ISTJ'},
        {key: 2, text: '学文科的理科生'},
        {key: 3, text: 'HUST本硕'},
        {key: 4, text: '无孩养猫女'},
        {key: 5, text: '星露谷900+小时'},
    ]
    const article = [
        {id: 13, title: 'Playlist🤍'},
        {id: 14, title: 'Ideas📎'},
        {id: 15, title: 'ReadingAndThinking📚'},
    ]
    const postData = await getPostData();

    return (
        <div className={styles.bg}>
            <div className={styles.navigation}>
                <Navigation />
            </div>
            <div className={styles.personalInfo}>
                <div className={styles.title}>
                    {/*图标*/}
                    <p className={styles.p}>我的生命是一万次的春和景明🩵</p>
                    <div className={styles.tags}>
                        {/*椭圆形小标签*/}
                        {
                            tags.map(tag => (
                                <div key={tag.key} className={styles.tag}>
                                    {tag.text}
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className={styles.picAndTags}>
                    <div className={styles.pic}>
                        <Image src={pics2} alt={'personal pics'} height={480} style={{borderRadius: '8px'}}/>
                    </div>

                </div>
            </div>
            <div className={styles.paragraph}>
                <div className={styles.paragraphContent}>
                    <Timeline />
                    <div className={styles.text}>
                        <div dangerouslySetInnerHTML={{__html: postData.contentHtml}}></div>
                    </div>
                </div>
                <div className={styles.sideNav}>
                    {
                        article.map((article) => (
                            <div key={article.id} className={styles.sideNavItems}>
                                <Link href={`/articles/${article.id}`}>{article.title}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default Profile;