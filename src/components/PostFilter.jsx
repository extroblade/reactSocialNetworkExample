import React from 'react';
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/mySelect";
import '../styles/App.css'

const PostFilter = ({filter, setFilter}) => {
    return (

        <div>
            <MyInput
                value={filter.query}
                onChange={e => setFilter({...filter, query: e.target.value})}
                placeholder="Поиск..."
            />

            <MySelect
                className="sorter"
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="Сортировка"
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                    {value: '', name: 'По айди'},
                ]}
            />
        </div>
    );
};

export default PostFilter;