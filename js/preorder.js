document.addEventListener('DOMContentLoaded', function() {
    const collectorNotice = document.querySelector('.collector-notice');
    const editionSelect = document.getElementById('edition');
    const editionButtons = document.querySelectorAll('.select-edition');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const submitBtn = document.getElementById('submitOrder');
    const orderForm = document.querySelector('.order-form');

    function updateCollectorNotice(edition) {
        collectorNotice.style.display = edition === 'collector' ? 'block' : 'none';
    }

    editionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const edition = this.dataset.edition;
            editionSelect.value = edition;
            
            editionButtons.forEach(btn => {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
            });
            this.textContent = 'Выбрано ✓';
            this.style.backgroundColor = 'var(--primary)';
            
            updateCollectorNotice(edition);
        });
    });

    editionSelect.addEventListener('change', function() {
        const edition = this.value;
        editionButtons.forEach(btn => {
            if (btn.dataset.edition === edition) {
                btn.textContent = 'Выбрано ✓';
                btn.style.backgroundColor = 'var(--primary)';
            } else {
                btn.textContent = 'Выбрать';
                btn.style.backgroundColor = '';
            }
        });
        updateCollectorNotice(edition);
    });

    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
        });
    });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
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
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            edition: editionSelect.options[editionSelect.selectedIndex].text,
            payment: document.querySelector('.payment-method.active').dataset.method
        };
        
        console.log('Отправленные данные:', formData);
        alert(`Спасибо за предзаказ, ${formData.firstName}!\nПодробности отправлены на ${formData.email}`);
        
        orderForm.reset();
        editionButtons.forEach(btn => {
            btn.textContent = 'Выбрать';
            btn.style.backgroundColor = '';
        });
        collectorNotice.style.display = 'none';
    });

    updateCollectorNotice(editionSelect.value);
});
