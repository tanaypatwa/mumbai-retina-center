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

// Function to load header and footer
function loadHeaderFooter() {
    const currentPagePath = window.location.pathname;
    // Simplified isRoot check: ends with / or index.html or has no extension in the last segment
    const isRoot = currentPagePath.endsWith('/') || currentPagePath.endsWith('index.html') || !currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1).includes('.');

    // Calculate depth based on segments. Assumes script.js is at the root.
    // Example: / => 0 segments after host
    // /index.html => 1 segment
    // /conditions/ => 1 segment (trailing slash means it's like a directory access)
    // /conditions/foo.html => 2 segments
    let pathSegments = currentPagePath.split('/').filter(segment => segment.length > 0);
    if (currentPagePath.endsWith('/')) { // for paths like /conditions/
        // effectively one less deep than if it were a file in that dir.
        // but our base path logic will handle this by not adding ../ for the last segment if it's empty
    } else if (!currentPagePath.substring(currentPagePath.lastIndexOf('/') + 1).includes('.')) {
        // if path is like /about or /services (no extension), treat as root or one level
        // this case is tricky without knowing server config. Assume it acts like index.html at that path.
    }


    // Determine base path for assets and components
    // If script.js is at root, and HTML is in 'conditions/', then basePath needs to be '../'
    // If HTML is at root, basePath is ''
    // If HTML is at 'conditions/subdir/', basePath needs to be '../../'

    let depth = 0;
    const pathParts = window.location.pathname.split('/').filter(part => part !== '');
    // If the last part does not contain a '.', it's likely a directory or a clean URL.
    // If it's index.html or empty (root), depth is 0 relative to script.js at root.
    // If it's e.g., /conditions/page.html, pathParts is ['conditions', 'page.html']. Depth should be 1.
    // If it's e.g., /conditions/, pathParts is ['conditions']. Depth should be 1.
    if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1];
        if (lastPart !== 'index.html' && lastPart.includes('.')) { // It's a file not at root
            depth = pathParts.length - 1;
        } else if (!lastPart.includes('.')) { // It's a directory like /conditions/ or a clean URL /conditions
             depth = pathParts.length;
             // Special case for root paths that are not just "/" e.g. /patient-education (no .html)
             // these should be treated as depth 0 if they are actual files at root.
             // This logic is hard without knowing server rewrite rules.
             // For now, assume if no extension, and not 'index.html', it's like a directory.
             // Let's refine: if it's not index.html and has no extension, it's like a file at that depth.
             // So, /patient-education is like /patient-education.html, depth 0.
             // /conditions/retinal-detachment is like /conditions/retinal-detachment.html, depth 1.
             const knownRootFilesWithoutExtensions = ['patient-education', 'services', 'technology'];
             if (pathParts.length === 1 && knownRootFilesWithoutExtensions.includes(lastPart)) {
                 depth = 0;
             }

        }
    }


    let basePath = '';
    if (depth > 0) {
        basePath = '../'.repeat(depth);
    }

    // Create header element
    let headerElement = document.createElement('div');
    headerElement.setAttribute('id', 'main-header-wrapper'); // Assign an ID for potential styling/selection
    document.body.prepend(headerElement);

    fetch(basePath + '_header.html')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load _header.html: ${response.statusText}`);
            return response.text();
        })
        .then(data => {
            const adjustedData = data
                .replace(/assets\//g, basePath + 'assets/')
                .replace(/href="((?!https?:\/\/)[^"#]+\.html|[^"#]*#)/g, (match, p1) => {
                    // For href="page.html" or href="page.html#section" or href="#section"
                    if (p1.startsWith('#')) { // Same-page anchor like href="#about"
                        return isRoot ? match : `href="${basePath}index.html${p1}"`;
                    } else if (p1.includes('.html#')) { // Cross-page anchor like href="services.html#detail"
                        return `href="${basePath}${p1}"`;
                    } else { // Regular page link like href="services.html"
                        return `href="${basePath}${p1}"`;
                    }
                });
            headerElement.innerHTML = adjustedData;
            initializeHeaderInteractions(); // Crucial: re-run JS for dynamic elements in header
        })
        .catch(error => console.error('Error loading header:', error));

    // Create footer element
    let footerElement = document.createElement('div');
    footerElement.setAttribute('id', 'main-footer-wrapper'); // Assign an ID
    document.body.appendChild(footerElement);

    fetch(basePath + '_footer.html')
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load _footer.html: ${response.statusText}`);
            return response.text();
        })
        .then(data => {
            const adjustedData = data
                .replace(/assets\//g, basePath + 'assets/')
                 .replace(/href="((?!https?:\/\/)[^"#]+\.html|[^"#]*#)/g, (match, p1) => {
                    if (p1.startsWith('#')) {
                        return isRoot ? match : `href="${basePath}index.html${p1}"`;
                    } else if (p1.includes('.html#')) {
                        return `href="${basePath}${p1}"`;
                    } else {
                        return `href="${basePath}${p1}"`;
                    }
                });
            footerElement.innerHTML = adjustedData;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Call loadHeaderFooter when the DOM is ready
document.addEventListener('DOMContentLoaded', loadHeaderFooter);

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
