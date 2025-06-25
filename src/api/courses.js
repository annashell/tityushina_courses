const coursesData = [
    {
        id: 'linear_models',
        title: "Линейные модели и фильтры",
        description: "3 курс",
        chapters: [
            { id: 1, title: "Простая гармоника и гармонический сигнал. Колебание струны. Тембр.", filename: "lm_1.html" },
            { id: 2, title: "Цифровой и аналоговый сигнал. Дискретизация. Частота Найквиста.", filename: "lm_2.html" },
            { id: 3, title: "Действительное разложение в ряд Фурье", filename: "lm_3.html" },
            { id: 4, title: "Комплексный ряд Фурье", filename: "lm_4.html" },
            { id: 5, title: "Дискретное преобразование Фурье", filename: "lm_5.html" },
            { id: 6, title: "Быстрое преобразование Фурье", filename: "lm_6.html" },
            { id: 7, title: "Интегральное преобразование Фурье", filename: "lm_7.html" },
            { id: 8, title: "Окна и свёртки", filename: "lm_8.html" },
            { id: 9, title: "Корреляция и автокорреляция", filename: "lm_9.html" },
            { id: 10, title: "Линейные системы и их свойства", filename: "lm_10.html" },
            { id: 11, title: "БИХ и КИХ фильтры", filename: "lm_11.html" },
            { id: 12, title: "Разностные уравнения для линейных систем", filename: "lm_12.html" },
            { id: 13, title: "z-преобразование", filename: "lm_13.html" },
            { id: 14, title: "Дискретное преобразование Фурье и круговая свёртка", filename: "lm_14.html" },
            { id: 15, title: "Проектирование фильтров", filename: "lm_15.html" },
            { id: 16, title: "Модуляция и демодуляция", filename: "lm_16.html" },
            { id: 17, title: "Шумы", filename: "lm_17.html" },
            { id: 18, title: "Преобразование частоты дискретизации", filename: "lm_18.html" },
            { id: 19, title: "Параметрический синтез", filename: "lm_18.html" },
            { id: 99, title: "Вопросы к экзамену", filename: "exam_questions.html" },
            // ... другие главы
        ]
    },
    {
        id: 'dsp',
        title: "Цифровая обработка сигналов",
        description: "4 курс",
        chapters: [
            { id: 1, title: "1 тема", filename: "dsp_1.html" },
            { id: 2, title: "2 тема", filename: "dsp_2.html" },
            // ... другие главы
        ]
    },
    // ... другие курсы
];

export const getAllCourses = () => {
    return Promise.resolve(coursesData);
};

export const getCourseDetails = (courseId) => {
    const course = coursesData.find(c => c.id === courseId);
    return course ? Promise.resolve(course) : Promise.reject("Course not found");
};

export const getCourseContent = (courseId) => {
    console.log('Fetching content for course:', courseId);
    const course = coursesData.find(c => c.id === courseId);
    return course ? Promise.resolve({ chapters: course.chapters }) : Promise.reject("Course not found");
};