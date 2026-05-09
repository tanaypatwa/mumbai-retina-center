document.addEventListener('DOMContentLoaded', function () {
    // Force cleanup any stuck dropdown states on page load
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        let isAnimating = false; // Prevent multiple rapid clicks
        
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (isAnimating) return;
            isAnimating = true;
            
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            setTimeout(() => {
                isAnimating = false;
            }, 400);
        });

        // Close menu when a link is clicked (and it's not a dropdown toggle)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown-toggle')) {
                    if (navLinks.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                    // Close any open dropdowns within the mobile nav
                    navLinks.querySelectorAll('.dropdown.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });
    }

    // Dropdown functionality (for mobile primarily, hover handles desktop)
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        ['click', 'touchstart'].forEach(eventType => {
            toggle.addEventListener(eventType, (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.matchMedia('(max-width: 1024px)').matches && navLinks.classList.contains('active')) {
                    toggle.parentElement.classList.toggle('active');
                }
            });
        });
    });

    // Click outside to close mobile nav dropdowns
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active')) { // Only if mobile nav is open
            if (!e.target.closest('.main-nav')) { // If click is outside nav entirely
                 hamburger.classList.remove('active');
                 navLinks.classList.remove('active');
                 navLinks.querySelectorAll('.dropdown.active').forEach(dropdown => {
                     dropdown.classList.remove('active');
                 });
            } else if (!e.target.closest('.dropdown')) { // If click is inside nav but outside a dropdown
                navLinks.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        }
    });

    // Reset mobile nav and dropdown state on window resize
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 1025px)').matches) {
            if (hamburger && navLinks) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Accordion Button (generalized for multiple accordion groups)
    const accordionContainers = document.querySelectorAll('.accordion'); // Get all accordion containers

    accordionContainers.forEach(container => {
        const buttons = container.querySelectorAll('.accordion-button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Find currently active button *within this specific accordion container*
                const currentlyActive = container.querySelector('.accordion-button.active');

                if (currentlyActive && currentlyActive !== button) {
                    currentlyActive.classList.remove('active');
                    const activePanel = currentlyActive.nextElementSibling;
                    if (activePanel) {
                        activePanel.style.maxHeight = null;
                        activePanel.style.padding = '0 25px'; // Keep original padding reset logic
                    }
                }

                button.classList.toggle('active');
                const panel = button.nextElementSibling;
                if (panel) {
                    if (button.classList.contains('active')) {
                        panel.style.padding = '25px'; // Keep original padding logic
                        panel.style.maxHeight = panel.scrollHeight + "px";
                    } else {
                        panel.style.maxHeight = null;
                        panel.style.padding = '0 25px'; // Keep original padding reset logic
                    }
                }
            });
        });
    });

    // Doctor Detail Modal
    const doctorModal = document.getElementById('doctor-modal');
    const viewCredentialsButton = document.querySelector('a[href="#credentials"].cta-button-outline');
    const doctorModalCloseButton = document.querySelector('#doctor-modal .close-button');

    if (doctorModal && viewCredentialsButton && doctorModalCloseButton) {
        viewCredentialsButton.addEventListener('click', function(e) {
            e.preventDefault();
            doctorModal.style.display = 'block';
        });
        doctorModalCloseButton.addEventListener('click', function() {
            doctorModal.style.display = 'none';
        });
        window.addEventListener('click', function(event) {
            if (event.target == doctorModal) {
                doctorModal.style.display = 'none';
            }
        });
    }

    // FAQ Tab and Accordion Functionality
    const faqTabButtons = document.querySelectorAll('.faq-tab-button');
    const faqCategoryContents = document.querySelectorAll('.faq-category-content');
    faqTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            faqTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            faqCategoryContents.forEach(content => content.classList.remove('active'));
            const category = button.dataset.category;
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            const allItems = question.closest('.faq-accordion').querySelectorAll('.faq-item');

            allItems.forEach(i => {
                if (i !== item && i.classList.contains('active')) {
                    i.classList.remove('active');
                    i.querySelector('.faq-answer').style.maxHeight = null;
                }
            });
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Gallery Filtering
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            galleryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                const shouldShow = category === 'all' || itemCategory === category;
                item.style.display = shouldShow ? 'block' : 'none';
                item.classList.toggle('hidden', !shouldShow);
                if (shouldShow) item.style.animation = 'fadeIn 0.5s ease forwards';
            });
        });
    });

    // Gallery Item Click (for potential lightbox)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            // showImageModal(img.src, title, description); // Assuming showImageModal is defined elsewhere or will be
        });
    });

    // Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            // Exclude buttons/links that only trigger modals or other JS actions
            if (hrefAttribute.length > 1 && !this.classList.contains('dropdown-toggle')) {
                const targetElement = document.querySelector(hrefAttribute);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // If mobile nav is open, close it
                    if (navLinks && navLinks.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                         navLinks.querySelectorAll('.dropdown.active').forEach(dropdown => {
                            dropdown.classList.remove('active');
                        });
                    }
                }
            }
        });
    });

    // Enhanced intersection observer for animations (like post-op and gallery items)
    const observeElements = () => {
        const elementsToObserve = document.querySelectorAll('.post-op-category, .resource-item, .gallery-item'); // Add other classes if needed
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    // observer.unobserve(entry.target); // Optional: unobserve after animation
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elementsToObserve.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };
    observeElements(); // Call it to initialize

    // Lightbox functionality for patient education page
    const lightboxModal = document.getElementById('lightbox-modal');
    if (lightboxModal) {
        const lightboxImage = document.getElementById('lightbox-image');
        const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
        const closeBtn = document.querySelector('.lightbox-close');

        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                const imgSrc = this.getAttribute('href');
                lightboxImage.setAttribute('src', imgSrc);
                lightboxModal.classList.add('active');
            });
        });

        function closeModal() {
            lightboxModal.classList.remove('active');
            lightboxImage.setAttribute('src', ''); 
        }

        closeBtn.addEventListener('click', closeModal);
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }
});


// Encapsulate header-specific initializations
function initializeHeaderInteractions() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        let isAnimating = false;
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isAnimating) return;
            isAnimating = true;
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            setTimeout(() => { isAnimating = false; }, 400);
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!e.target.closest('.dropdown-toggle')) {
                    if (navLinks.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navLinks.classList.remove('active');
                    }
                    navLinks.querySelectorAll('.dropdown.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                }
            });
        });
    }

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        ['click', 'touchstart'].forEach(eventType => {
            toggle.addEventListener(eventType, (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (window.matchMedia('(max-width: 1024px)').matches && navLinks && navLinks.classList.contains('active')) {
                    toggle.parentElement.classList.toggle('active');
                }
            });
        });
    });

    // Smooth scrolling for internal anchor links (re-attach if header is dynamic)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const hrefAttribute = this.getAttribute('href');
            if (hrefAttribute.length > 1 && !this.classList.contains('dropdown-toggle')) {
                 // Check if on a different page and link is to an ID on index.html
                const isIndexLink = hrefAttribute.startsWith('#') && window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html');
                if (isIndexLink) {
                    // This case is handled by the path adjustment in loadHeaderFooter.
                    // No special scroll behavior needed here if the link itself is correct.
                    // If direct navigation is preferred: window.location.href = basePath + 'index.html' + hrefAttribute; return;
                } else {
                    const targetElement = document.querySelector(hrefAttribute);
                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({ behavior: 'smooth' });
                        if (navLinks && navLinks.classList.contains('active')) {
                            hamburger.classList.remove('active');
                            navLinks.classList.remove('active');
                            navLinks.querySelectorAll('.dropdown.active').forEach(dropdown => {
                                dropdown.classList.remove('active');
                            });
                        }
                    }
                }
            }
        });
    });
}


// Simple lightbox modal for gallery images (defined outside DOMContentLoaded)
function showImageModal(src, title, description) {
    const existingModal = document.querySelector('.image-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'image-modal';
    // ... (rest of the showImageModal function as provided previously) ...
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content-wrapper">
            <div class="modal-content-inner">
                <button class="modal-close">&times;</button>
                <img src="${src}" alt="${title}">
                <div class="modal-info">
                    <h3>${title}</h3>
                    <p>${description}</p>
                </div>
            </div>
        </div>
    `;

    const modalStyles = `
        .image-modal {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 10000;
            display: flex; align-items: center; justify-content: center; animation: modalFadeIn 0.3s ease;
        }
        .modal-backdrop {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85); cursor: pointer;
        }
        .modal-content-wrapper { /* For centering and max size */
            position: relative; z-index: 1;
            width: 90%; max-width: 800px; /* Max width of modal */
            max-height: 90vh; /* Max height of modal */
            display: flex; flex-direction: column;
        }
        .modal-content-inner {
            background: white; border-radius: 10px; overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.4);
            display: flex; flex-direction: column;
            max-height: 100%; /* Ensure it fits within wrapper */
        }
        .modal-content-inner img {
            width: 100%; height: auto; max-height: 70vh; /* Adjust based on preference */
            object-fit: contain; display: block;
        }
        .modal-close {
            position: absolute; top: 10px; right: 15px;
            background: rgba(0,0,0,0.6); color: white; border: none; font-size: 22px;
            width: 36px; height: 36px; border-radius: 50%; cursor: pointer; z-index: 1001;
            display: flex; align-items: center; justify-content: center; line-height:1;
            transition: background 0.2s ease;
        }
        .modal-close:hover { background: rgba(0,0,0,0.8); }
        .modal-info { padding: 15px 20px; text-align: center; background: #f9f9f9; border-top: 1px solid #eee;}
        .modal-info h3 { margin: 0 0 8px 0; color: var(--primary-color); font-size: 1.1rem; }
        .modal-info p { margin: 0; color: #555; font-size: 0.9rem; }
        @keyframes modalFadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
    `;

    let styleSheet = document.querySelector('#image-modal-styles');
    if (!styleSheet) {
        styleSheet = document.createElement('style');
        styleSheet.id = 'image-modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent background scroll

    const closeModal = () => {
        modal.remove();
        document.body.style.overflow = '';
        document.removeEventListener('keydown', escapeHandler);
    };
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    const escapeHandler = (e) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', escapeHandler);
}

// Note: The call to showImageModal is commented out in the gallery item click listener.
// Uncomment it if actual lightbox functionality is desired.
// Example:
// galleryItems.forEach(item => {
//     item.addEventListener('click', function() {
//         const img = this.querySelector('img');
//         const title = this.querySelector('.gallery-overlay h3').textContent;
//         const description = this.querySelector('.gallery-overlay p').textContent;
//         showImageModal(img.src, title, description);
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    // --- Floating WhatsApp Button ---
    const waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/919930602326';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.className = 'whatsapp-float';
    waBtn.setAttribute('aria-label', 'Chat on WhatsApp');
    waBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>`;
    document.body.appendChild(waBtn);

    // --- Contact Form → WhatsApp ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name    = (contactForm.querySelector('[name="name"]').value || '').trim();
            const email   = (contactForm.querySelector('[name="email"]').value || '').trim();
            const message = (contactForm.querySelector('[name="message"]').value || '').trim();

            const text = [
                `Hi, I'm ${name} and I'm looking to schedule an appointment with Dr. Ajay Dudani at Mumbai Retina Centre.`,
                ``,
                `Email: ${email}`,
                ``,
                message,
            ].join('\n');

            const waUrl = 'https://wa.me/919930602326?text=' + encodeURIComponent(text);
            window.open(waUrl, '_blank', 'noopener,noreferrer');
        });
    }
});
