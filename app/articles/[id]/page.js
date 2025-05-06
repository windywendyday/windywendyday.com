import { notFound } from 'next/navigation';
import styles from './page.module.css';

async function getArticle(id) {
    try {
        const filePath = `app/articles/markdownArticles/article${id}.md`;
        const fileContents = await import(`../../articles/markdownArticles/article${id}.md`);
        return {
            id,
            content: fileContents.default
        };
    } catch (error) {
        return null;
    }
}

export default async function ArticlePage({ params }) {
    const article = await getArticle(params.id);
    
    if (!article) {
        notFound();
    }

    return (
        <div className={styles.container}>
            <article className={styles.article}>
                {article.content}
            </article>
        </div>
    );
} 