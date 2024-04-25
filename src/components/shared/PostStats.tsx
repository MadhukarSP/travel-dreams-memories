import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
    post?: Models.Document;
    userId: string;
}

const PostStats = ({ post, userId }: PostStatsProps) => {
    const likesList = post?.likes.map((user: Models.Document) => user.$id);

    const [likes, setLikes] = useState(likesList);
    const [isSaved, setIsSaved] = useState(false);

    const { mutate: likePost } = useLikePost();
    const { mutate: savePost, isPending: isSavingPost } = useSavePost();
    const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } = useDeleteSavedPost();
    const { data: user } = useGetCurrentUser();
    const savedPostRecord = user?.save.find((record: Models.Document) => record.post?.$id === post?.$id);

    useEffect(() => {
        setIsSaved(!!savedPostRecord);
    }, [user]);

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation();

        let newLikes = [...likes];

        const hasLiked = newLikes.includes(userId);

        if (hasLiked) {
            newLikes = newLikes.filter((id: string) => id !== userId);
        } else {
            newLikes.push(userId);
        }

        setLikes(newLikes);
        likePost({ postId: post?.$id || "", likesArray: newLikes });
    }

    const handleSavePost = (e: React.MouseEvent) => {
        e.stopPropagation();



        if (savedPostRecord) {
            deleteSavedPost(savedPostRecord.$id);
            setIsSaved(false);
        } else {
            savePost({ postId: post?.$id || "", userId });
            setIsSaved(true);
        }
    }

    return (
        <div className="flex justify-between items-center z-20">
            <div className="flex gap-2 mr-5">
                <img
                    src={`/assets/icons/${checkIsLiked(likes, userId) ? 'liked' : 'like'}.svg`}
                    alt="like"
                    width={20}
                    height={20}
                    onClick={handleLikePost}
                    className="cursor-pointer"
                />
                <p className="small-medium lg:big-medium">{likes.length}</p>
            </div>

            <div className="flex gap-2">
                {
                    isSavingPost || isDeletingSavedPost ? <Loader /> : <img
                        src={`/assets/icons/${isSaved ? 'saved' : 'save'}.svg`}
                        alt="save"
                        width={20}
                        height={20}
                        onClick={handleSavePost}
                        className="cursor-pointer"
                    />

                }

            </div>
        </div>
    )
}

export default PostStats