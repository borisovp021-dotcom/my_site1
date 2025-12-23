// Слайдер
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация слайдера
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    // Показ слайда
    function showSlide(index) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Убираем активность у всех точек
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Показываем нужный слайд и активируем точку
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }
    
    // Следующий слайд
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
    }
    
    // Автопереключение слайдов
    let slideInterval = setInterval(nextSlide, 5000);
    
    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        nextSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    prevBtn.addEventListener('click', function() {
        clearInterval(slideInterval);
        prevSlide();
        slideInterval = setInterval(nextSlide, 5000);
    });
    
    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            showSlide(index);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });
    
    // Плавная прокрутка для навигации
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // В реальном приложении здесь был бы AJAX-запрос к серверу
            // Для демонстрации просто покажем сообщение
            
            // Создаем сообщение об успехе
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <p>Спасибо, ${name}! Ваше сообщение отправлено. Я свяжусь с вами в ближайшее время.</p>
            `;
            successMessage.style.cssText = `
                background-color: #e6f7e9;
                color: #2d5a2d;
                padding: 15px;
                border-radius: 8px;
                margin-top: 20px;
                text-align: center;
            `;
            
            // Очищаем форму и добавляем сообщение
            contactForm.reset();
            contactForm.appendChild(successMessage);
            
            // Удаляем сообщение через 5 секунд
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
            
            // В реальном приложении здесь должен быть код для отправки данных на сервер
            console.log('Форма отправлена:', { name, email, message });
        });
    }
    
    // Анимация появления элементов при скролле
    function checkScroll() {
        const elements = document.querySelectorAll('.about-content, .gallery-item, .contact-content');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Устанавливаем начальные стили для анимации
    document.querySelectorAll('.about-content, .gallery-item, .contact-content').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Проверяем скролл при загрузке и при прокрутке
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Инициализация проверки скролла
    checkScroll();
});