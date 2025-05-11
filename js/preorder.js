document.addEventListener('DOMContentLoaded', function() {
    // Выбор издания
    const editionButtons = document.querySelectorAll('.select-edition');
    const editionSelect = document.getElementById('edition');
    
    editionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const edition = this.getAttribute('data-edition');
            
            // Удаляем активный класс со всех кнопок
            editionButtons.forEach(btn => {
                btn.textContent = 'Выбрать';
            });
            
            // Добавляем активный класс к выбранной кнопке
            this.textContent = 'Выбрано ✓';
            
            // Устанавливаем соответствующее значение в select
            editionSelect.value = edition;
        });
    });
    
    // Выбор способа оплаты
    const paymentMethods = document.querySelectorAll('.payment-method');
    
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Удаляем активный класс со всех методов
            paymentMethods.forEach(m => {
                m.classList.remove('active');
            });
            
            // Добавляем активный класс к выбранному методу
            this.classList.add('active');
        });
    });
    
    // Обработка формы предзаказа
    const orderForm = document.querySelector('.order-form');
    const submitBtn = document.getElementById('submitOrder');
    
    if (submitBtn && orderForm) {
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Простая валидация формы
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const terms = document.getElementById('terms').checked;
            
            if (!firstName || !lastName || !email || !terms) {
                alert('Пожалуйста, заполните все обязательные поля и согласитесь с условиями.');
                return;
            }
            
            // Здесь можно добавить AJAX-запрос для отправки данных на сервер
            alert('Спасибо за предзаказ! Мы отправили подтверждение на вашу электронную почту.');
            
            // Сброс формы (в реальном проекте этого может не быть)
            orderForm.reset();
        });
    }
});
