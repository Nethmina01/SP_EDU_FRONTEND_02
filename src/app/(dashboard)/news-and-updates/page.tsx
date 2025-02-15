import styles from './NewsAndUpdates.module.css';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
}

const newsData: NewsItem[] = [
  { id: 1, title: 'News 1', content: 'Content for news 1', date: '2023-01-01' },
  { id: 2, title: 'News 2', content: 'Content for news 2', date: '2023-02-01' },
  { id: 3, title: 'News 3', content: 'Content for news 3', date: '2023-03-01' },
];

export default function NewsAndUpdatesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>News and Updates</h1>
      <div className={styles.newsList}>
        {newsData.map(item => (
          <div key={item.id} className={styles.newsItem}>
            <h2 className={styles.newsTitle}>{item.title}</h2>
            <p className={styles.newsContent}>{item.content}</p>
            <p className={styles.newsDate}><small>{item.date}</small></p>
          </div>
        ))}
      </div>
    </div>
  );
}
