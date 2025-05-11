document.addEventListener('DOMContentLoaded', function() {
    // Выбор издания
    const editionButtons = document.querySelectorAll('.select-edition');
    const editionSelect = document.getElementById('edition');
    
    // Создаем элемент для всплывающей картинки
    const popupImage = document.createElement('div');
    popupImage.className = 'popup-image';
    popupImage.innerHTML = `
        <div class="popup-content">
            <button class="close-popup">&times;</button>
            <img src="https://images.unsplash.com/photo-1583511655826-05700d52f4d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Коллекционное издание">
            <p>Коллекционное издание включает эксклюзивную фигурку героя, артбук и другие ценные предметы!</p>
        </div>
    `;
    document.body.appendChild(popupImage);
    
    editionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const edition = this.getAttribute('data-edition');
            
            // Удаляем активный класс со всех кнопок
            editionButtons.forEach(btn => {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
            });
            
            // Добавляем активный класс к выбранной кнопке
            this.textContent = 'Выбрано ✓';
            this.style.backgroundColor = 'var(--primary)';
            
            // Устанавливаем соответствующее значение в select
            editionSelect.value = edition;
            
            // Показываем всплывающую картинку для коллекционного издания
            if (edition === 'collector') {
                popupImage.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
            } else {
                document.body.style.overflow = ''; // Восстанавливаем прокрутку
            }
        });
    });
    
    // Закрытие всплывающей картинки
    const closePopup = document.querySelector('.close-popup');
    if (closePopup) {
        closePopup.addEventListener('click', function() {
            popupImage.style.display = 'none';
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        });
    }
    
    // Закрытие при клике вне картинки
    popupImage.addEventListener('click', function(e) {
        if (e.target === this) {
            popupImage.style.display = 'none';
            document.body.style.overflow = ''; // Восстанавливаем прокрутку
        }
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
            const edition = editionSelect.value;
            const platform = document.getElementById('platform').value;
            
            // Формируем сообщение с выбранными параметрами
            let message = `Спасибо за предзаказ!\n\n`;
            message += `Имя: ${firstName} ${lastName}\n`;
            message += `Email: ${email}\n`;
            message += `Издание: ${editionSelect.options[editionSelect.selectedIndex].text}\n`;
            message += `Платформа: ${document.getElementById('platform').options[document.getElementById('platform').selectedIndex].text}\n\n`;
            message += `Мы отправили подтверждение на вашу электронную почту.`;
            
            alert(message);
            
            // Сброс формы (в реальном проекте этого может не быть)
            orderForm.reset();
            
            // Сбрасываем выбор издания
            editionButtons.forEach(btn => {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
            });
        });
    }
});
