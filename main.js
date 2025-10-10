// ===== ESCUADRÓN 404 - MAIN JAVASCRIPT =====

// Configuración de endpoints (PLACEHOLDERS)
const CONFIG = {
    FORM_ENDPOINT: 'FORM_ENDPOINT_PLACEHOLDER', // Reemplazar con URL real
    DISCORD_INVITE: 'https://discord.gg/QQZmhGQncf', // Link real de Discord
    WHATSAPP_NUMBER: '573165102584' // Número de WhatsApp (formato internacional)
};

// DOM Elements
let navbarToggle, navbarMobile, bootcampForm, contactForm, proyectoFilters, proyectoCards;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeNavigation();
    initializeForms();
    initializeProjectFilters();
    initializeSmoothScrolling();
    initializeScrollReveal();
});

// Initialize DOM elements
function initializeElements() {
    navbarToggle = document.querySelector('.navbar-toggle');
    navbarMobile = document.querySelector('.navbar-mobile');
    bootcampForm = document.getElementById('bootcamp-form');
    contactForm = document.getElementById('contact-form');
    proyectoFilters = document.querySelectorAll('.proyecto-filter');
    proyectoCards = document.querySelectorAll('.proyecto-card');
}

// Navigation functionality - Clean and simple
function initializeNavigation() {
    if (!navbarToggle || !navbarMobile) return;
    
    // Toggle mobile menu
    navbarToggle.addEventListener('click', function() {
        navbarToggle.classList.toggle('active');
        navbarMobile.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = navbarMobile.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbarToggle.classList.remove('active');
            navbarMobile.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarToggle.contains(event.target) || navbarMobile.contains(event.target);
        if (!isClickInside && navbarMobile.classList.contains('active')) {
            navbarToggle.classList.remove('active');
            navbarMobile.classList.remove('active');
        }
    });
    
    // Update active navigation on scroll
    window.addEventListener('scroll', updateActiveNavigation);
}

// Update active navigation based on scroll position
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-purple-400', 'font-semibold', 'active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('text-purple-400', 'font-semibold', 'active');
        }
    });
}

// Form handling
function initializeForms() {
    // Bootcamp form
    if (bootcampForm) {
        bootcampForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBootcampForm();
        });
    }
    
    // Contact form
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm();
        });
    }
}

// Handle bootcamp form submission
async function handleBootcampForm() {
    const formData = new FormData(bootcampForm);
    const data = Object.fromEntries(formData.entries());
    
    // Add form type identifier
    data.formType = 'bootcamp';
    data.timestamp = new Date().toISOString();
    
    try {
        showLoadingState(bootcampForm);
        
        const success = await submitFormData(data);
        
        if (success) {
            showMessage('¡Gracias por tu interés! Te contactaremos pronto.', 'success');
            bootcampForm.reset();
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        console.error('Error submitting bootcamp form:', error);
        showMessage('Hubo un error al enviar el formulario. Inténtalo nuevamente.', 'error');
    } finally {
        hideLoadingState(bootcampForm);
    }
}

// Handle contact form submission
async function handleContactForm() {
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Add form type identifier
    data.formType = 'contact';
    data.timestamp = new Date().toISOString();
    
    try {
        showLoadingState(contactForm);
        
        const success = await submitFormData(data);
        
        if (success) {
            showMessage('¡Mensaje enviado! Nos pondremos en contacto contigo pronto.', 'success');
            contactForm.reset();
        } else {
            throw new Error('Error en el envío');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showMessage('Hubo un error al enviar el formulario. Inténtalo nuevamente.', 'error');
    } finally {
        hideLoadingState(contactForm);
    }
}

// Submit form data to endpoint or fallback to mailto
async function submitFormData(data) {
    // Try to submit to configured endpoint first
    if (CONFIG.FORM_ENDPOINT !== 'FORM_ENDPOINT_PLACEHOLDER') {
        try {
            const response = await fetch(CONFIG.FORM_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                return true;
            } else {
                throw new Error(`HTTP ${response.status}`);
            }
        } catch (error) {
            console.error('Endpoint submission failed:', error);
            // Fall through to mailto fallback
        }
    }
    
    // Fallback to mailto
    const subject = data.formType === 'bootcamp' 
        ? `Pre-registro Bootcamp - ${data.name}`
        : `Consulta Empresarial - ${data.empresa}`;
    
    const body = formatEmailBody(data);
    const mailtoLink = `mailto:contacto@escuadron404.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoLink;
    return true;
}

// Format email body for mailto fallback
function formatEmailBody(data) {
    let body = '';
    
    if (data.formType === 'bootcamp') {
        body = `
Solicitud de Pre-registro para Bootcamp

Información del Candidato:
- Nombre: ${data.name}
- Email: ${data.email}
- Teléfono: ${data.phone || 'No proporcionado'}
- Experiencia: ${data.experience || 'No especificada'}

Motivación:
${data.motivation || 'No proporcionada'}

Fecha de envío: ${new Date().toLocaleString('es-ES')}
        `.trim();
    } else {
        body = `
Consulta Empresarial

Información de la Empresa:
- Empresa: ${data.empresa}
- Contacto: ${data.nombreContacto}
- Email: ${data.emailCorporativo}
- Teléfono: ${data.telefono}

Detalles del Proyecto:
- Tipo de servicio: ${data.tipoServicio}
- Presupuesto aproximado: ${data.presupuesto || 'No especificado'}

Descripción del proyecto:
${data.descripcionProyecto}

Fecha de envío: ${new Date().toLocaleString('es-ES')}
        `.trim();
    }
    
    return body;
}

// Show loading state for forms
function showLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Enviando...';
    }
}

// Hide loading state for forms
function hideLoadingState(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.disabled = false;
        const originalText = form.id === 'bootcamp-form' ? 'Enviar Pre-registro' : 'Enviar Solicitud';
        submitButton.innerHTML = `<i class="fas fa-paper-plane mr-2"></i>${originalText}`;
    }
}

// Project filter functionality
function initializeProjectFilters() {
    if (proyectoFilters.length === 0) return;
    
    proyectoFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const targetFilter = this.getAttribute('data-filter');
            
            // Update active filter button
            proyectoFilters.forEach(f => {
                f.classList.remove('active', 'bg-purple-600', 'text-white');
                f.classList.add('text-gray-400');
            });
            
            this.classList.add('active', 'bg-purple-600', 'text-white');
            this.classList.remove('text-gray-400');
            
            // Filter project cards
            filterProjects(targetFilter);
        });
    });
}

// Filter projects based on status
function filterProjects(filter) {
    proyectoCards.forEach(card => {
        const cardStatus = card.getAttribute('data-status');
        
        if (filter === 'all' || cardStatus === filter) {
            card.style.display = 'block';
            card.classList.add('fade-in');
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in');
        }
    });
}

// Initialize Discord invite links
function initializeDiscordLinks() {
    // Solo manejar enlaces que aún usen placeholders
    const discordLinks = document.querySelectorAll('a[href="#discord-invite"]');
    
    discordLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (CONFIG.DISCORD_INVITE !== 'https://discord.gg/INVITE_CODE_PLACEHOLDER') {
                window.open(CONFIG.DISCORD_INVITE, '_blank');
            } else {
                showMessage('El enlace de Discord aún no está configurado. Contacta al administrador.', 'warning');
            }
        });
    });
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#discord-invite') {
                // Handle Discord invite links separately
                return;
            }
            
            // Only prevent default for valid anchor links
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed nav
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize scroll reveal animations
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Add scroll reveal to sections
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.classList.add('scroll-reveal');
        section.style.animationDelay = `${index * 0.1}s`;
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
}

// Show message notification
function showMessage(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.getElementById('notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.id = 'notification';
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
    
    // Set colors based on type
    let bgColor, textColor, icon;
    switch (type) {
        case 'success':
            bgColor = 'bg-green-500';
            textColor = 'text-white';
            icon = 'fas fa-check-circle';
            break;
        case 'error':
            bgColor = 'bg-red-500';
            textColor = 'text-white';
            icon = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            bgColor = 'bg-yellow-500';
            textColor = 'text-white';
            icon = 'fas fa-exclamation-triangle';
            break;
        default:
            bgColor = 'bg-blue-500';
            textColor = 'text-white';
            icon = 'fas fa-info-circle';
    }
    
    notification.classList.add(bgColor, textColor);
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="${icon} mr-3"></i>
            <span class="flex-1">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add CSS for scroll reveal animation
const style = document.createElement('style');
style.textContent = `
    .scroll-reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .scroll-reveal.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .fade-in {
        animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

document.head.appendChild(style);

// Export for potential external use
window.Escuadron404 = {
    showMessage,
    CONFIG
};

// ===== INTERACTIVE CALENDAR COMPONENT =====
class ProjectCalendar {
    constructor() {
        this.currentDate = new Date();
        this.currentMonth = this.currentDate.getMonth();
        this.currentYear = this.currentDate.getFullYear();
        this.selectedDate = null;
        
        // Sample event calendar (workshops, meetups, hackathons)
        this.events = {
            '2025-10-10': { type: 'workshop', title: 'Workshop: React Avanzado' },
            '2025-10-15': { type: 'has-event', title: 'Tech Meetup' },
            '2025-10-20': { type: 'meetup', title: 'Networking Night' },
            '2025-10-25': { type: 'has-event', title: 'Hackathon Fintech' },
            '2025-11-5': { type: 'workshop', title: 'Workshop: Node.js' },
            '2025-11-12': { type: 'meetup', title: 'Coffee & Code' },
            '2025-11-18': { type: 'has-event', title: 'Tech Talk: IA' },
            '2025-11-27': { type: 'workshop', title: 'Workshop: Python' },
            '2025-12-10': { type: 'has-event', title: 'Conferencia Anual' },
            '2025-12-15': { type: 'meetup', title: 'Cierre de Año' }
        };
        
        this.monthNames = [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];
        
        this.init();
    }
    
    init() {
        // Check if calendar elements exist
        const calendarDays = document.getElementById('calendarDays');
        if (!calendarDays) return;
        
        this.calendarDays = calendarDays;
        this.currentMonthElement = document.getElementById('currentMonth');
        this.prevMonthBtn = document.getElementById('prevMonth');
        this.nextMonthBtn = document.getElementById('nextMonth');
        
        // Event listeners
        this.prevMonthBtn.addEventListener('click', () => this.previousMonth());
        this.nextMonthBtn.addEventListener('click', () => this.nextMonth());
        
        // Render initial calendar
        this.renderCalendar();
    }
    
    renderCalendar() {
        // Clear previous days
        this.calendarDays.innerHTML = '';
        
        // Update month/year display (capitalize for vintage style)
        this.currentMonthElement.textContent = `${this.monthNames[this.currentMonth]} ${this.currentYear}`;
        
        // Get first day of month and number of days
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
        
        // Add previous month's trailing days
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            const dayElement = this.createDayElement(day, 'other-month');
            this.calendarDays.appendChild(dayElement);
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = this.createDayElement(day, 'current-month');
            
            // Check if it's today
            const today = new Date();
            if (day === today.getDate() && 
                this.currentMonth === today.getMonth() && 
                this.currentYear === today.getFullYear()) {
                dayElement.classList.add('today');
            }
            
            // Check for events
            const eventKey = `${this.currentYear}-${this.currentMonth + 1}-${day}`;
            if (this.events[eventKey]) {
                dayElement.classList.add(this.events[eventKey].type);
                dayElement.title = this.events[eventKey].title;
            }
            
            this.calendarDays.appendChild(dayElement);
        }
        
        // Add next month's leading days
        const totalCells = this.calendarDays.children.length;
        const remainingCells = 42 - totalCells; // 6 rows × 7 days
        
        for (let day = 1; day <= remainingCells; day++) {
            const dayElement = this.createDayElement(day, 'other-month');
            this.calendarDays.appendChild(dayElement);
        }
    }
    
    createDayElement(day, monthType) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        if (monthType === 'other-month') {
            dayElement.classList.add('other-month');
        }
        
        // Add click event
        dayElement.addEventListener('click', () => {
            this.selectDate(day, monthType);
        });
        
        return dayElement;
    }
    
    selectDate(day, monthType) {
        // Remove previous selection
        document.querySelectorAll('.calendar-day').forEach(el => {
            el.classList.remove('selected');
        });
        
        // Add selection to clicked day
        event.target.classList.add('selected');
        
        // Store selected date
        if (monthType === 'current-month') {
            this.selectedDate = new Date(this.currentYear, this.currentMonth, day);
            console.log('Selected date:', this.selectedDate.toLocaleDateString('es-ES'));
        }
    }
    
    previousMonth() {
        this.currentMonth--;
        if (this.currentMonth < 0) {
            this.currentMonth = 11;
            this.currentYear--;
        }
        this.renderCalendar();
    }
    
    nextMonth() {
        this.currentMonth++;
        if (this.currentMonth > 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }
        this.renderCalendar();
    }
    
    // Public method to add events
    addEvent(date, type, title) {
        const eventKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        this.events[eventKey] = { type, title };
        this.renderCalendar();
    }
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with calendar
    if (document.getElementById('calendarDays')) {
        const calendar = new ProjectCalendar();
        
        // Make calendar accessible globally
        window.projectCalendar = calendar;
    }
});