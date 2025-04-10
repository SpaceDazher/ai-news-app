import { IPostPreview } from '@/entities/post/model/types';
import styles from './PostList.module.css';

interface PostListProps {
    posts: IPostPreview[];
    isLoading: boolean;
    error: string | null;
    selectedPostId: string | null;
    onSelectPost: (postId: string) => void;
}

export const PostList = ({
    posts,
    isLoading,
    error,
    selectedPostId,
    onSelectPost
}: PostListProps) => {
    if (isLoading) return <div className={styles.loading}>Loading posts...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!posts.length) return <div className={styles.empty}>No posts found</div>;

    return (
        <div className={styles.list}>
            {posts.map(post => (
                <div 
                    key={post._id}
                    className={`${styles.item} ${post._id === selectedPostId ? styles.selected : ''}`}
                    onClick={() => onSelectPost(post._id)}
                >
                    <h3 className={styles.title}>{post.title || 'Untitled post'}</h3>
                    <div className={styles.date}>
                        {new Date(post.publicationDate).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
};
