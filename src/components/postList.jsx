import React from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Loader from "./UI/Loader/Loader";

const PostList = ({posts, title, remove}) => {

    if(!posts.length){ //проверка наличия постов
        return
    }

    return (
        <div>
            <h1 style={{textAlign: 'center', marginTop:'10px'}}>
                {title}
            </h1>

            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItem
                            remove={remove}
                            number = {index+1}
                            post={post}
                            key={post.id}
                        />
                    </CSSTransition>
                )}
            </TransitionGroup>

        </div>
    );
};

export default PostList;