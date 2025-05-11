document.addEventListener('DOMContentLoaded', function() {
    // Элементы страницы
    const collectorNotice = document.querySelector('.collector-notice');
    const editionSelect = document.getElementById('edition');
    const editionButtons = document.querySelectorAll('.select-edition');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const submitBtn = document.getElementById('submitOrder');
    const orderForm = document.querySelector('.order-form');

    // Функция обновления видимости картинки
    const updateCollectorNotice = (edition) => {
        collectorNotice.style.display = edition === 'collector' ? 'block' : 'none';
    };

    // Обработчики для кнопок выбора издания
    editionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const edition = this.dataset.edition;
            
            // Обновляем выпадающий список
            editionSelect.value = edition;
            
            // Обновляем стили кнопок
            editionButtons.forEach(btn => {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
            });
            this.textContent = 'Выбрано ✓';
            this.style.backgroundColor = 'var(--primary)';
            
            // Обновляем картинку
            updateCollectorNotice(edition);
        });
    });

    // Обработчик для выпадающего списка
    editionSelect.addEventListener('change', function() {
        const edition = this.value;
        
        // Обновляем кнопки
        editionButtons.forEach(btn => {
            if (btn.dataset.edition === edition) {
                btn.textContent = 'Выбрано ✓';
                btn.style.backgroundColor = 'var(--primary)';
            } else {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
            }
        });
        
        // Обновляем картинку
        updateCollectorNotice(edition);
    });

    // Обработчики для способов оплаты
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Обработчик отправки формы
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Валидация формы
        const requiredFields = [
            document.getElementById('firstName'),
            document.getElementById('lastName'),
            document.getElementById('email'),
            document.getElementById('terms')
        ];
        
        let isValid = true;
        requiredFields.forEach(field => {
            if (!field.value && field.type !== 'checkbox') {
                isValid = false;
                field.classList.add('error');
            } else if (field.type === 'checkbox' && !field.checked) {
                isValid = false;
                field.parentElement.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert('Пожалуйста, заполните все обязательные поля и согласитесь с условиями.');
            return;
        }
        
        // Формирование данных
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            edition: editionSelect.options[editionSelect.selectedIndex].text,
            platform: document.getElementById('platform').options[document.getElementById('platform').selectedIndex].text,
            payment: document.querySelector('.payment-method.active').dataset.method
        };
        
        // Имитация отправки
        console.log('Отправленные данные:', formData);
        alert(`Спасибо за предзаказ, ${formData.firstName}!\nПодробности отправлены на ${formData.email}`);
        
        // Сброс формы
        orderForm.reset();
        editionButtons.forEach(btn => {
            btn.textContent = 'Выбрать';
            btn.style.backgroundColor = '';
        });
        collectorNotice.style.display = 'none';
    });

    // Инициализация при загрузке
    updateCollectorNotice(editionSelect.value);
});
