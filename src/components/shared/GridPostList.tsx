import { useUserContext } from '@/context/AuthContext'
import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import PostStats from './PostStats';

type GridPostListProps = {
    posts?: Models.Document[];
    showUser?: boolean;
    showStats?: boolean;
}

const GridPostList = ({ posts, showUser = true, showStats = true }: GridPostListProps) => {
    const { user } = useUserContext();

    if (!posts?.length) return null;

    return (
        <ul className='grid-container'>
            {
                posts.map(post => (
                    <li className='relative min-w-80 h-80' key={post.$id}>
                        <Link to={`/posts/${post.$id}`} className='grid-post_link'>
                            <img
                                src={post.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="post img"
                                className="w-full h-full object-cover" />
                        </Link>
                        <div className='grid-post_user'>
                            {showUser && (
                                <div className="flex justify-start items-center gap-2 flex-1">
                                    <img src={post.creator.imageUrl}
                                        alt="creator"
                                        className='h-8 w-8 rounded-full'
                                    />
                                    <p className='line-clamp-1'>{post.creator.name}</p>
                                </div>
                            )}
                            {showStats && (
                                <PostStats post={post} userId={user.id} />
                            )}
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default GridPostList