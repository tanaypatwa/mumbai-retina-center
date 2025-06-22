document.addEventListener('DOMContentLoaded', function() {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileNavToggle.classList.toggle('is-active');
        });
    }

    // Gallery Page Logic
    const gallery = document.querySelector('.gallery-grid');
    if (gallery) {
        const filterContainer = document.querySelector('.gallery-filters');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.querySelector('.lightbox-close');

        // Filter Logic
        filterContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                // Update active button
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (item.getAttribute('data-category') === filterValue || filterValue === 'all') {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });

        // Lightbox Logic
        gallery.addEventListener('click', function(e) {
            if (e.target.tagName === 'IMG') {
                lightbox.classList.add('active');
                lightboxImg.src = e.target.src;
            }
        });

        // Close Lightbox
        lightboxClose.addEventListener('click', function() {
            lightbox.classList.remove('active');
        });

        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                lightbox.classList.remove('active');
            }
        });
    }
});
