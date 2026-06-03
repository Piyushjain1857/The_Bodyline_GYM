document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Exclude modal buttons
            if (this.classList.contains('btn') && this.closest('.pricing-card')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for sticky header height
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();

    // --- Testimonial Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentSlide = 0;

    const showSlide = (index) => {
        // Handle wrapping
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Show current slide
        slides[currentSlide].classList.add('active');
    };

    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Button event listeners
    nextBtn.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        resetInterval();
    });

    const resetInterval = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    };

    // --- Modal Popup Logic ---
    const planModal = document.getElementById('plan-modal');
    const closeBtn = planModal.querySelector('.close-btn');
    const selectPlanBtns = document.querySelectorAll('.pricing-card .btn');

    // Open modal when any "Select Plan" button is clicked
    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            planModal.classList.add('active');
        });
    });

    // Close modal on close button click
    closeBtn.addEventListener('click', () => {
        planModal.classList.remove('active');
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === planModal) {
            planModal.classList.remove('active');
        }
    });

    // --- Service Details Modal Logic ---
    const serviceDetails = {
        'Weight Training': {
            desc: 'Our Weight Training program focuses on building raw power, increasing muscle mass, and improving overall body composition. You will learn proper form for compound lifts like squats, deadlifts, and bench presses under the guidance of expert powerlifters and bodybuilders.',
            schedule: 'Mon, Wed, Fri - 6:00 AM & 7:00 PM'
        },
        'Crossfit & Functional': {
            desc: 'Experience high-intensity interval training (HIIT) that incorporates olympic weightlifting, gymnastics, and cardiovascular endurance. These functional movements are designed to prepare your body for real-life physical challenges while torching calories.',
            schedule: 'Tue, Thu - 6:30 AM & 6:30 PM | Sat - 9:00 AM'
        },
        'Yoga & Flexibility': {
            desc: 'Find your inner zen while improving mobility, flexibility, and core strength. Our yoga sessions range from restorative Yin Yoga to dynamic Vinyasa flows, perfect for both active recovery and building lean muscle endurance in a calming environment.',
            schedule: 'Mon, Wed, Fri - 7:00 AM | Sun - 8:00 AM'
        },
        'Personal Training': {
            desc: 'Get 1-on-1 coaching completely customized to your unique fitness goals, body type, and limitations. Our certified PTs provide accountability, advanced training techniques, and comprehensive progress tracking to guarantee results faster.',
            schedule: 'By Appointment (Flexible 24/7)'
        },
        'Nutrition & Diet': {
            desc: 'Fitness is 80% diet. Work with our certified nutritionists to develop personalized meal plans that align with your goals—whether it is fat loss, muscle gain, or performance enhancement. Includes weekly check-ins and macro adjustments.',
            schedule: 'Consultations: Mon-Fri 10:00 AM - 4:00 PM'
        },
        'Cardio & Endurance': {
            desc: 'Push your stamina to the limit with our elite cardiovascular programs. Featuring state-of-the-art treadmills, ellipticals, rowing machines, and spin bikes. Perfect for improving heart health, lung capacity, and maximizing calorie burn.',
            schedule: 'Daily - Available 24/7'
        }
    };

    const serviceModal = document.getElementById('service-modal');
    const serviceCloseBtn = document.querySelector('.service-close-btn');
    const serviceLinks = document.querySelectorAll('.service-link');
    const serviceTitle = document.getElementById('service-modal-title');
    const serviceDesc = document.getElementById('service-modal-desc');
    const serviceSchedule = document.getElementById('service-modal-schedule');
    const serviceJoinBtn = document.getElementById('service-join-btn');

    serviceLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const card = link.closest('.service-card');
            const title = card.querySelector('.service-title').textContent.trim();
            
            if (serviceDetails[title]) {
                serviceTitle.textContent = title;
                serviceDesc.innerHTML = `<p>${serviceDetails[title].desc}</p>`;
                serviceSchedule.textContent = serviceDetails[title].schedule;
            } else {
                serviceTitle.textContent = title;
                serviceDesc.innerHTML = `<p>Learn more about our ${title} program and start achieving your fitness goals today!</p>`;
                serviceSchedule.textContent = 'Contact us for schedule';
            }
            
            serviceModal.classList.add('active');
        });
    });

    serviceCloseBtn.addEventListener('click', () => {
        serviceModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === serviceModal) {
            serviceModal.classList.remove('active');
        }
    });

    serviceJoinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        serviceModal.classList.remove('active');
        planModal.classList.add('active'); // Open contact modal from service modal
    });

});
