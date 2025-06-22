import { Link } from 'react-router-dom';
import './CourseCard.css';
import SideMenu from "../SideMenu/SideMenu";

function CourseCard({ course }) {
    return (
        <div className="course-card">
            <SideMenu />
            <div>
                <Link to={`/course/${course.id}`}>
                    <h3>{course.title}</h3>
                    <h4>{course.description}</h4>
                </Link>
            </div>
        </div>
    );
}

export default CourseCard;