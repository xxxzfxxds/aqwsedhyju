document.addEventListener('DOMContentLoaded', function() {
    const collectorNotice = document.querySelector('.collector-notice');
    const editionSelect = document.getElementById('edition');
    const editionButtons = document.querySelectorAll('.select-edition');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const submitBtn = document.getElementById('submitOrder');
    const orderForm = document.querySelector('.order-form');

    // Обновление уведомления о коллекционном издании
    function updateCollectorNotice(edition) {
        if (edition === 'collector') {
            collectorNotice.style.display = 'block';
            collectorNotice.innerHTML = `
                <div class="collector-content">
                    <img src="img/collectors-edition.jpg" alt="Коллекционное издание">
                    <p>Эксклюзивное коллекционное издание включает:</p>
                    <ul>
                        <li>Физический артбук с концептами</li>
                        <li>Набор редких семян</li>
                        <li>Сертификат подлинности</li>
                    </ul>
                </div>
            `;
        } else {
            collectorNotice.style.display = 'none';
        }
    }

    // Обработчики для кнопок выбора издания
    editionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const edition = this.dataset.edition;
            editionSelect.value = edition;
            
            editionButtons.forEach(btn => {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            });
            
            this.textContent = 'Выбрано ✓';
            this.style.backgroundColor = var(--primary);
            this.style.color = 'white';
            
            updateCollectorNotice(edition);
        });
    });

    // Обработчик для выпадающего списка
    editionSelect.addEventListener('change', function() {
        const edition = this.value;
        updateCollectorNotice(edition);
        
        editionButtons.forEach(btn => {
            if (btn.dataset.edition === edition) {
                btn.textContent = 'Выбрано ✓';
                btn.style.backgroundColor = var(--primary);
                btn.style.color = 'white';
            } else {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
                btn.style.color = '';
            }
        });
    });

    // Обработчики для способов оплаты
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => {
                m.classList.remove('active');
                m.querySelector('img').style.filter = 'grayscale(100%) brightness(0.5)';
            });
            
            this.classList.add('active');
            this.querySelector('img').style.filter = 'none';
        });
    });

    // Валидация формы
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const requiredFields = [
            { element: document.getElementById('firstName'), name: 'Имя' },
            { element: document.getElementById('lastName'), name: 'Фамилия' },
            { element: document.getElementById('email'), name: 'Email' },
            { element: document.getElementById('terms'), name: 'Согласие', isCheckbox: true }
        ];
        
        let isValid = true;
        let errorMessage = 'Пожалуйста, заполните следующие поля:\n';
        
        requiredFields.forEach(field => {
            if ((field.isCheckbox && !field.element.checked) || 
                (!field.isCheckbox && !field.element.value.trim())) {
                isValid = false;
                errorMessage += `- ${field.name}\n`;
                field.element.classList.add('error');
            } else {
                field.element.classList.remove('error');
            }
        });
        
        if (!isValid) {
            alert(errorMessage);
            return;
        }
        
        // Имитация отправки формы
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            edition: editionSelect.options[editionSelect.selectedIndex].text,
            payment: document.querySelector('.payment-method.active').dataset.method
        };
        
        console.log('Данные формы:', formData);
        
        // Показ сообщения об успехе
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = `
            <h3>Спасибо за предзаказ, ${formData.firstName}!</h3>
            <p>Подтверждение отправлено на ${formData.email}</p>
            <p>Вы выбрали: ${formData.edition}</p>
        `;
        
        orderForm.parentNode.insertBefore(successMessage, orderForm.nextSibling);
        orderForm.reset();
        
        // Плавная прокрутка к сообщению
        setTimeout(() => {
            successMessage.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        
        // Обновление состояния кнопок
        editionButtons.forEach(btn => {
            btn.textContent = 'Выбрать';
            btn.style.backgroundColor = '';
            btn.style.color = '';
        });
        
        collectorNotice.style.display = 'none';
    });

    // Инициализация при загрузке
    updateCollectorNotice(editionSelect.value);
});
