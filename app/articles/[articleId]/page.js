// 'use client'
// import {useParams} from "next/navigation";
import Navigation from "@/app/modules/navigation";
import styles from "./style.module.css";
import fs from "fs";
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

const getArticleData = async function (articleId) {
    const fileContents = fs.readFileSync(`/Users/tankeyi/WebstormProjects/mynewwebsite/app/articles/markdownArticles/article${articleId}.md`, 'utf8');

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

export default async function Page({ params : {articleId} }) {
    console.log(articleId)
    const articleData = await getArticleData(articleId);
    return(
        <div className={styles.article}>
            <div className={styles.articleNav}>
                <Navigation />
            </div>
            <div className={styles.articleContent}>
                <div></div>
                <div dangerouslySetInnerHTML={{__html: articleData.contentHtml}}></div>
                <div></div>
            </div>
        </div>
    )
}