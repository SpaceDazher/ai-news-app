import styles from './PostContent.module.css';

interface PostContentProps {
    text: string | null;
    isLoading: boolean;
    error: string | null;
}

export const PostContent = ({
    text,
    isLoading,
    error
}: PostContentProps) => {
    if (isLoading) return <div className={styles.loading}>Loading content...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!text) return <div className={styles.empty}>No content available</div>;

    return (
        <div className={styles.content}>
            <pre>{text}</pre>
        </div>
    );
};
