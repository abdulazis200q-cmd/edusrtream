const { createClient } = supabase;
const supabaseUrl = 'https://jainlwexceuvkhvysyjd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaW5sd2V4Y2V1dmtodnlzeWpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjU0NTAsImV4cCI6MjA4OTM0MTQ1MH0.AkndWHxj_pANu48U5kKcSUkPhbnrNyHsVZlIxlhDFw4';
const _supabase = createClient(supabaseUrl, supabaseAnonKey);

let currentUser = null;
let gradesData = []; // Имитация базы оценок
let attendanceData = []; // Имитация базы пропусков

// #region agent log
window.addEventListener('error', (event) => {
    fetch('http://127.0.0.1:7444/ingest/67680786-3026-4760-a91b-dc4bc79d9ddc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f1c269'},body:JSON.stringify({sessionId:'f1c269',runId:'pre-fix',hypothesisId:'H1',location:'lll.js:error-listener',message:'window.error captured',data:{message:event.message,source:event.filename,line:event.lineno,column:event.colno},timestamp:Date.now()})}).catch(()=>{});
});
window.addEventListener('unhandledrejection', (event) => {
    fetch('http://127.0.0.1:7444/ingest/67680786-3026-4760-a91b-dc4bc79d9ddc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f1c269'},body:JSON.stringify({sessionId:'f1c269',runId:'pre-fix',hypothesisId:'H2',location:'lll.js:unhandledrejection-listener',message:'unhandled rejection captured',data:{reason:String(event.reason)},timestamp:Date.now()})}).catch(()=>{});
});
// #endregion

// --- АВТОРИЗАЦИЯ ---

window.login = async function() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    // #region agent log
    fetch('http://127.0.0.1:7444/ingest/67680786-3026-4760-a91b-dc4bc79d9ddc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f1c269'},body:JSON.stringify({sessionId:'f1c269',runId:'pre-fix',hypothesisId:'H3',location:'lll.js:login-entry',message:'login invoked',data:{hasEmail:Boolean(email),passwordLength:password.length,studentsDefined:typeof students !== 'undefined'},timestamp:Date.now()})}).catch(()=>{});
    // #endregion

    if (!email || !password) return alert('Введите данные');

    try {
        const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        
        // Ищем в локальном списке или создаем объект по умолчанию
        const info = students.find(s => s.email === email) || { 
            name: email.split('@')[0], 
            role: 'student', 
            avgGrade: 0, 
            absences: 0 
        };
        loginUser({ ...data.user, ...info });
    } catch (err) {
        alert('Ошибка: ' + err.message);
    }
};

function loginUser(user) {
    currentUser = user;
    document.getElementById('auth-screen').style.display = 'none';
    document.getElementById('app-container').style.display = 'flex';
    
    document.getElementById('user-name').innerText = user.name;
    document.getElementById('user-avatar').innerText = user.name[0].toUpperCase();

    if (user.role === 'teacher') {
        document.getElementById('student-nav').style.display = 'none';
        document.getElementById('teacher-nav').style.display = 'flex';
        renderTeacherPanel();
        showSection('students');
    } else {
        document.getElementById('student-nav').style.display = 'flex';
        document.getElementById('teacher-nav').style.display = 'none';
        updateStudentStats();
        showSection('dashboard');
    }
}

// --- НАВИГАЦИЯ И ОТОБРАЖЕНИЕ ---

window.showSection = function(id, el) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    const target = document.getElementById(id);
    if (target) target.style.display = 'block';

    // Обновляем заголовок в Header
    const titles = {
        'dashboard': 'Главная',
        'courses': 'Мои предметы',
        'grades': 'Мои оценки',
        'settings': 'Настройки',
        'students': 'Список учащихся',
        'grades-manage': 'Журнал оценок',
        'attendance': 'Учёт пропусков'
    };
    document.getElementById('section-title').innerText = titles[id] || 'Эдустрим';

    if (el) {
        document.querySelectorAll('.sidebar nav a').forEach(a => a.classList.remove('active'));
        el.classList.add('active');
    }
};

// --- ФУНКЦИИ ПРЕПОДАВАТЕЛЯ ---

function renderTeacherPanel() {
    const studentSelects = ['select-student', 'select-student-attendance'];
    studentSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        select.innerHTML = '<option value="">Выберите студента...</option>';
        students.filter(s => s.role === 'student').forEach(s => {
            select.innerHTML += `<option value="${s.id}">${s.name} (${s.group})</option>`;
        });
    });
    renderStudentsTable();
}

function renderStudentsTable() {
    const tbody = document.getElementById('students-body');
    tbody.innerHTML = students.filter(s => s.role === 'student').map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td><strong>${s.avgGrade}</strong></td>
            <td>${s.absences}</td>
            <td><span class="status-badge status-online">В сети</span></td>
            <td>Сегодня</td>
        </tr>
    `).join('');
}

window.addGrade = function() {
    const studentId = document.getElementById('select-student').value;
    const subject = document.getElementById('grade-subject').value;
    const val = document.getElementById('grade-value').value;
    const date = document.getElementById('grade-date').value;

    if(!studentId || !subject || !val || !date) return alert('Заполните все поля');

    const student = students.find(s => s.id == studentId);
    const newGrade = { studentName: student.name, subject, val, date };
    gradesData.push(newGrade);
    
    renderGradesLog();
    alert('Оценка добавлена!');
};

function renderGradesLog() {
    const tbody = document.getElementById('grades-log-body');
    tbody.innerHTML = gradesData.map((g, idx) => `
        <tr>
            <td>${g.studentName}</td>
            <td>${g.subject}</td>
            <td><strong>${g.val}</strong></td>
            <td>${g.date}</td>
            <td><button class="btn-delete" onclick="deleteGrade(${idx})">🗑️</button></td>
        </tr>
    `).join('');
}

window.addAbsence = function() {
    const studentId = document.getElementById('select-student-attendance').value;
    const date = document.getElementById('absence-date').value;
    const reason = document.getElementById('absence-reason').value;

    if(!studentId || !date) return alert('Укажите студента и дату');

    const student = students.find(s => s.id == studentId);
    attendanceData.push({ studentName: student.name, date, reason });
    renderAttendanceLog();
};

function renderAttendanceLog() {
    const tbody = document.getElementById('attendance-log-body');
    tbody.innerHTML = attendanceData.map((a, idx) => `
        <tr>
            <td>${a.studentName}</td>
            <td>${a.date}</td>
            <td>${a.reason || 'Не указана'}</td>
            <td><button class="btn-delete" onclick="deleteAbsence(${idx})">🗑️</button></td>
        </tr>
    `).join('');
}

// --- ФУНКЦИИ СТУДЕНТА ---

function updateStudentStats() {
    document.getElementById('avg-grade').innerText = currentUser.avgGrade || '0';
    document.getElementById('courses-count').innerText = currentUser.courses ? currentUser.courses.length : '0';
    document.getElementById('absences-count').innerText = currentUser.absences || '0';
}

// Очистка CSS конфликтов через JS при загрузке (форсированно)
document.addEventListener('DOMContentLoaded', () => {
    // #region agent log
    fetch('http://127.0.0.1:7444/ingest/67680786-3026-4760-a91b-dc4bc79d9ddc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f1c269'},body:JSON.stringify({sessionId:'f1c269',runId:'pre-fix',hypothesisId:'H4',location:'lll.js:DOMContentLoaded',message:'dom loaded and handlers snapshot',data:{switchAuthFormType:typeof window.switchAuthForm,regType:typeof window.reg,logoutType:typeof window.logout,saveSettingsType:typeof window.saveSettings,deleteGradeType:typeof window.deleteGrade,deleteAbsenceType:typeof window.deleteAbsence},timestamp:Date.now()})}).catch(()=>{});
    // #endregion
    // Проверка сессии
    const checkSession = async () => {
        const { data: { session } } = await _supabase.auth.getSession();
        // #region agent log
        fetch('http://127.0.0.1:7444/ingest/67680786-3026-4760-a91b-dc4bc79d9ddc',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'f1c269'},body:JSON.stringify({sessionId:'f1c269',runId:'pre-fix',hypothesisId:'H5',location:'lll.js:checkSession',message:'session check result',data:{hasSession:Boolean(session),studentsDefined:typeof students !== 'undefined'},timestamp:Date.now()})}).catch(()=>{});
        // #endregion
        if (session) {
            const info = students.find(s => s.email === session.user.email) || { name: session.user.email, role: 'student' };
            loginUser({ ...session.user, ...info });
        }
    };
    checkSession();
});