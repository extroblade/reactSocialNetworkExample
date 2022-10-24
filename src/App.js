
import React, {useEffect, useState} from "react";
import './styles/App.css'

import PostList from "./components/postList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./components/hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
        const posts = await PostService.getAll();
        setPosts(posts);
    });
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useEffect(() => {
        fetchPosts();
    }, [])


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }


  return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
            Создать пост
        </MyButton>

        <MyModal visible={modal} setVisible={setModal}>
            <PostForm create={createPost}/>
        </MyModal>

        <hr style={{margin: '15px 0'}}/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        {postError &&
            <h1>Произошла ошибка ${postError}</h1>
        }
        {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}> <Loader/> </div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты"/>
        }

    </div>
  );
}

export default App;
