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
            <div className='navbar '>
                <div onClick={logout} className='navbar__links'> Выйти  </div>

                <div>
                    <Link to="/about" className='navbar__links'>О сайте </Link>
                </div>

                <div>
                    <Link to="/posts" className='navbar__links'>Посты</Link>
                </div>
            </div>
            :
            <div className='navbar '>

                <div>
                    <Link to="/about" className='navbar__links'>О сайте </Link>
                </div>

                <div>
                    <Link to="/posts" className='navbar__links'>Посты</Link>
                </div>
            </div>

    );
};

export default Navbar;