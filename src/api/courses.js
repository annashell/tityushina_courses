const coursesData = [
    {
        id: 1,
        title: "Линейные модели и фильтры",
        description: "3 курс",
        chapters: [
            { id: 1, title: "Простая гармоника и гармонический сигнал", filename: "lm_1.html" },
            { id: 2, title: "Цифровой сигнал, дискретизация", filename: "lm_2.html" },
            // ... другие главы
        ]
    },
    {
        id: 2,
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
    const course = coursesData.find(c => c.id === parseInt(courseId));
    return course ? Promise.resolve(course) : Promise.reject("Course not found");
};

export const getCourseContent = (courseId) => {
    console.log('Fetching content for course:', courseId);
    const course = coursesData.find(c => c.id === parseInt(courseId));
    return course ? Promise.resolve({ chapters: course.chapters }) : Promise.reject("Course not found");
};