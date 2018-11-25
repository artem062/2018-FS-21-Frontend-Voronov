import React from 'react';
import { Link } from 'react-router-dom';

const header = () => (
    <ul>
        <li>
            <Link to='/'>Главная</Link>
        </li>
        <li>
            <Link to='/question'>Список вопросов</Link>
        </li>
        <li>
            <Link to='/question/add'>Задать вопрос</Link>
        </li>
        <li>
            <Link to='/answer/add'>Ответить</Link>
        </li>
    </ul>
);

export default header;