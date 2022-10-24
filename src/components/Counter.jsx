import React, {useState} from 'react';

const Counter = function (){
    const [count, setCount] = useState(0);

    function increment(){
        setCount(count+1);
    }

    function decrement(){
        count > 0 ? setCount(count-1) : console.log();
    }
    return(
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>Like</button>
            <button onClick={decrement}>Dislike</button>
        </div>
    )
};

export default Counter;