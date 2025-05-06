import { notFound } from 'next/navigation';
import styles from './page.module.css';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

async function getArticle(id) {
    try {
        const filePath = path.join(process.cwd(), 'app/articles/markdownArticles', `article${id}.md`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        
        const matterResult = matter(fileContents);
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
            id,
            contentHtml,
            ...matterResult.data
        };
    } catch (error) {
        return null;
    }
}

export default async function ArticlePage({ params }) {
    const { id } = await params;
    const article = await getArticle(id);
    
    if (!article) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
            </article>
        </div>
    );
} 