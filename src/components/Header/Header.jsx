import {Link} from 'react-router-dom';
import './Header.css';

function Header() {
    return (
        <header className="header">
            <div className="header-container">
                <div>
                    <h2>Учебные курсы</h2>
                    <nav>
                        <Link to="/" className="nav-link">
                            Все курсы
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="header_img_div">
                <img alt="" className="header_img" src={process.env.PUBLIC_URL + "/img/anteater.jpg"}></img>
            </div>
        </header>
    );
}

export default Header;