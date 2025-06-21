document.addEventListener('DOMContentLoaded', function () {
    const accordionButtons = document.querySelectorAll('.accordion-button');

    accordionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-button.active');
            if (currentlyActive && currentlyActive !== button) {
                currentlyActive.classList.remove('active');
                currentlyActive.nextElementSibling.style.maxHeight = 0;
                currentlyActive.nextElementSibling.style.padding = '0 20px';
            }

            button.classList.toggle('active');
            const panel = button.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
                panel.style.padding = '0 20px';
            } else {
                panel.style.padding = '0 20px'; // Apply padding before calculating height
                panel.style.maxHeight = panel.scrollHeight + 40 + 'px'; // 20px top + 20px bottom padding
            }
        });
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const mediaContents = document.querySelectorAll('.media-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const tab = button.dataset.tab;
            mediaContents.forEach(content => {
                if (content.id === tab) {
                    content.classList.add('active');
                } else {
                    content.classList.remove('active');
                }
            });
        });
    });

    // Modal logic
    const modal = document.getElementById('doctor-modal');
    const closeBtn = document.querySelector('.close-button');

    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // FAQ functionality
    const faqTabButtons = document.querySelectorAll('.faq-tab-button');
    const faqCategoryContents = document.querySelectorAll('.faq-category-content');

    faqTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all tab buttons
            faqTabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Hide all category contents
            faqCategoryContents.forEach(content => content.classList.remove('active'));
            
            // Show selected category content
            const category = button.dataset.category;
            const targetContent = document.getElementById(category);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // FAQ accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');

            // Close all other FAQ items in the same category
            const categoryContent = question.closest('.faq-category-content');
            const allQuestionsInCategory = categoryContent.querySelectorAll('.faq-question');
            const allAnswersInCategory = categoryContent.querySelectorAll('.faq-answer');

            allQuestionsInCategory.forEach(q => q.classList.remove('active'));
            allAnswersInCategory.forEach(a => {
                a.classList.remove('active');
                a.style.maxHeight = '0';
            });

            // If this wasn't active, open it
            if (!isActive) {
                question.classList.add('active');
                answer.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Contact form submission (placeholder)
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const urgency = formData.get('urgency');
            
            // Simple validation
            if (!name || !phone) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Show success message (in real implementation, this would send to server)
            alert(`Thank you, ${name}! We will contact you within 24 hours regarding your ${urgency} consultation request.`);
            
            // Reset form
            contactForm.reset();
        });
    }
});

// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryItems = document.querySelectorAll('.gallery-item');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Remove active class from all tabs
            galleryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    item.classList.remove('hidden');
                    // Add animation
                    item.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    item.style.display = 'none';
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Add click handlers for gallery items (optional lightbox functionality)
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('.gallery-overlay h3').textContent;
            const description = this.querySelector('.gallery-overlay p').textContent;
            
            // Simple modal/lightbox functionality
            showImageModal(img.src, title, description);
        });
    });
});

// Simple lightbox modal for gallery images
function showImageModal(src, title, description) {
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <img src="${src}" alt="${title}">
            <div class="modal-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;

    // Add styles dynamically
    const modalStyles = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: modalFadeIn 0.3s ease;
        }
        .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            cursor: pointer;
        }
        .modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        .modal-content img {
            width: 100%;
            max-height: 70vh;
            object-fit: contain;
            display: block;
        }
        .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            font-size: 24px;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 1001;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-info {
            padding: 20px;
            text-align: center;
        }
        .modal-info h3 {
            margin: 0 0 10px 0;
            color: var(--primary-color);
        }
        .modal-info p {
            margin: 0;
            color: #666;
        }
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.8); }
            to { opacity: 1; transform: scale(1); }
        }
    `;

    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }

    // Add modal to body
    document.body.appendChild(modal);

    // Add event listeners
    modal.querySelector('.modal-backdrop').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            document.body.removeChild(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Smooth scrolling for post-operative navigation
function scrollToPostOp() {
    document.getElementById('post-operative').scrollIntoView({
        behavior: 'smooth'
    });
}

// Enhanced intersection observer for animations
const observeElements = () => {
    const postOpCategories = document.querySelectorAll('.post-op-category');
    const resourceItems = document.querySelectorAll('.resource-item');
    const galleryItems = document.querySelectorAll('.gallery-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    [...postOpCategories, ...resourceItems, ...galleryItems].forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
};

// Initialize enhanced animations when DOM is loaded
document.addEventListener('DOMContentLoaded', observeElements);
