document.addEventListener('DOMContentLoaded', function() {
    // Navigation for section tabs
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('.section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show target section
            document.querySelector(targetId).classList.add('active');
        });
    });

    // Add linking functionality between updates and publications
    const updateLinks = document.querySelectorAll('.update-link');
    
    updateLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the section ID and publication ID
            const sectionId = this.getAttribute('href');
            const publicationId = this.getAttribute('data-publication');
            
            // Show the publications section
            sections.forEach(section => section.classList.remove('active'));
            document.querySelector(sectionId).classList.add('active');
            
            // Update active class in navigation
            navLinks.forEach(navLink => {
                if (navLink.getAttribute('href') === sectionId) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            });
            
            // Find and highlight the publication
            if (publicationId) {
                const publication = document.getElementById(publicationId);
                if (publication) {
                    // Scroll to the publication
                    publication.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Add highlight effect
                    publication.classList.add('highlight');
                    setTimeout(() => {
                        publication.classList.remove('highlight');
                    }, 2000);
                }
            }
        });
    });

    // Updates pagination
    const updatesPerPage = 4;
    const updateItems = document.querySelectorAll('.update-item');
    const totalUpdates = updateItems.length;
    const totalPages = Math.ceil(totalUpdates / updatesPerPage);
    
    // Set total pages in the UI
    const totalPagesElement = document.getElementById('total-pages');
    if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
    }
    
    let currentPage = 1;
    
    // Previous button functionality
    const prevButton = document.getElementById('prev-updates');
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                updateUpdatesVisibility();
            }
        });
    }
    
    // Next button functionality
    const nextButton = document.getElementById('next-updates');
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                updateUpdatesVisibility();
            }
        });
    }
    
    function updateUpdatesVisibility() {
        // Update current page in UI
        const currentPageElement = document.getElementById('current-page');
        if (currentPageElement) {
            currentPageElement.textContent = currentPage;
        }
        
        // Update button states
        if (prevButton) {
            prevButton.disabled = (currentPage === 1);
        }
        
        if (nextButton) {
            nextButton.disabled = (currentPage === totalPages);
        }
        
        // Show/hide update items based on current page
        updateItems.forEach((item, index) => {
            const startIdx = (currentPage - 1) * updatesPerPage;
            const endIdx = startIdx + updatesPerPage - 1;
            
            if (index >= startIdx && index <= endIdx) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Initialize the updates visibility
    updateUpdatesVisibility();
    
    // Add current year to copyright if needed
    const currentYear = new Date().getFullYear();
    const copyrightEl = document.querySelector('.copyright-year');
    if (copyrightEl) {
        copyrightEl.textContent = currentYear;
    }
});
