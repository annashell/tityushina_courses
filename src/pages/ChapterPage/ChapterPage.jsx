import {useParams} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';
import {getCourseDetails} from '../../api/courses';
import './ChapterPage.css';
import SideMenu from "../../components/SideMenu/SideMenu";

function ChapterPage() {
    const {courseId, chapterId} = useParams();
    const [chapter, setChapter] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const contentRef = useRef(null);
    const [mathJaxLoaded, setMathJaxLoaded] = useState(false);

    // Загрузка MathJax
    useEffect(() => {
        if (window.MathJax) {
            setMathJaxLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
        script.id = 'MathJax-script';
        script.async = true;

        script.onload = () => {
            window.MathJax = {
                tex: {
                    inlineMath: [['$', '$'], ['\\(', '\\)']],
                    packages: {'[+]': ['base', 'ams', 'newcommand']}
                },
                options: {
                    enableMenu: false
                },
                startup: {
                    pageReady: () => {
                        setMathJaxLoaded(true);
                        return window.MathJax.startup.defaultPageReady();
                    }
                }
            };
        };

        document.head.appendChild(script);

        return () => {
            const script = document.getElementById('MathJax-script');
            if (script) document.head.removeChild(script);
        };
    }, []);

    // Рендеринг формул после загрузки контента и MathJax
    useEffect(() => {
        if (!mathJaxLoaded || !contentRef.current) return;

        const renderMath = async () => {
            try {
                await window.MathJax.typesetPromise([contentRef.current]);
            } catch (error) {
                console.error('MathJax rendering error:', error);
                // Повторная попытка через 500мс
                setTimeout(() => {
                    if (window.MathJax) {
                        window.MathJax.typesetPromise([contentRef.current]);
                    }
                }, 500);
            }
        };

        renderMath();
    }, [mathJaxLoaded, content]); // Добавьте ваш контент в зависимости

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
            <div className="chapter-page-content">
                <h2>{chapter.title}</h2>
                <div className="chapter-content"
                     dangerouslySetInnerHTML={{__html: content}}
                />
            </div>
        </div>
    );
}

export default ChapterPage;