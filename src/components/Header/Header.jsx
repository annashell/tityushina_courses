import {Link} from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div>
                    <div className="header_uni">Санкт-Петербургский государственный университет</div>
                    <div className="header_chair">Кафедра фонетики и методики преподавания иностранных языков</div>
                    <div className="header-title">Учебные курсы</div>
                    <nav>
                        <Link to="/tityushina_courses" className="header-link">
                            <button className="header-button">
                                Все курсы
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="header_img_div">
                <img alt="" className="header_img" src={process.env.PUBLIC_URL + "/img/anteater.jpg"}></img>
                <div>© Титюшина Анна, 2025</div>
            </div>
        </header>
    );
}

export default Header;