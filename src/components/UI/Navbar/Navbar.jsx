import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context/context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }

    return (
        isAuth
            ?
            <div className='navbar'>
                <MyButton onClick={logout}> Выйти  </MyButton>
                <div className='navbar__links'>
                    <Link to="/about">О сайте </Link>
                    <Link to="/posts">Посты</Link>
                </div>
            </div>
            :
            <div className='navbar'>
                <div className='navbar__links'>
                <Link to="/about">О сайте </Link>
                <Link to="/posts">Посты</Link></div>
            </div>

    );
};

export default Navbar;