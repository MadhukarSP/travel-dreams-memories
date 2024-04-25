import { useUserContext } from "@/context/AuthContext";
import { timeAgo } from "@/lib/utils";
import { Models } from "appwrite";
import { Link } from "react-router-dom";
import PostStats from "./PostStats";

type PostCardProps = {
    post: Models.Document;
}


const PostCard = ({ post }: PostCardProps) => {
    const { user } = useUserContext();

    if (!post.creator) return null;

    return (
        <div className="post-card">
            <div className="flex-between">
                <div className="flex items-center gap-3">
                    <Link to={`/profile/${post.creator.$id}`}>
                        <img
                            src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="creator"
                            className="w-12 lg:h-12 rounded-full" />
                    </Link>
                    <div className="flex flex-col gap-0">
                        <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                        <div className="flex-center gap-2 text-light-3">
                            <p className="subtle-semibold lg:small-regular">{timeAgo(post.$createdAt)}</p>
                            {" - "}
                            <p className="subtle-semibo;d lg:small-regular">{post.location}</p>
                        </div>
                    </div>
                </div>
                <Link to={`/update-post/${post.$id}`}
                    className={`${user.id !== post.creator.$id && 'hidden'}`}>
                    <img src="/assets/icons/edit.svg" alt="edit" width={20} />
                </Link>
            </div>
            <Link to={`/posts/${post.$id}`}>
                <div className="small-medium lg:base-medium py-5">
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                        {post.tags.map((tag: string) => (
                            <li key={tag} className="text-light-3">
                                #{tag}
                            </li>
                        ))}
                    </ul>
                </div>
                <img
                    src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt="post img"
                    className="post-card_img w-full"
                />
            </Link>
            <PostStats post={post} userId={user.id} />
        </div>
    )
}

export default PostCard