// Конфигурация (замени своими данными)
const SUPABASE_URL = 'YOUR_URL';
const SUPABASE_KEY = 'YOUR_KEY';
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Переключение вкладок
document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        
        // Визуальное переключение кнопок
        document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Смена контента
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
        document.getElementById(target).classList.remove('hidden');
        
        document.getElementById('page-title').innerText = btn.innerText;
    });
});

// Пример функции входа
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        alert("Ошибка входа: " + error.message);
    } else {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
        loadUserData(data.user);
    }
}

document.getElementById('login-form').addEventListener('submit', handleLogin);

// Загрузка данных
async function loadUserData(user) {
    document.getElementById('display-name').innerText = user.email;
    
    // Здесь можно сделать запрос к таблице 'grades'
    const { data: grades } = await supabase
        .from('grades')
        .select('*')
        .eq('student_id', user.id);
        
    renderGrades(grades);
}

function renderGrades(grades) {
    const tbody = document.querySelector('#grades-table tbody');
    tbody.innerHTML = grades.map(g => `
        <tr>
            <td>${g.subject}</td>
            <td><span class="badge">${g.score}</span></td>
            <td>${new Date(g.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}