
import React, {useEffect, useRef, useState} from "react";
import '../styles/App.css'

import PostList from "../components/postList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import {usePosts} from "../components/hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import {useFetching} from "../components/hooks/useFetching";
import {getPageCount} from "../utils/pages"; //, getPagesArray
import Pagination from "../components/UI/pagination/Pagination";
import {useObserver} from "../components/hooks/useObserver";
import MySelect from "../components/UI/select/mySelect";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const lastElement = useRef();
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

    const [fetchPosts, isPostsLoading, postError] = useFetching( async() => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data]);
        const totalCount = response.headers['x-total-count'];
        setTotalPages(getPageCount(totalCount, limit));
    });


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page+1);
    })



    useEffect(() => {
        fetchPosts(limit,page).then(r => r);
    }, [page, limit])


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const changePage = (page) => {
        setPage(page);
        fetchPosts(limit, page).then(r => r);
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
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Количество элементов на странице"
                options={[
                    {value: 1, name:'1'},
                    {value: 5, name:'5'},
                    {value: 10, name:'10'},
                    {value: 25, name:'25'},
                    {value: -1, name:'Show all...'},
                ]}

            />


            {postError &&
                <h1>Произошла ошибка: ${postError}!</h1>
            }
            <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты:"/>
            <div ref={lastElement} style={{height: 20, backgroundColor: 'none'}}></div>
            {isPostsLoading &&
                <div className="loader"> <Loader/> </div>
            }



            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />

        </div>
    );
}

export default Posts;
