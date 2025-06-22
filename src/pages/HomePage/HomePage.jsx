import { useState, useEffect } from 'react';
import CourseCard from '../../components/CourseCard/CourseCard';
import { getAllCourses } from '../../api/courses';
import './HomePage.css';

function HomePage() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAllCourses()
            .then(data => {
                setCourses(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className="home-page">
            <h2>Доступные курсы</h2>
            {loading ? (
                <div>Загрузка курсов...</div>
            ) : (
                <div className="courses-grid">
                    {courses.map(course => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default HomePage;