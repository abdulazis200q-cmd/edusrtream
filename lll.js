const supabaseUrl = 'https://jainlwexceuvkhvysyjd.supabase.coL';
const supabaseKey = 'sb_secret_PZk4XXn-dhTa192n5xetSw_OsD-jcQD';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);
// Данные студентов на основе предоставленной ведомости
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
    onlineStudents.add(user.id); // Сразу делаем онлайн при входе
    user.lastSeen = "Сейчас";

    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    
    document.getElementById('user-name').innerText = `${user.name} (${user.role === 'student' ? 'Студент' : 'Преподаватель'})`;
    document.getElementById('user-avatar').innerText = user.name.charAt(0);

    if (user.role === 'teacher') {
        document.getElementById('student-nav').style.display = 'none';
        document.getElementById('teacher-nav').style.display = 'flex';
        renderStudentsTable();
        loadGradesLog();
        loadAttendanceLog();
        updateSelectStudents();
        showSection('students');
    } else {
        document.getElementById('student-nav').style.display = 'flex';
        document.getElementById('teacher-nav').style.display = 'none';
        loadStudentData();
        showSection('dashboard');
    }
}

function logout() {
    if (currentUser) {
        onlineStudents.delete(currentUser.id); // Убираем из онлайна при выходе
        currentUser.lastSeen = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    currentUser = null;
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
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

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('⚠️ Заполните все поля!');
        return;
    }

    const user = students.find(s => 
        (s.email === email || s.username === email) && s.password === password
    );

    if (!user) {
        alert('❌ Неверный email/username или пароль!');
        return;
    }

    loginUser(user);
}

function register() {
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;

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

    const newUser = {
        id: students.length + 1,
        name,
        email,
        username,
        password,
        group: "БИН-2024-" + (Math.floor(Math.random() * 3) + 1),
        role: "student",
        avgGrade: 4.5,
        absences: 0,
        courses: ["Python", "Веб-разработка"]
    };

    students.push(newUser);
    alert('✅ Аккаунт создан! Теперь войдите.');
    switchAuthForm();
}

function loginUser(user) {
    currentUser = user;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    
    document.getElementById('user-name').innerText = `${user.name} (${user.role === 'student' ? 'Студент' : 'Преподаватель'})`;
    document.getElementById('user-avatar').innerText = user.name.charAt(0);

    if (user.role === 'teacher') {
        document.getElementById('student-nav').style.display = 'none';
        document.getElementById('teacher-nav').style.display = 'flex';
        loadStudentsList();
        loadGradesLog();
        loadAttendanceLog();
        showSection('students');
    } else {
        document.getElementById('student-nav').style.display = 'flex';
        document.getElementById('teacher-nav').style.display = 'none';
        loadStudentData();
        showSection('dashboard');
    }
}

function logout() {
    if (currentUser) onlineStudents.delete(currentUser.id); // Уходим в офлайн
    currentUser = null;

    
    currentUser = null;
    onlineStudents.clear();
    document.getElementById('auth-screen').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
}

function loadStudentData() {
    const user = currentUser;
    document.getElementById('avg-grade').innerText = user.avgGrade;
    document.getElementById('courses-count').innerText = user.courses.length;
    document.getElementById('absences-count').innerText = user.absences;

    document.getElementById('settings-name').value = user.name;
    document.getElementById('settings-email').value = user.email;
    document.getElementById('settings-group').value = user.group;

    const coursesList = document.getElementById('courses-list');
    coursesList.innerHTML = user.courses.map(course => `
        <div class="course-item">
            <h4>${course}</h4>
            <p>Преподаватель: д.т.н. Петров А.А.</p>
            <progress value="${Math.random() * 100}" max="100"></progress>
        </div>
    `).join('');

    const gradesBody = document.getElementById('grades-body');
    gradesBody.innerHTML = `
        <tr>
            <td>${user.courses[0] || 'Python'}</td>
            <td>${new Date().toLocaleDateString('ru-RU')}</td>
            <td><strong>5</strong></td>
        </tr>
    `;
}

function loadStudentsList() {
   
    const body = document.getElementById('students-body');
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
        select.innerHTML = '<option>Выберите...</option>' + 
            students.filter(s => s.role === 'student').map(s => `<option>${s.name}</option>`).join('');
    });
}

function updateStudentsList() {
    if (currentUser?.role === 'teacher') {
        const body = document.getElementById('students-body');
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

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';

    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    event.target.closest('a').classList.add('active');

    const titles = {
        'dashboard': 'Панель управления',
        'courses': 'Мои курсы',
        'grades': 'Успеваемость',
        'settings': 'Настройки профиля',
        'students': 'Список студентов',
        'grades-manage': 'Управление оценками',
        'attendance': 'Управление пропусками'
    };
    document.getElementById('section-title').innerText = titles[sectionId];
}

function addGrade() {
    const studentName = document.getElementById('select-student').value;
    const subject = document.getElementById('grade-subject').value;
    const grade = parseFloat(document.getElementById('grade-value').value); // Превращаем в число
    const date = document.getElementById('grade-date').value;

    if (studentName && studentName !== 'Выберите...' && subject && !isNaN(grade) && date) {
        
        // 1. Добавляем запись в лог оценок
        gradesLog.push({ student: studentName, subject, grade, date });

        // 2. СИНХРОНИЗАЦИЯ: Находим студента в основном массиве
        const studentObj = students.find(s => s.name === studentName);
        
        if (studentObj) {
            // Имитируем расчет: берем старый средний балл и считаем новый
            // Для точности в реальных системах лучше хранить массив всех оценок
            const weight = 10; // Условный коэффициент "веса" предыдущих оценок
            studentObj.avgGrade = ((studentObj.avgGrade * weight) + grade) / (weight + 1);
            studentObj.avgGrade = parseFloat(studentObj.avgGrade.toFixed(2)); // Округляем до 0.01
        }

        // 3. Очищаем поля формы
        document.getElementById('select-student').value = 'Выберите...';
        document.getElementById('grade-subject').value = '';
        document.getElementById('grade-value').value = '';
        document.getElementById('grade-date').value = '';

        // 4. ОБНОВЛЕНИЕ ИНТЕРФЕЙСА (UI)
        loadGradesLog();      // Обновляем таблицу оценок
        loadStudentsList();   // Обновляем основной список (там теперь новый avgGrade!)
        
        alert(`✅ Оценка ${grade} для ${studentName} сохранена. Новый средний балл: ${studentObj.avgGrade}`);
    } else {
        alert('⚠️ Заполните все поля корректно!');
    }
}
function loadGradesLog() {
    const body = document.getElementById('grades-log-body');
    if (gradesLog.length === 0) {
        body.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888;">Оценки еще не добавлены</td></tr>';
        return;
    }
    body.innerHTML = gradesLog.map((g, i) => `
        <tr>
            <td><strong>${g.student}</strong></td>
            <td>${g.subject}</td>
            <td><strong style="color: #667eea;">${g.grade}</strong></td>
            <td>${g.date}</td>
            <td><button onclick="deleteGrade(${i})" class="btn-delete"><i class="fas fa-trash"></i></button></td>
        </tr>
    `).join('');
}

function deleteGrade(index) {
    gradesLog.splice(index, 1);
    loadGradesLog();
}

function addAbsence() {
    const student = document.getElementById('select-student-attendance').value;
    const date = document.getElementById('absence-date').value;
    const reason = document.getElementById('absence-reason').value;

    if (student && student !== 'Выберите...' && date && reason) {
        attendanceLog.push({ student, date, reason });
        document.getElementById('select-student-attendance').value = 'Выберите...';
        document.getElementById('absence-date').value = '';
        document.getElementById('absence-reason').value = '';
        loadAttendanceLog();
        alert('✅ Пропуск успешно добавлен!');
    } else {
        alert('⚠️ Заполните все поля!');
    }
}

function loadAttendanceLog() {
    const body = document.getElementById('attendance-log-body');
    if (attendanceLog.length === 0) {
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
    event.preventDefault();
    currentUser.name = document.getElementById('settings-name').value;
    currentUser.email = document.getElementById('settings-email').value;
    currentUser.group = document.getElementById('settings-group').value;
    alert('✅ Настройки сохранены!');
}
