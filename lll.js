// 1. Инициализация Supabase
const { createClient } = supabase;
const supabaseUrl = 'https://jainlwexceuvkhvysyjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaW5sd2V4Y2V1dmtodnlzeWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjU0NTAsImV4cCI6MjA4OTM0MTQ1MH0.AkndWHxj_pANu48U5kKcSUkPhbnrNyHsVZlIxlhDFw4';
const _supabase = createClient(supabaseUrl, supabaseAnonKey);

let currentUser = null;
let attendanceLog = [];

// Список студентов для интерфейса (пароли здесь не нужны, они в Supabase Auth)
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

// --- АВТОРИЗАЦИЯ ---

window.login = async function() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Введите почту и пароль');
        return;
    }

    try {
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const localData = students.find(s => s.email === email) || { 
            name: data.user.user_metadata.full_name || email.split('@')[0],
            role: email.includes('teacher') ? 'teacher' : 'student',
            group: '9«А»'
        };

        loginUser({ ...data.user, ...localData });
    } catch (err) {
        alert('Ошибка входа: ' + err.message + '. Если вы только зарегистрировались, проверьте почту для подтверждения.');
    }
};

window.reg = async function() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-password-confirm').value;

    if (password !== confirmPassword) {
        alert('Пароли не совпадают!');
        return;
    }

    try {
        const { data, error } = await _supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } }
        });
        if (error) throw error;
        alert('Регистрация успешна! ВАЖНО: Проверьте почту и подтвердите аккаунт перед входом.');
        switchAuthForm();
    } catch (err) {
        alert('Ошибка регистрации: ' + err.message);
    }
};

function loginUser(user) {
    currentUser = user;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';

    document.getElementById('user-name').innerText = `${user.name} · ${user.role === 'teacher' ? 'Учитель' : 'Ученик'}`;
    document.getElementById('user-avatar').innerText = user.name.charAt(0);

    if (user.role === 'teacher') {
        document.getElementById('student-nav').style.display = 'none';
        document.getElementById('teacher-nav').style.display = 'flex';
        loadStudentsList();
        loadGradesLog();
        showSection('students');
    } else {
        document.getElementById('student-nav').style.display = 'flex';
        document.getElementById('teacher-nav').style.display = 'none';
        showSection('dashboard');
    }
}

window.logout = async function() {
    await _supabase.auth.signOut();
    location.reload();
};

// --- НАВИГАЦИЯ ---

window.switchAuthForm = function() {
    const loginForm = document.getElementById('login-form');
    const regForm = document.getElementById('register-form');
    const isLoginVisible = loginForm.style.display !== 'none';
    loginForm.style.display = isLoginVisible ? 'none' : 'block';
    regForm.style.display = isLoginVisible ? 'block' : 'none';
};

window.showSection = function(sectionId, element) {
    // Скрываем все секции
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    
    // Показываем нужную
    const target = document.getElementById(sectionId);
    if (target) target.style.display = 'block';

    // Обновляем заголовок
    const titles = { 'dashboard': 'Главная', 'courses': 'Предметы', 'grades': 'Оценки', 'settings': 'Настройки', 'students': 'Учащиеся', 'grades-manage': 'Журнал', 'attendance': 'Пропуски' };
    document.getElementById('section-title').innerText = titles[sectionId] || 'Раздел';

    // Подсветка активной ссылки
    document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
    if (element) element.classList.add('active');
};

// --- РАБОТА С ДАННЫМИ ---

function loadStudentsList() {
    const body = document.getElementById('students-body');
    if (!body) return;
    
    body.innerHTML = students.filter(s => s.role === 'student').map(s => `
        <tr>
            <td><strong>${s.name}</strong></td>
            <td>${s.email}</td>
            <td>4.0</td>
            <td>0</td>
            <td><span class="status-badge status-online">В сети</span></td>
            <td>Сейчас</td>
        </tr>
    `).join('');

    // Обновление выпадающих списков
    const selects = ['select-student', 'select-student-attendance'];
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.innerHTML = '<option>Выберите...</option>' + 
                students.filter(s => s.role === 'student').map(s => `<option>${s.name}</option>`).join('');
        }
    });
}

async function loadGradesLog() {
    const body = document.getElementById('grades-log-body');
    if (!body) return;
    try {
        const { data, error } = await _supabase.from('grades').select('*').order('date', { ascending: false });
        if (error) throw error;
        
        if (!data || data.length === 0) {
            body.innerHTML = '<tr><td colspan="5" style="text-align:center">Нет записей</td></tr>';
            return;
        }
        body.innerHTML = data.map(g => `
            <tr>
                <td>${g.student_name}</td>
                <td>${g.subject}</td>
                <td>${g.grade}</td>
                <td>${g.date}</td>
                <td><button onclick="deleteGrade('${g.id}')" class="btn-delete">×</button></td>
            </tr>
        `).join('');
    } catch (e) {
        console.error("Ошибка загрузки оценок:", e.message);
    }
}

window.addGrade = async function() {
    const student = document.getElementById('select-student').value;
    const subject = document.getElementById('grade-subject').value;
    const grade = document.getElementById('grade-value').value;
    const date = document.getElementById('grade-date').value;

    if (student === 'Выберите...' || !grade || !subject || !date) {
        alert('Заполните все поля!');
        return;
    }

    const { error } = await _supabase.from('grades').insert([{
        student_name: student,
        subject,
        grade: parseInt(grade),
        date
    }]);

    if (error) {
        alert('Ошибка БД: ' + error.message);
    } else {
        alert('Оценка добавлена');
        loadGradesLog();
    }
};

window.deleteGrade = async function(id) {
    if (confirm('Удалить оценку?')) {
        const { error } = await _supabase.from('grades').delete().eq('id', id);
        if (error) alert(error.message);
        else loadGradesLog();
    }
};

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await _supabase.auth.getSession();
    if (session) {
        const email = session.user.email;
        const localData = students.find(s => s.email === email) || { name: email };
        loginUser({ ...session.user, ...localData });
    }
});