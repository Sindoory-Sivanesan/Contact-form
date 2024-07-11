document.addEventListener('DOMContentLoaded', () => {
    const contactButton = document.getElementById('contactButton');
    const contactModal = document.getElementById('contactModal');
    const closeModal = document.getElementById('closeModal');
    const contactForm = document.getElementById('contactForm');
    
    const showModal = () => {
        contactModal.style.display = 'block';
    };

    const hideModal = () => {
        contactModal.style.display = 'none';
    };

    const validateForm = () => {
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;

        if (!name) {
            showError('nameError', "Name is required.");
            isValid = false;
        } else {
            hideError('nameError');
        }

        if (!address) {
            showError('addressError', "Address is required.");
            isValid = false;
        } else {
            hideError('addressError');
        }

        const phoneRegex = /^\+94\d{9}$/;
        if (!phoneRegex.test(phone)) {
            showError('phoneError', "Phone number must start with +94 and be followed by 9 digits.");
            isValid = false;
        } else {
            hideError('phoneError');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('emailError', "Invalid email format.");
            isValid = false;
        } else {
            hideError('emailError');
        }

        if (message.length < 10) {
            showError('messageError', "Message must be at least 10 characters long.");
            isValid = false;
        } else {
            hideError('messageError');
        }

        return isValid;
    };

    const showError = (elementId, message) => {
        const errorElement = document.getElementById(elementId);
        errorElement.innerText = message;
        errorElement.style.display = 'block';
    };

    const hideError = (elementId) => {
        const errorElement = document.getElementById(elementId);
        errorElement.style.display = 'none';
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (validateForm()) {
            const contactData = {
                name: document.getElementById('name').value.trim(),
                address: document.getElementById('address').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            localStorage.setItem('contactData', JSON.stringify(contactData));

            alert('Thank you for contacting us!');
            hideModal();
            contactForm.reset();
        }
    };

    contactButton.addEventListener('click', showModal);
    closeModal.addEventListener('click', hideModal);

    window.addEventListener('click', (event) => {
        if (event.target === contactModal) {
            hideModal();
        }
    });

    contactForm.addEventListener('submit', handleFormSubmit);
});
