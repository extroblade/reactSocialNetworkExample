import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import PostService from "../API/PostService";
import {useFetching} from "../components/hooks/useFetching";
import Loader from "../components/UI/Loader/Loader";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching ( async(id) => {
        const response = await PostService.getById(id);
        setPost(response.data);
    })
    const[fetchComments, isComLoading, comError] = useFetching ( async(id) => {
        const response = await PostService.getCommentByPostID(id);
        setComments(response.data);
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchComments(params.id)
    }, [])

    return (
        <div className="post__section">
            <h3>Пост с ID: {params.id}</h3>
            {isLoading
                ? <Loader/>
                : <div className='post__content__inner'>{post.title}: {post.body}</div> //crushes with uppercase
            }

            <h3>Комментарии:</h3>
            {isComLoading
                ? <Loader/>
                : <div>
                    {comments.map( comment =>
                        <div key={comment.id} className='comments'>
                            <h5>{comment.email.toUpperCase()}: {comment.name.toUpperCase()}</h5>
                            <div>{comment.body}</div>
                        </div>
                    )}
                </div>
            }

        </div>
    );
};

export default PostIdPage;