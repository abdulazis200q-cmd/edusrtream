// 1. Инициализация в самом начале файла
let attendanceLog = [];
let gradesLog = [];
let onlineStudents = new Set();
let currentUser = null;

const { createClient } = supabase;
const supabaseUrl = 'https://jainlwexceuvkhvysyjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaW5sd2V4Y2V1dmtodnlzeWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjU0NTAsImV4cCI6MjA4OTM0MTQ1MH0.AkndWHxj_pANu48U5kKcSUkPhbnrNyHsVZlIxlhDFw4'; // ваш ключ
const _supabase = createClient(supabaseUrl, supabaseAnonKey)

function getSupabaseClient() {
    return _supabase;
}



function updateUI() {
    // Обновление таблицы оценок
    const gBody = document.getElementById('grades-table-body');
    if (gBody) {
        if (grades.length === 0) {
            gBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Нет данных</td></tr>';
        } else {
            gBody.innerHTML = grades.map(g => 
                `<tr>
                    <td>${g.student}</td>
                    <td>${g.subject}</td>
                    <td><span class="grade-badge">${g.score}</span></td>
                    <td>${g.date}</td>
                </tr>`
            ).join('');
        }
    }

    // Обновление таблицы пропусков
    loadAttendanceLog();
}
// --- 5. ИНИЦИАЛИЗАЦИЯ ---
document.addEventListener('DOMContentLoaded', async () => {
    const client = getSupabaseClient();
    if (!client) return;

    const { data: { session } } = await client.auth.getSession();
    if (session) {
        currentUser = session.user;
        showPanel(localStorage.getItem('currentPanel') || 'dashboard');
        updateUI();
    } else {
        showAuth('login');
    }
});

// ЭКСПОРТ (чтобы HTML видел функции)
window.login = login;
window.register = register;
window.logout = logout;
window.showPanel = showPanel;
window.showAuth = showAuth;
window.addGrade = addGrade;
window.addAbsence = addAbsence;

const SCHOOL_SUBJECTS = [
    'Алгебра', 'Геометрия', 'Русский язык', 'Литература', 'История', 'Обществознание',
    'География', 'Биология', 'Физика', 'Химия', 'Английский язык', 'Информатика', 'Физическая культура'
];

const SUBJECT_TEACHER = {
    'Алгебра': 'Иванова М.С.',
    'Геометрия': 'Петров А.В.',
    'Русский язык': 'Смирнова Е.П.',
    'Литература': 'Смирнова Е.П.',
    'История': 'Козлов Д.И.',
    'Обществознание': 'Козлов Д.И.',
    'География': 'Волкова Н.Т.',
    'Биология': 'Морозова Л.К.',
    'Физика': 'Соколов В.Р.',
    'Химия': 'Лебедева О.Н.',
    'Английский язык': 'Беннетт К.',
    'Информатика': 'Андреев С.С.',
    'Физическая культура': 'Рябов И.Г.'
};

function teacherForSubject(subject) {
    return SUBJECT_TEACHER[subject] || 'Преподаватель';
}

function subjectProgressPercent(subject, userId) {
    const s = String(subject || '') + String(userId || '');
    let h = 0;
    for (let i = 0; i < s.length; i++) h = ((h << 5) - h) + s.charCodeAt(i);
    return 55 + (Math.abs(h) % 36);
}

function pickRandomSubjects(count) {
    const shuffled = [...SCHOOL_SUBJECTS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

// Реестр учащихся (локальные учётные записи; новые — через регистрацию в Supabase)
const students = [
    { id: 1, name: "Адылбеков Адылбий", email: "student1@edustream.ru", username: "student1", password: "password123", group: "9«А»", role: "student", avgGrade: 4.0, absences: 2, courses: ["Алгебра", "Русский язык", "История", "Биология"] },
    { id: 2, name: "Алиев Амир", email: "student2@edustream.ru", username: "student2", password: "password123", group: "9«А»", role: "student", avgGrade: 3.5, absences: 1, courses: ["Геометрия", "Литература", "Английский язык", "Информатика"] },
    { id: 3, name: "Алиев Шамиль", email: "student3@edustream.ru", username: "student3", password: "password123", group: "9«А»", role: "student", avgGrade: 3.2, absences: 0, courses: ["Алгебра", "Русский язык", "Физика", "Химия"] },
    { id: 4, name: "Алмазбеков Ислам", email: "student4@edustream.ru", username: "student4", password: "password123", group: "9«А»", role: "student", avgGrade: 3.8, absences: 3, courses: ["Геометрия", "География", "Обществознание"] },
    { id: 5, name: "Баги Абдурауф", email: "student5@edustream.ru", username: "student5", password: "password123", group: "9«А»", role: "student", avgGrade: 4.1, absences: 1, courses: ["Литература", "История", "Английский язык", "Физическая культура"] },
    { id: 6, name: "Багиев Абдулазис", email: "student6@edustream.ru", username: "student6", password: "password123", group: "9«А»", role: "student", avgGrade: 4.8, absences: 2, courses: ["Алгебра", "Химия", "География", "Информатика"] },
    { id: 7, name: "Бакуменко Руслан", email: "student7@edustream.ru", username: "student7", password: "password123", group: "9«А»", role: "student", avgGrade: 4.3, absences: 0, courses: ["Геометрия", "Русский язык", "Физика", "Обществознание"] },
    { id: 8, name: "Бешанбекова Жанетта", email: "student8@edustream.ru", username: "student8", password: "password123", group: "9«Б»", role: "student", avgGrade: 4.5, absences: 4, courses: ["Алгебра", "Литература", "Биология", "История"] },
    { id: 9, name: "Кубезов Азис", email: "student9@edustream.ru", username: "student9", password: "password123", group: "9«Б»", role: "student", avgGrade: 4.7, absences: 1, courses: ["Русский язык", "Геометрия", "Английский язык", "География"] },
    { id: 10, name: "Кушматов Дилержон", email: "student10@edustream.ru", username: "student10", password: "password123", group: "9«Б»", role: "student", avgGrade: 4.2, absences: 2, courses: ["Физика", "Химия", "Информатика"] },
    { id: 11, name: "Кыдырмаев Искендер", email: "student11@edustream.ru", username: "student11", password: "password123", group: "9«Б»", role: "student", avgGrade: 4.4, absences: 0, courses: ["Алгебра", "Обществознание", "Биология", "Физическая культура"] },
    { id: 12, name: "Люшисан Абдулхалим", email: "student12@edustream.ru", username: "student12", password: "password123", group: "9«Б»", role: "student", avgGrade: 4.0, absences: 5, courses: ["Русский язык", "История", "Литература"] },
    { id: 13, name: "Маматов Абдуназим", email: "student13@edustream.ru", username: "student13", password: "password123", group: "9«Б»", role: "student", avgGrade: 4.6, absences: 0, courses: ["Геометрия", "География", "Английский язык", "Физика"] },
    { id: 14, name: "Ниязкулов Джалиль", email: "student14@edustream.ru", username: "student14", password: "password123", group: "10«А»", role: "student", avgGrade: 4.1, absences: 3, courses: ["Алгебра", "Химия", "Русский язык", "История"] },
    { id: 15, name: "Нуралиев Сыймыкбек", email: "student15@edustream.ru", username: "student15", password: "password123", group: "10«А»", role: "student", avgGrade: 3.9, absences: 1, courses: ["Биология", "Литература", "Обществознание"] },
    { id: 16, name: "Нурлаев Сергей", email: "student16@edustream.ru", username: "student16", password: "password123", group: "10«А»", role: "student", avgGrade: 4.2, absences: 2, courses: ["Геометрия", "Информатика", "Физическая культура"] },
    { id: 17, name: "Синяева Ульяна", email: "student17@edustream.ru", username: "student17", password: "password123", group: "10«А»", role: "student", avgGrade: 4.9, absences: 1, courses: ["Алгебра", "Русский язык", "Английский язык", "География"] },
    { id: 18, name: "Турсубекова Жамиля", email: "student18@edustream.ru", username: "student18", password: "password123", group: "10«А»", role: "student", avgGrade: 4.4, absences: 3, courses: ["Физика", "Химия", "История", "Литература"] },
    { id: 19, name: "Усенов Азизбек", email: "student19@edustream.ru", username: "student19", password: "password123", group: "10«Б»", role: "student", avgGrade: 3.7, absences: 0, courses: ["Алгебра", "Биология", "Информатика"] },
    { id: 20, name: "Усонбеков Адил-хан", email: "student20@edustream.ru", username: "student20", password: "password123", group: "10«Б»", role: "student", avgGrade: 4.5, absences: 2, courses: ["Геометрия", "Русский язык", "Обществознание"] },
    { id: 21, name: "Шодиев Махмуд", email: "student21@edustream.ru", username: "student21", password: "password123", group: "10«Б»", role: "student", avgGrade: 4.8, absences: 1, courses: ["История", "Физика", "Английский язык", "Физическая культура"] },
    { id: 22, name: "Сидорова Елена Николаевна", email: "teacher1@edustream.ru", username: "teacher1", password: "password123", group: "Зам. директора по УВР", role: "teacher", avgGrade: null, absences: null }
];



function studentIsOnline(studentId) {
    return onlineStudents.has(studentId) || onlineStudents.has(String(studentId));
}

// --- РЕАЛЬНОЕ ВРЕМЯ: ONLINE/ОФФЛАЙН ЧЕРЕЗ SUPABASE PRESENCE ---
let presenceChannel = null;

function updateOnlineFromPresence(state) {
    // state: { [presenceKey]: [{ user_id, role, ... }] }
    const next = new Set();
    Object.values(state || {}).forEach((metas) => {
        (metas || []).forEach((m) => {
            if (m && m.user_id !== undefined && m.user_id !== null) next.add(m.user_id);
        });
    });
    onlineStudents = next;

    // Обновим lastSeen у тех, кто оффлайн
    students.forEach((s) => {
        if (!onlineStudents.has(s.id) && !onlineStudents.has(String(s.id))) {
            if (!s.lastSeen || s.lastSeen === 'Сейчас') {
                s.lastSeen = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            }
        } else {
            s.lastSeen = 'Сейчас';
        }
    });

    if (currentUser?.role === 'teacher') {
        renderStudentsTable();
    }
}

async function startPresence(user) {
    const sb = getSupabaseClient();
    if (!sb) return;

    // Чтобы одинаково работало для локальных числовых id и supabase uuid:
    const userId = user?.id;

    // Убираем старый канал, если был
    try {
        if (presenceChannel) {
            await presenceChannel.untrack().catch(() => {});
            await sb.removeChannel(presenceChannel).catch(() => {});
        }
    } catch (_) {}

    // Один общий канал на приложение
    presenceChannel = sb.channel('edustream-online', {
        config: { presence: { key: String(userId) } }
    });

    presenceChannel.on('presence', { event: 'sync' }, () => {
        updateOnlineFromPresence(presenceChannel.presenceState());
    });

    presenceChannel.on('presence', { event: 'join' }, () => {
        updateOnlineFromPresence(presenceChannel.presenceState());
    });

    presenceChannel.on('presence', { event: 'leave' }, () => {
        updateOnlineFromPresence(presenceChannel.presenceState());
    });

    await presenceChannel.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
            await presenceChannel.track({
                user_id: userId,
                role: user?.role || 'student',
                name: user?.name || '',
                at: new Date().toISOString()
            });
            updateOnlineFromPresence(presenceChannel.presenceState());
        }
    });
}

async function stopPresence() {
    const sb = getSupabaseClient();
    if (!sb || !presenceChannel) return;
    try {
        await presenceChannel.untrack().catch(() => {});
        await sb.removeChannel(presenceChannel).catch(() => {});
    } catch (_) {
        // ignore
    } finally {
        presenceChannel = null;
    }
}

// --- ОСНОВНЫЕ ФУНКЦИИ ---

function loginUser(user) {
    currentUser = user;
    onlineStudents.add(user.id);
    user.lastSeen = "Сейчас";
    // Стартуем реальный online presence (между разными устройствами/вкладками)
    startPresence(user).catch((e) => console.error('Presence error:', e));

    const authScreen = document.getElementById('auth-screen');
    const appContainer = document.getElementById('app-container');
    if (authScreen) authScreen.style.display = 'none';
    if (appContainer) appContainer.style.display = 'flex';

    const userName = document.getElementById('user-name');
    const userAvatar = document.getElementById('user-avatar');
    if (userName) userName.innerText = `${user.name} · ${user.role === 'student' ? 'Учащийся' : 'Преподаватель'}`;
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
        // Корректное завершение сессии: скрыть приложение, показать экран входа, очистить данные пользователя
        stopPresence();
        currentUser = null;
        if (window.onlineStudents) window.onlineStudents.clear?.();
        // Сброс UI (имя, аватар, только актуальные блоки)
        const appContainer = document.getElementById('app-container');
        const authScreen = document.getElementById('auth-screen');
        if (appContainer) appContainer.style.display = 'none';
        if (authScreen) authScreen.style.display = 'flex';
        // Чистим поля ввода (без reload)
        ['login-email', 'login-password', 'register-name', 'reg-email', 'reg-username', 'reg-password'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });
        // Сбрасываем блоки навигации
        const studentNav = document.getElementById('student-nav');
        const teacherNav = document.getElementById('teacher-nav');
        if (studentNav) studentNav.style.display = 'none';
        if (teacherNav) teacherNav.style.display = 'none';
        // Сбросить значение имени и аватара, если применимо
        const userName = document.getElementById('user-name');
        const userAvatar = document.getElementById('user-avatar');
        if (userName) userName.innerText = '';
        if (userAvatar) userAvatar.innerText = '';
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    updateUI();
});
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
        const isOnline = studentIsOnline(student.id);
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td><strong style="color: #667eea;">${student.avgGrade}</strong>/5</td>
                <td><span style="background: ${student.absences > 3 ? '#ff6b6b' : '#51cf66'}; color: white; padding: 4px 8px; border-radius: 6px;">${student.absences}</span></td>
                <td>
                    <span class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                        ${isOnline ? 'В сети' : 'Не в сети'}
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
        alert('Форма входа недоступна. Обновите страницу.');
        return;
    }
    const emailOrUsername = emailOrUsernameEl.value.trim();
    const password = passwordEl.value;
    let supabaseLastError = null;

    if (!emailOrUsername || !password) {
        alert('Заполните все поля.');
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
    alert('Неверный логин или пароль.' + reason);
}

function profileToUser(p) {
    // Защитим, если нет данных
    if (!p) return null;
    const user = {
        id: p.id,
        name: p.full_name || p.username,
        email: p.email,
        username: p.username,
        group: p.group || '9«А»',
        role: p.role || 'student',
        avgGrade: p.avg_grade !== undefined ? p.avg_grade : 4.0,
        absences: p.absences !== undefined && p.absences !== null ? p.absences : 0,
        courses: Array.isArray(p.courses) ? p.courses : pickRandomSubjects(5)
    };
    if (!students.find(s => s.id === user.id)) students.push(user);
    return user;
}

async function register() {
    // 1. Получаем элементы DOM
    const nameEl = document.getElementById('register-name');
    const emailEl = document.getElementById('register-email');
    const usernameEl = document.getElementById('register-username');
    const passwordEl = document.getElementById('register-password');
    const passwordConfirmEl = document.getElementById('register-password-confirm');

    // Проверка на существование элементов
    if (!nameEl || !emailEl || !usernameEl || !passwordEl || !passwordConfirmEl) {
        alert('Ошибка: Элементы формы не найдены.');
        return;
    }

    // 2. Извлекаем и очищаем значения
    const name = nameEl.value.trim();
    const email = emailEl.value.trim();
    const username = usernameEl.value.trim();
    const password = passwordEl.value;
    const passwordConfirm = passwordConfirmEl.value;

    // 3. Валидация данных
    if (!name || !email || !username || !password || !passwordConfirm) {
        alert('Заполните все поля.');
        return;
    }

    if (password !== passwordConfirm) {
        alert('Пароли не совпадают.');
        return;
    }

    // Проверка локального массива (если нужно)
    if (typeof students !== 'undefined' && students.find(s => s.email === email || s.username === username)) {
        alert('Учётная запись с таким email или логином уже есть.');
        return;
    }

    // 4. Работа с Supabase
    const supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        alert('Сервис авторизации не загружен.');
        return;
    }

    try {
        // Регистрация в Auth
        const { data: authData, error: authError } = await supabaseClient.auth.signUp({
            email,
            password,
            options: { data: { full_name: name, username: username } }
        });

        if (authError) throw authError;

        if (!authData || !authData.user) {
            alert('Не удалось создать учётную запись.');
            return;
        }

        // Создание профиля в таблице profiles
        const schoolGroups = ['9«А»', '9«Б»', '10«А»', '10«Б»'];
        const group = schoolGroups[Math.floor(Math.random() * schoolGroups.length)];
        
        const { error: profileError } = await supabaseClient
            .from('profiles')
            .insert([{
                id: authData.user.id,
                full_name: name,
                username: username,
                email: email,
                group: group,
                role: 'student',
                avg_grade: 4.5,
                absences: 0,
                courses: pickRandomSubjects(5)
            }]);

        if (profileError) console.error('Профиль не создан:', profileError);

        alert('Регистрация успешна! Войдите в систему.');
        switchAuthForm();

    } catch (err) {
        console.error('Ошибка:', err);
        alert('Ошибка регистрации: ' + err.message);
    }
} // <--- Конец функции. После этого должен идти сразу loadStudentData
    supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        alert('Сервис авторизации не загружен. Обновите страницу.');
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
            alert('Ошибка регистрации: ' + authError.message);
            return;
        }

        if (!authData || !authData.user) {
            alert('Не удалось создать учётную запись.');
            return;
        }

        // 2. Создаём запись в таблице profiles
        const schoolGroups = ['9«А»', '9«Б»', '10«А»', '10«Б»'];
        const group = schoolGroups[Math.floor(Math.random() * schoolGroups.length)];
        const regCourses = pickRandomSubjects(5);
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
                courses: regCourses
            }]);

        if (profileError) {
            console.error('Ошибка создания профиля:', profileError);
            alert('Запись в журнале создана частично. Профиль не сохранён. Причина: ' + (profileError.message || profileError));
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
            courses: regCourses
        };
        students.push(newUser);

        const needEmailConfirm =
            authData &&
            authData.user &&
            authData.user.email_confirmed_at === null;
        alert('Регистрация завершена. Войдите с указанными данными.' + (needEmailConfirm ? ' Проверьте почту: может потребоваться подтверждение.' : ''));
        switchAuthForm();
    } catch (err) {
        console.error(err);
        alert('Ошибка: ' + (err.message || 'Регистрация не выполнена'));
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
            <p>Преподаватель: ${teacherForSubject(course)}</p>
            <progress value="${subjectProgressPercent(course, user.id)}" max="100"></progress>
        </div>
    `).join('');

    const gradesBody = document.getElementById('grades-body');
    if (gradesBody) {
        const subs = (courses.length ? courses.slice(0, 4) : SCHOOL_SUBJECTS.slice(0, 4));
        const marks = [5, 4, 5, 4];
        gradesBody.innerHTML = subs.map((subj, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (i + 1) * 5);
            return `
        <tr>
            <td>${subj}</td>
            <td>${d.toLocaleDateString('ru-RU')}</td>
            <td><strong>${marks[i % marks.length]}</strong></td>
        </tr>`;
        }).join('');
    }
}

function loadStudentsList() {
    const body = document.getElementById('students-body');
    if (!body) return;
    body.innerHTML = students.filter(s => s.role === 'student').map(student => {
        const isOnline = studentIsOnline(student.id);
        return `
            <tr>
                <td><strong>${student.name}</strong></td>
                <td>${student.email}</td>
                <td><strong style="color: #667eea;">${student.avgGrade}</strong>/5</td>
                <td><span style="background: ${student.absences > 2 ? '#ff6b6b' : '#51cf66'}; color: white; padding: 4px 8px; border-radius: 6px;">${student.absences}</span></td>
                <td><span class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                    ${isOnline ? 'В сети' : 'Не в сети'}</span></td>
                <td style="font-size: 12px; color: #888;">${isOnline ? 'Сейчас' : (student.lastSeen || '—')}</td>
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
            const isOnline = studentIsOnline(student.id);
            return `
                <tr>
                    <td><strong>${student.name}</strong></td>
                    <td>${student.email}</td>
                    <td><strong style="color: #667eea;">${student.avgGrade}</strong>/5</td>
                    <td><span style="background: ${student.absences > 2 ? '#ff6b6b' : '#51cf66'}; color: white; padding: 4px 8px; border-radius: 6px;">${student.absences}</span></td>
                    <td><span class="status-badge ${isOnline ? 'status-online' : 'status-offline'}">
                        ${isOnline ? 'В сети' : 'Не в сети'}</span></td>
                    <td style="font-size: 12px; color: #888;">${isOnline ? 'Сейчас' : (student.lastSeen || '—')}</td>
                </tr>
            `;
        }).join('');
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId)?.classList.add('active');
    
    document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
    event.currentTarget.classList.add('active');
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
        alert('Заполните все поля корректно.');
        return;
    }

    supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        alert('Сервис журнала недоступен. Оценка не сохранена.');
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
        alert(`Оценка ${grade} по «${subject}» для ${studentName} внесена в журнал.`);
    } catch (err) {
        console.error('Ошибка сохранения оценки:', err);
        alert('Не удалось сохранить оценку: ' + (err.message || 'Сервис недоступен'));
    }
}
async function loadGradesLog() {
    const body = document.getElementById('grades-log-body');
    if (!body) return;

    supabaseClient = getSupabaseClient();
    if (!supabaseClient) {
        body.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888;">Журнал временно недоступен</td></tr>';
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
            body.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888;">Записей в журнале пока нет</td></tr>';
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
        alert('Не удалось удалить запись.');
    }
}

function deleteAbsence(index) {
    if (confirm('Удалить запись?')) {
        attendanceLog.splice(index, 1);
        updateUI();
    }
}

// Исправлен простейший local-only механизм для пропусков - можно настроить для Supabase отдельно!
function addAbsence() {
    const studentEl = document.getElementById('absence-student');
    const dateEl = document.getElementById('absence-date');
    const reasonEl = document.getElementById('absence-reason');

    const student = studentEl?.value;
    const date = dateEl?.value;
    const reason = reasonEl?.value;

    if (student && student !== 'Выберите...' && date && reason) {
        attendanceLog.push({ student, date, reason });
        
        // Очистка полей
        if (studentEl) studentEl.value = 'Выберите...';
        if (dateEl) dateEl.value = '';
        if (reasonEl) reasonEl.value = '';

        updateUI();
        alert('Запись о пропуске добавлена.');
    } else {
        alert('Заполните все поля формы.');
    }
}

function loadAttendanceLog() {
    const body = document.getElementById('attendance-log-body');
    if (!body) return;

    if (attendanceLog.length === 0) {
        body.innerHTML = '<tr><td colspan="4" style="text-align: center; color: #888;">Записей о пропусках нет</td></tr>';
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
    alert('Изменения сохранены.');
}
