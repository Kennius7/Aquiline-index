




function toggleDropdownMobile(event) {
    event.preventDefault();
    const dropdown = document.getElementById('dropdownMobile');
    const backdrop = document.getElementById('dropdownBackdrop');
    const chevron = document.getElementById('chevron');
    
    if (dropdown.classList.contains('translate-x-full')) {
        openDropdownMobile();
    } else {
        closeDropdownMobile();
    }
}

let isDropdownOpen = false;

function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('dropdown');
    const chevron = document.getElementById('chevron');

    if (isDropdownOpen) {
        // Close dropdown
        dropdown.classList.remove('open');
        dropdown.style.opacity = '0';
        chevron.style.transform = 'rotate(0deg)';
        isDropdownOpen = false;
    } else {
        // Open dropdown
        dropdown.classList.add('open');
        dropdown.style.opacity = '1';
        chevron.style.transform = 'rotate(180deg)';
        isDropdownOpen = true;
    }
}

document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('dropdown');
    const productsLink = event.target.closest('[onclick="toggleDropdown(event)"]');
    
    if (!productsLink && !dropdown.contains(event.target) && isDropdownOpen) {
        dropdown.classList.remove('open');
        dropdown.style.opacity = '0';
        document.getElementById('chevron').style.transform = 'rotate(0deg)';
        isDropdownOpen = false;
    }
});

function openDropdownMobile() {
    const dropdown = document.getElementById('dropdownMobile');
    const backdrop = document.getElementById('dropdownBackdrop');
    const chevron = document.getElementById('chevron');
    
    // Show backdrop
    backdrop.classList.remove('invisible', 'opacity-0');
    backdrop.classList.add('opacity-100');
    
    // Slide in dropdown
    dropdown.classList.remove('translate-x-full');
    dropdown.classList.add('translate-x-0');
    
    // Rotate icon to X
    chevron.classList.remove('fa-bars');
    chevron.classList.add('fa-times');
    chevron.classList.add('rotate-180');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeDropdownMobile() {
    const dropdown = document.getElementById('dropdownMobile');
    const backdrop = document.getElementById('dropdownBackdrop');
    const chevron = document.getElementById('chevron');
    
    // Hide backdrop
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'invisible');
    
    // Slide out dropdown
    dropdown.classList.remove('translate-x-0');
    dropdown.classList.add('translate-x-full');
    
    // Rotate icon back to bars
    chevron.classList.remove('fa-times', 'rotate-180');
    chevron.classList.add('fa-bars');
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Close dropdown when clicking on menu items
document.querySelectorAll('#dropdownMobile a[href]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(closeDropdownMobile, 100);
    });
});

// Close dropdown on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDropdownMobile();
    }
});











// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .solution-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Initialize charts
    initializeCharts();
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.solution-card, .service-card, .trust-feature, .testimonial-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Counter animation for metrics
    animateCounters();
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });
});

// Initialize Charts using Chart.js (if available) or create simple animated charts
function initializeCharts() {
    // Sentinel Chart
    const sentinelCanvas = document.getElementById('sentinelChart');
    if (sentinelCanvas) {
        createSimpleLineChart(sentinelCanvas);
    }

    // Intelligence Chart
    const intelligenceCanvas = document.getElementById('intelligenceChart');
    if (intelligenceCanvas) {
        createSimpleAreaChart(intelligenceCanvas);
    }

    // Performance Chart
    const performanceCanvas = document.getElementById('performanceChart');
    if (performanceCanvas) {
        createPerformanceChart(performanceCanvas);
    }
}

function createSimpleLineChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    // Sample data points
    const data = [20, 45, 28, 80, 99, 43, 65, 89, 52, 76];
    const padding = 20;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    ctx.strokeStyle = '#c55555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - (value / 100 * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Add dots
    ctx.fillStyle = '#c55555';
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - (value / 100 * chartHeight);
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
}

function createSimpleAreaChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const data = [30, 55, 35, 70, 85, 60, 75, 90, 65, 80];
    const padding = 20;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(74, 144, 226, 0.3)');
    gradient.addColorStop(1, 'rgba(74, 144, 226, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - (value / 100 * chartHeight);
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Add line
    ctx.strokeStyle = '#4a90e2';
    ctx.lineWidth = 2;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - (value / 100 * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

function createPerformanceChart(canvas) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;
    
    const data = [40, 65, 45, 80, 95, 70, 85, 92, 75, 88, 96, 82];
    const padding = 20;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, height - padding);
    gradient.addColorStop(0, 'rgba(197, 85, 85, 0.2)');
    gradient.addColorStop(1, 'rgba(197, 85, 85, 0.05)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - (value / 100 * chartHeight);
        ctx.lineTo(x, y);
    });
    
    ctx.lineTo(width - padding, height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Add smooth line
    ctx.strokeStyle = '#c55555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + (index * chartWidth / (data.length - 1));
        const y = padding + chartHeight - (value / 100 * chartHeight);
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
}

// Animate counters
function animateCounters() {
    const counters = document.querySelectorAll('.performance-value');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = 1563800; // Target value
                const duration = 2000; // Animation duration in ms
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = `₦${Math.floor(current).toLocaleString()}`;
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = `₦${target.toLocaleString()}`;
                    }
                };
                
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => observer.observe(counter));
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-out';
                    progressBar.style.width = width;
                }, 100);
                
                observer.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Call progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
});

// Utility function to debounce scroll events
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

// Optimize scroll performance
const debouncedScroll = debounce(function() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.2;
    
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.style.transform = `translateY(${rate}px)`;
    }
}, 10);

window.addEventListener('scroll', debouncedScroll);

// Form handling (if forms are added)
function handleFormSubmission(formSelector) {
    const form = document.querySelector(formSelector);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                submitBtn.textContent = 'Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                }, 2000);
            }, 1500);
        });
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-menu.active {
        display: flex;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        flex-direction: column;
        padding: 1rem;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .nav-menu.active {
            display: flex;
        }
    }
`;

document.head.appendChild(style);












    // Smooth scrolling for navigation links
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();
    //         const target = document.querySelector(this.getAttribute('href'));
    //         if (target) {
    //             target.scrollIntoView({
    //                 behavior: 'smooth',
    //                 block: 'start'
    //             });
    //         }
    //     });
    // });

    // Add scroll effect to navigation
    // window.addEventListener('scroll', function() {
    //     const nav = document.querySelector('nav');
    //     if (window.scrollY > 100) {
    //         nav.classList.add('bg-dark-navy');
    //         nav.classList.remove('bg-dark-navy/90');
    //     } else {
    //         nav.classList.add('bg-dark-navy/90');
    //         nav.classList.remove('bg-dark-navy');
    //     }
    // });

    // Add hover effects to feature cards
    // const featureCards = document.querySelectorAll('.bg-white');
    // featureCards.forEach(card => {
    //     card.addEventListener('mouseenter', function() {
    //         this.style.transform = 'translateY(-4px)';
    //         this.style.transition = 'all 0.3s ease';
    //     });
        
    //     card.addEventListener('mouseleave', function() {
    //         this.style.transform = 'translateY(0)';
    //     });
    // });

    // Animate stats counters when they come into view
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                animateCounter(target, finalNumber);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            }
        }, 50);
    }

    // Observe all stat numbers
    document.querySelectorAll('.text-3xl.font-bold.text-aquiline-red').forEach(stat => {
        observer.observe(stat);
    });

    // Mobile menu toggle
    // const mobileMenuButton = document.createElement('button');
    // mobileMenuButton.innerHTML = '☰';
    // mobileMenuButton.className = 'md:hidden text-white text-2xl';
    
    // const navLinks = document.querySelector('.hidden.md\\:flex');
    // const navContainer = document.querySelector('.flex.items-center.justify-between');
    
    // mobileMenuButton.addEventListener('click', function() {
    //     navLinks.classList.toggle('hidden');
    //     navLinks.classList.toggle('flex');
    //     navLinks.classList.toggle('flex-col');
    //     navLinks.classList.toggle('absolute');
    //     navLinks.classList.toggle('top-full');
    //     navLinks.classList.toggle('left-0');
    //     navLinks.classList.toggle('w-full');
    //     navLinks.classList.toggle('bg-dark-navy');
    //     navLinks.classList.toggle('p-4');
    //     navLinks.classList.toggle('space-y-4');
    //     navLinks.classList.toggle('space-x-0');
    //     navLinks.classList.toggle('space-x-6');
    // });

    // navContainer.insertBefore(mobileMenuButton, navContainer.lastElementChild);



const indicator = document.getElementById('indicator');
const tabs = document.querySelectorAll('#tabs button');

function moveTab(index) {
    indicator.style.left = `calc(${index * 33.3333}% + 0.25rem)`;
    tabs.forEach((tab, i) => {
        tab.classList.toggle('text-white', i === index);
        tab.classList.toggle('text-gray-400', i !== index);
    });
}













