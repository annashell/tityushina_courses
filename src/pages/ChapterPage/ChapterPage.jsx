import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getCourseDetails } from '../../api/courses';
import './ChapterPage.css';
import SideMenu from "../../components/SideMenu/SideMenu";

function ChapterPage() {
    const { courseId, chapterId } = useParams();
    const [chapter, setChapter] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Загружаем метаданные главы
        getCourseDetails(courseId)
            .then(course => {
                const foundChapter = course.chapters.find(ch => ch.id === parseInt(chapterId));
                if (!foundChapter) {
                    throw new Error('Chapter not found');
                }
                setChapter(foundChapter);

                // Загружаем HTML-контент из public
                return fetch(`${process.env.PUBLIC_URL}/courses/${courseId}/${foundChapter.filename}`);
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to load chapter content');
                return response.text();
            })
            .then(html => {
                setContent(html);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [courseId, chapterId]);

    if (loading) return <div className="loading">Загрузка главы...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (!chapter) return <div className="error">Глава не найдена</div>;

    return (
        <div className="chapter-page">
            <SideMenu/>
            <h2>{chapter.title}</h2>
            <div
                className="chapter-content"
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
    );
}

export default ChapterPage;