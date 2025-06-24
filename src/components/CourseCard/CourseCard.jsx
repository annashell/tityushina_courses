import { Link } from 'react-router-dom';
import './CourseCard.css';
import SideMenu from "../SideMenu/SideMenu";

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <div>
                <Link to={`/course/${course.id}`} className="course-card-link">
                    <button className="course-card-button">
                        <h3>{course.title}</h3>
                        <h4>{course.description}</h4>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default CourseCard;