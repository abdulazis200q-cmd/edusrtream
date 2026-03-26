// Supabase — данные для инициализации клиента.
// На GitHub Pages мы инициализируем клиент в `index.html` как window.supabaseClient (через ESM),
// а тут делаем "ленивую" подхватку, чтобы порядок загрузки скриптов не ломал авторизацию.
const supabaseUrl = 'https://jainlwexceuvkhvysyjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaW5sd2V4Y2V1dmtodnlzeWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjU0NTAsImV4cCI6MjA4OTM0MTQ1MH0.AkndWHxj_pANu48U5kKcSUkPhbnrNyHsVZlIxlhDFw4';

let supabaseClient = null;

function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    if (typeof window === 'undefined') return null;

    // В идеале — подхватываем то, что создал index.html
    if (window.supabaseClient) {
        supabaseClient = window.supabaseClient;
        return supabaseClient;
    }

    // На всякий случай: если вдруг где-то используется UMD
    if (window.supabase && typeof window.supabase.createClient === 'function') {
        supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);
        return supabaseClient;
    }

    return null;
}

// Данные студентов на основе предоставленной ведомости (локально для тестов, не в Supabase!)
const students = [
    { id: 1, name: "Адылбеков Адылбий", email: "student1@edustream.ru", username: "student1", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 4.0, absences: 2, courses: ["Python", "Базы данных"] },
    { id: 2, name: "Алиев Амир", email: "student2@edustream.ru", username: "student2", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 3.5, absences: 1, courses: ["Python", "Веб-разработка"] },
    { id: 3, name: "Алиев Шамиль", email: "student3@edustream.ru", username: "student3", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 3.2, absences: 0, courses: ["Базы данных"] },
    { id: 4, name: "Алмазбеков Ислам", email: "student4@edustream.ru", username: "student4", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 3.8, absences: 3, courses: ["Python"] },
    { id: 5, name: "Баги Абдурауф", email: "student5@edustream.ru", username: "student5", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 4.1, absences: 1, courses: ["Python", "Веб-разработка"] },
    { id: 6, name: "Багиев Абдулазис", email: "student6@edustream.ru", username: "student6", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 4.8, absences: 2, courses: ["Базы данных", "Веб-разработка"] },
    { id: 7, name: "Бакуменко Руслан", email: "student7@edustream.ru", username: "student7", password: "password123", group: "БИН-2024-1", role: "student", avgGrade: 4.3, absences: 0, courses: ["Python"] },
    { id: 8, name: "Бешанбекова Жанетта", email: "student8@edustream.ru", username: "student8", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.5, absences: 4, courses: ["Базы данных"] },
    { id: 9, name: "Кубезов Азис", email: "student9@edustream.ru", username: "student9", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.7, absences: 1, courses: ["Python", "Веб-разработка"] },
    { id: 10, name: "Кушматов Дилержон", email: "student10@edustream.ru", username: "student10", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.2, absences: 2, courses: ["Веб-разработка"] },
    { id: 11, name: "Кыдырмаев Искендер", email: "student11@edustream.ru", username: "student11", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.4, absences: 0, courses: ["Python", "Базы данных"] },
    { id: 12, name: "Люшисан Абдулхалим", email: "student12@edustream.ru", username: "student12", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.0, absences: 5, courses: ["Веб-разработка"] },
    { id: 13, name: "Маматов Абдуназим", email: "student13@edustream.ru", username: "student13", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.6, absences: 0, courses: ["Python", "Веб-разработка"] },
    { id: 14, name: "Ниязкулов Джалиль", email: "student14@edustream.ru", username: "student14", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.1, absences: 3, courses: ["Python"] },
    { id: 15, name: "Нуралиев Сыймыкбек", email: "student15@edustream.ru", username: "student15", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 3.9, absences: 1, courses: ["Базы данных"] },
    { id: 16, name: "Нурлаев Сергей", email: "student16@edustream.ru", username: "student16", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.2, absences: 2, courses: ["Веб-разработка"] },
    { id: 17, name: "Синяева Ульяна", email: "student17@edustream.ru", username: "student17", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.9, absences: 1, courses: ["Python", "Базы данных"] },
    { id: 18, name: "Турсубекова Жамиля", email: "student18@edustream.ru", username: "student18", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.4, absences: 3, courses: ["Веб-разработка"] },
    { id: 19, name: "Усенов Азизбек", email: "student19@edustream.ru", username: "student19", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 3.7, absences: 0, courses: ["Python"] },
    { id: 20, name: "Усонбеков Адил-хан", email: "student20@edustream.ru", username: "student20", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.5, absences: 2, courses: ["Базы данных"] },
    { id: 21, name: "Шодиев Махмуд", email: "student21@edustream.ru", username: "student21", password: "password123", group: "БИН-2024-2", role: "student", avgGrade: 4.8, absences: 1, courses: ["Python", "Веб-разработка"] },
    { id: 22, name: "Петр Петров", email: "teacher1@edustream.ru", username: "teacher1", password: "password123", group: "N/A", role: "teacher", avgGrade: null, absences: null }
];

let currentUser = null;
let gradesLog = [];
let attendanceLog = [];
let onlineStudents = new Set();

// --- СИСТЕМА РЕАЛЬНОГО ВРЕМЕНИ (ПРОВЕРКА ОНЛАЙНА) ---
setInterval(() => {
    if (currentUser) {
        // Твой аккаунт всегда онлайн в системе
        onlineStudents.add(currentUser.id);

        // Имитация случайных заходов других студентов
        students.forEach(s => {
            if (s.id !== currentUser.id && s.role === 'student') {
                if (Math.random() > 0.98) { 
                    if (onlineStudents.has(s.id)) {
                        onlineStudents.delete(s.id);
                        s.lastSeen = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                    } else {
                        onlineStudents.add(s.id);
                        s.lastSeen = "Сейчас";
                    }
                }
            }
        });

        if (currentUser.role === 'teacher') {
            renderStudentsTable();
        }
    }
}, 3000);

// --- ОСНОВНЫЕ ФУНКЦИИ ---

function loginUser(user) {
    currentUser = user;
    onlineStudents.add(user.id);
    user.lastSeen = "Сейчас";

    const authScreen = document.getElementById('auth-screen');
    const appContainer = document.getElementById('app-container');
    if (authScreen) authScreen.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';

    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    if (userName) userName.innerText = `${user.name} (${user.role === 'student' ? 'Студент' : 'Преподаватель'})`;
    if (userAvatar) userAvatar.innerText = (user.name || '').charAt(0);

    const studentNav = document.getElementById('student-nav');
    const teacherNav = document.getElementById('teacher-nav');
    if (user.role === 'teacher') {
        if (studentNav) studentNav.style.display = 'none';
        if (teacherNav) teacherNav.style.display = 'flex';
        loadStudentsList();
        loadGradesLog();
        loadAttendanceLog();
        showSection('students');
    } else {
        if (studentNav) studentNav.style.display = 'flex';
        if (teacherNav) teacherNav.style.display = 'none';
        loadStudentData();
        showSection('dashboard');
    }
}

function logout() {
    if (currentUser) {
        onlineStudents.delete(currentUser.id);
        currentUser.lastSeen = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    currentUser = null;
    supabaseClient = getSupabaseClient();
    if (supabaseClient && supabaseClient.auth && supabaseClient.auth.signOut) supabaseClient.auth.signOut().catch(() => {});
    const authScreen = document.getElementById('auth-screen');
    const appContainer = document.getElementById('app-container');
    if (authScreen) authScreen.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
}

function switchAuthForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    if (!loginForm || !registerForm) return;
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

function renderStudentsTable() {
    const body = document.getElementById('students-body');
    if (!body) return;

    body.innerHTML = students.filter(s => s.role === 'student').map(student => {
        const isOnline = onlineStudents.has(student.id);
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td><strong style="color: #667eea;">${student.avgGrade}</strong>/5</td>
                <td><span style="background: ${student.absences > 3 ? '#ff6b6b' : '#51cf66'}; color: white; padding: 4px 8px; border-radius: 6px;">${student.absences}</span></td>
                <td>
                    <span class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                        ${isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
                    </span>
                </td>
                <td style="font-size: 12px; color: #888;">
                    ${isOnline ? 'Сейчас' : (student.lastSeen || 'Давно')}
                </td>
            </tr>
        `;
    }).join(''); 
}

async function login() {
    const emailOrUsernameEl = document.getElementById('login-email');
    const passwordEl = document.getElementById('login-password');
    if (!emailOrUsernameEl || !passwordEl) {
        alert('⚠️ Форма входа не найдена!');
        return;
    }
    const emailOrUsername = emailOrUsernameEl.value.trim();
    const password = passwordEl.value;
    let supabaseLastError = null;

    if (!emailOrUsername || !password) {
        alert('⚠️ Заполните все поля!');
        return;
    }

    const localUser = students.find(s =>
        (s.email === emailOrUsername || s.username === emailOrUsername) && s.password === password
    );

    if (localUser) {
        loginUser(localUser);
        return;
    }

    supabaseClient = getSupabaseClient();
    if (supabaseClient) {
        try {
            let loginEmail = null;
            if (emailOrUsername.includes('@')) {
                loginEmail = emailOrUsername;
            }
            if (!loginEmail) {
                const { data: profileData, error } = await supabaseClient.from('profiles').select('email').eq('username', emailOrUsername).single();
                if (error) supabaseLastError = error.message;
                if (profileData && profileData.email) {
                    const { data, error } = await supabaseClient.auth.signInWithPassword({ email: profileData.email, password });
                    if (error) supabaseLastError = error.message;
                    if (!error && data && data.user) {
                        const { data: prof } = await supabaseClient.from('profiles').select('*').eq('id', data.user.id).single();
                        if (prof) { loginUser(profileToUser(prof)); return; }
                    }
                }
            } else {
                const { data, error } = await supabaseClient.auth.signInWithPassword({ email: loginEmail, password });
                if (error) supabaseLastError = error.message;
                if (!error && data && data.user) {
                    const { data: prof } = await supabaseClient.from('profiles').select('*').eq('id', data.user.id).single();
                    if (prof) { loginUser(profileToUser(prof)); return; }
                }
            }
        } catch (e) {
            console.error(e);
            supabaseLastError = (e && e.message) ? e.message : String(e);
        }
    }

    const reason = supabaseLastError ? ` Причина: ${supabaseLastError}` : '';
    alert('❌ Неверный email/username или пароль!' + reason);
}

function profileToUser(p) {
    // Защитим, если нет данных
    if (!p) return null;
    const user = {
        id: p.id,
        name: p.full_name || p.username,
        email: p.email,
        username: p.username,
        group: p.group || 'БИН-2024-1',
        role: p.role || 'student',
        avgGrade: p.avg_grade !== undefined ? p.avg_grade : 4.0,
        absences: p.absences !== undefined && p.absences !== null ? p.absences : 0,
        courses: Array.isArray(p.courses) ? p.courses : ['Python', 'Веб-разработка']
    };
    if (!students.find(s => s.id === user.id)) students.push(user);
    return user;
}

async function register() {
    const nameEl = document.getElementById('register-name');
    const emailEl = document.getElementById('register-email');
    const usernameEl = document.getElementById('register-username');
    const passwordEl = document.getElementById('register-password');
    const passwordConfirmEl = document.getElementById('register-password-confirm');

    // Защитим от отсутствия нужных элементов
    if (!nameEl || !emailEl || !usernameEl || !passwordEl || !passwordConfirmEl) {
        alert('⚠️ Форма регистрации не найдена!');
        return;
    }

    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    const passwordConfirm = passwordConfirmEl.value;

    if (!name || !email || !username || !password || !passwordConfirm) {
        alert('⚠️ Заполните все поля!');
        return;
    }

    if (password !== passwordConfirm) {
        alert('⚠️ Пароли не совпадают!');
        return;
    }

    if (students.find(s => s.email === email || s.username === username)) {
        alert('❌ Пользователь с таким email или username уже существует!');
        return;
    }

    supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        alert('❌ Supabase не загружен. Обновите страницу.');
        return;
    }
    try {
        // 1. Создаём пользователя в Supabase Auth
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email,
            password,
            options: { data: { full_name: name, username } }
        });

        if (authError) {
            alert('❌ Ошибка регистрации: ' + authError.message);
            return;
        }

        if (!authData || !authData.user) {
            alert('❌ Не удалось создать пользователя.');
            return;
        }

        // 2. Создаём запись в таблице profiles
        const group = "БИН-2024-" + (Math.floor(Math.random() * 3) + 1);
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert([{
                id: authData.user.id,
                full_name: name,
                username,
                email,
                group,
                role: 'student',
                avg_grade: 4.5,
                absences: 0,
                courses: ['Python', 'Веб-разработка']
            }]);

        if (profileError) {
            console.error('Ошибка создания профиля:', profileError);
            alert('⚠️ Аккаунт создан, но профиль не сохранён. Причина: ' + (profileError.message || profileError));
        }

        // 3. Добавляем в локальный массив для совместимости
        const newUser = {
            id: authData.user.id,
            name,
            email,
            username,
            password,
            group,
            role: "student",
            avgGrade: 4.5,
            absences: 0,
            courses: ["Python", "Веб-разработка"]
        };
        students.push(newUser);

        const needEmailConfirm =
            authData &&
            authData.user &&
            authData.user.email_confirmed_at === null;
        alert('✅ Аккаунт создан! Теперь войдите.' + (needEmailConfirm ? ' Возможно нужно подтвердить email.' : ''));
        switchAuthForm();
    } catch (err) {
        console.error(err);
        alert('❌ Ошибка: ' + (err.message || 'Не удалось зарегистрироваться'));
    }
}

function loadStudentData() {
    const user = currentUser;
    if (!user) return;
    if (document.getElementById('avg-grade')) document.getElementById('avg-grade').innerText = user.avgGrade ?? '-';
    if (document.getElementById('courses-count')) document.getElementById('courses-count').innerText = user.courses?.length ?? 0;
    if (document.getElementById('absences-count')) document.getElementById('absences-count').innerText = user.absences ?? 0;

    const sn = document.getElementById('settings-name');
    const se = document.getElementById('settings-email');
    const sg = document.getElementById('settings-group');
    if (sn) sn.value = user.name;
    if (se) se.value = user.email;
    if (sg) sg.value = user.group;

    const coursesList = document.getElementById('courses-list');
    const courses = user.courses || [];
    if (coursesList) coursesList.innerHTML = courses.map(course => `
        <div class="course-item">
            <h4>${course}</h4>
            <p>Преподаватель: д.т.н. Петров А.А.</p>
            <progress value="${Math.random() * 100}" max="100"></progress>
        </div>
    `).join('');

    const gradesBody = document.getElementById('grades-body');
    if (gradesBody) gradesBody.innerHTML = `
        <tr>
            <td>${courses[0] || 'Python'}</td>
            <td>${new Date().toLocaleDateString('ru-RU')}</td>
            <td><strong>5</strong></td>
        </tr>
    `;
}

function loadStudentsList() {
    const body = document.getElementById('students-body');
    if (!body) return;
    body.innerHTML = students.filter(s => s.role === 'student').map(student => {
        const isOnline = onlineStudents.has(student.id);
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td><strong style="color: #667eea;">${student.avgGrade}</strong>/5</td>
                <td><span style="background: ${student.absences > 2 ? '#ff6b6b' : '#51cf66'}; color: white; padding: 4px 8px; border-radius: 6px;">${student.absences}</span></td>
                <td><span class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                    ${isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}</span></td>
                <td style="font-size: 12px; color: #888;">${isOnline ? 'Сейчас' : 'Час назад'}</td>
            </tr>
    
        `;
    }).join('');

    updateSelectStudents();
}

function updateSelectStudents() {
    const selects = ['select-student', 'select-student-attendance'];
    selects.forEach(id => {
        const select = document.getElementById(id);
        if (select) select.innerHTML = '<option>Выберите...</option>' + 
            students.filter(s => s.role === 'student').map(s => `<option>${s.name}</option>`).join('');
    });
}

function updateStudentsList() {
    if (currentUser?.role === 'teacher') {
        const body = document.getElementById('students-body');
        if (!body) return;
        body.innerHTML = students.filter(s => s.role === 'student').map(student => {
            const isOnline = onlineStudents.has(student.id);
            return `
                <tr>
                    <td><strong>${student.name}</strong></td>
                    <td>${student.email}</td>
                    <td><strong style="color: #667eea;">${student.avgGrade}</strong>/5</td>
                    <td><span style="background: ${student.absences > 2 ? '#ff6b6b' : '#51cf66'}; color: white; padding: 4px 8px; border-radius: 6px;">${student.absences}</span></td>
                    <td><span class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                        ${isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}</span></td>
                    <td style="font-size: 12px; color: #888;">${isOnline ? 'Сейчас' : 'Час назад'}</td>
                </tr>
            `;
        }).join('');
    }
}

function showSection(sectionId, evt) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    const section = document.getElementById(sectionId);
    if (section) section.style.display = 'block';

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const activeLink = evt && evt.target ? evt.target.closest('a') : document.querySelector(`nav a[onclick*="'${sectionId}'"]`);
    if (activeLink) activeLink.classList.add('active');

    const titles = {
        'dashboard': 'Панель управления',
        'courses': 'Мои курсы',
        'grades': 'Успеваемость',
        'settings': 'Настройки профиля',
        'students': 'Список студентов',
        'grades-manage': 'Управление оценками',
        'attendance': 'Управление пропусками'
    };
    const titleEl = document.getElementById('section-title');
    if (titleEl && titles[sectionId]) titleEl.innerText = titles[sectionId];
}

async function addGrade() {
    const studentNameEl = document.getElementById('select-student');
    const subjectEl = document.getElementById('grade-subject');
    const gradeEl = document.getElementById('grade-value');
    const dateEl = document.getElementById('grade-date');

    const studentName = studentNameEl?.value;
    const subject = subjectEl?.value;
    const grade = parseFloat(gradeEl?.value);
    const date = dateEl?.value;

    if (!studentName || studentName === 'Выберите...' || !subject || isNaN(grade) || !date) {
        alert('⚠️ Заполните все поля корректно!');
        return;
    }

    supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        alert('❌ Supabase не загружен. Оценка не сохранена.');
        return;
    }

    try {
        const studentObj = students.find(s => s.name === studentName);
        // В Supabase id зачастую UUID (строка), а локальные - число, поправим для поиска
        const studentId = studentObj ? String(studentObj.id) : null;

        const { data, error } = await supabaseClient
            .from('grades')
            .insert([{
                student_name: studentName,
                student_id: studentId,
                subject,
                grade,
                date
            }])
            .select('id')
            .single();

        if (error) {
            throw error;
        }

        gradesLog.push({ id: data?.id, student: studentName, subject, grade, date });

        if (studentObj && typeof studentObj.avgGrade === 'number') {
            const weight = 10;
            studentObj.avgGrade = ((studentObj.avgGrade * weight) + grade) / (weight + 1);
            studentObj.avgGrade = parseFloat(studentObj.avgGrade.toFixed(2));
        }

        if (studentNameEl) studentNameEl.value = 'Выберите...';
        if (subjectEl) subjectEl.value = '';
        if (gradeEl) gradeEl.value = '';
        if (dateEl) dateEl.value = '';

        await loadGradesLog();
        loadStudentsList();
        alert(`✅ Оценка ${grade} для ${studentName} сохранена в Supabase.`);
    } catch (err) {
        console.error('Ошибка сохранения оценки:', err);
        alert('❌ Не удалось сохранить оценку: ' + (err.message || 'Ошибка Supabase'));
    }
}
async function loadGradesLog() {
    const body = document.getElementById('grades-log-body');
    if (!body) return;

    supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        body.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888;">Supabase не загружен</td></tr>';
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from('grades')
            .select('id, student_name, subject, grade, date')
            .order('created_at', { ascending: false });

        if (error) throw error;

        gradesLog = (data || []).map(g => ({
            id: g.id,
            student: g.student_name,
            subject: g.subject,
            grade: g.grade,
            date: g.date
        }));

        if (gradesLog.length === 0) {
            body.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888;">Оценки еще не добавлены</td></tr>';
            return;
        }
        body.innerHTML = gradesLog.map((g) => `
            <tr>
                <td><strong>${g.student}</strong></td>
                <td>${g.subject}</td>
                <td><strong style="color: #667eea;">${g.grade}</strong></td>
                <td>${g.date}</td>
                <td><button onclick="deleteGrade('${g.id}')" class="btn-delete"><i class="fas fa-trash"></i></button></td>
            </tr>
        `).join('');
    } catch (err) {
        console.error('Ошибка загрузки оценок:', err);
        body.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #e74c3c;">Ошибка загрузки данных</td></tr>';
    }
}

async function deleteGrade(id) {
    supabaseClient = getSupabaseClient();
    if (!supabaseClient) return;
    try {
        const { error } = await supabaseClient.from('grades').delete().eq('id', id);
        if (error) throw error;
        gradesLog = gradesLog.filter(g => g.id !== id);
        await loadGradesLog();
    } catch (err) {
        console.error('Ошибка удаления оценки:', err);
        alert('❌ Не удалось удалить оценку.');
    }
}

function deleteAbsence(index) {
    if (index >= 0 && index < attendanceLog.length) {
        attendanceLog.splice(index, 1);
        loadAttendanceLog();
    }
}

// Исправлен простейший local-only механизм для пропусков - можно настроить для Supabase отдельно!
function addAbsence() {
    const studentEl = document.getElementById('select-student-attendance');
    const dateEl = document.getElementById('absence-date');
    const reasonEl = document.getElementById('absence-reason');
    const student = studentEl?.value;
    const date = dateEl?.value;
    const reason = reasonEl?.value;

    if (student && student !== 'Выберите...' && date && reason) {
        attendanceLog.push({ student, date, reason });
        if (studentEl) studentEl.value = 'Выберите...';
        if (dateEl) dateEl.value = '';
        if (reasonEl) reasonEl.value = '';
        loadAttendanceLog();
        alert('✅ Пропуск успешно добавлен!');
    } else {
        alert('⚠️ Заполните все поля!');
    }
}

function loadAttendanceLog() {
    const body = document.getElementById('attendance-log-body');
    if (!body) return;
    if (!attendanceLog.length) {
        body.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #888;">Пропуски еще не добавлены</td></tr>';
        return;
    }
    body.innerHTML = attendanceLog.map((a, i) => `
        <tr>
            <td><strong>${a.student}</strong></td>
            <td>${a.date}</td>
            <td>${a.reason}</td>
            <td><button onclick="deleteAbsence(${i})" class="btn-delete"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

function saveSettings(event) {
    if (event) event.preventDefault();
    if (!currentUser) return;
    const sn = document.getElementById('settings-name');
    const se = document.getElementById('settings-email');
    const sg = document.getElementById('settings-group');
    if (sn) currentUser.name = sn.value;
    if (se) currentUser.email = se.value;
    if (sg) currentUser.group = sg.value;
    alert('✅ Настройки сохранены!');
}
