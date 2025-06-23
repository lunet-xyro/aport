// Мобильное меню
document.getElementById('menu-toggle').addEventListener('click', function() {
    document.getElementById('main-nav').classList.toggle('active');
});

// Корзина - глобальный объект для хранения товаров
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Обновление счетчика корзины
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalItems;
    });
}

// Добавление товара в корзину
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);
        const image = this.dataset.image;
        
        // Проверяем, есть ли товар в корзине
        const existingItem = cart.find(item => item.id === id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id,
                name,
                price,
                image,
                quantity: 1
            });
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        
        // Анимация добавления
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Добавлено!';
        this.style.backgroundColor = '#4CAF50';
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = '';
        }, 1500);
    });
});

// Переключение между вкладками входа и регистрации
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        // Убираем активный класс у всех вкладок
        document.querySelectorAll('.auth-tab').forEach(t => {
            t.classList.remove('active');
        });
        
        // Добавляем активный класс текущей вкладке
        tab.classList.add('active');
        
        // Скрываем все формы
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        
        // Показываем соответствующую форму
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(`${tabId}-form`).classList.add('active');
    });
});

// Выбор типа питомца
document.querySelectorAll('.pet-option').forEach(option => {
    option.addEventListener('click', () => {
        // Убираем класс selected у всех опций
        document.querySelectorAll('.pet-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Добавляем класс selected выбранной опции
        option.classList.add('selected');
        
        // Устанавливаем значение в скрытое поле
        document.getElementById('pet-type').value = option.getAttribute('data-pet');
    });
});

// Обработка формы входа
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    localStorage.setItem('userEmail', email);
    window.location.href = 'account.html';
});

// Обработка формы регистрации
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    
    // Сохраняем данные пользователя
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', `${firstName} ${lastName}`);
    
    alert('Регистрация прошла успешно! Добро пожаловать!');
    window.location.href = 'account.html';
});

// Переключение вкладок в личном кабинете
document.querySelectorAll('.account-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Убираем активный класс у всех пунктов меню
        document.querySelectorAll('.account-menu li').forEach(item => {
            item.classList.remove('active');
        });
        
        // Добавляем активный класс текущему пункту
        this.parentElement.classList.add('active');
        
        // Скрываем все вкладки
        document.querySelectorAll('.account-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Показываем выбранную вкладку
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-tab`).classList.add('active');
    });
});

// Редактирование профиля
document.querySelector('.edit-profile').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.profile-form input');
    const saveBtn = document.querySelector('.save-profile');
    
    inputs.forEach(input => {
        input.disabled = false;
        input.style.backgroundColor = '#fff';
    });
    
    this.style.display = 'none';
    saveBtn.style.display = 'block';
});

// Сохранение профиля
document.querySelector('.save-profile').addEventListener('click', function() {
    const inputs = document.querySelectorAll('.profile-form input');
    const editBtn = document.querySelector('.edit-profile');
    
    inputs.forEach(input => {
        input.disabled = true;
        input.style.backgroundColor = '#f8f8f8';
    });
    
    this.style.display = 'none';
    editBtn.style.display = 'block';
    
    // Обновляем имя пользователя
    const firstName = document.getElementById('account-first-name').value;
    const lastName = document.getElementById('account-last-name').value;
    const userName = `${firstName} ${lastName}`;
    
    document.getElementById('user-name').textContent = userName;
    document.getElementById('sidebar-user-name').textContent = userName;
    document.querySelectorAll('#user-name').forEach(el => el.textContent = userName);
});

// Выход из аккаунта
document.getElementById('logout').addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
});

// Инициализация при загрузке страницы
window.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Заполняем данные пользователя в личном кабинете
    if (document.querySelector('.account')) {
        const userEmail = localStorage.getItem('userEmail') || 'ivan@example.com';
        const userName = localStorage.getItem('userName') || 'Иван Иванов';
        
        document.getElementById('user-name').textContent = userName;
        document.getElementById('sidebar-user-name').textContent = userName;
        document.getElementById('account-email').value = userEmail;
        
        const nameParts = userName.split(' ');
        if (nameParts.length >= 2) {
            document.getElementById('account-first-name').value = nameParts[0];
            document.getElementById('account-last-name').value = nameParts[1];
        }
    }
    
    // Активируем первую вкладку в личном кабинете
    if (document.querySelector('.account-menu li.active')) {
        const activeTab = document.querySelector('.account-menu li.active a').getAttribute('data-tab');
        document.getElementById(`${activeTab}-tab`).classList.add('active');
    }
});