// Build data (in a real application, this would come from a database)
const buildData = {
    "1": {
        title: "ULTIMATE GAMING RIG",
        description: "For when you absolutely, positively need to run Crysis at 8K. This beast doesn't just run games, it makes them beg for mercy. Built with enough power to heat a small apartment - your electricity bill will remind you of your poor life choices, but hey, at least you've got 500 FPS in Minecraft.",
        specs: [
            "CPU: Intel Core i9-13900K",
            "GPU: NVIDIA RTX 4090 24GB",
            "RAM: 32GB DDR5 6000MHz",
            "Storage: 2TB NVMe Gen4 + 4TB SSD",
            "Cooling: 360mm AIO Liquid Cooler",
            "Case: Lian Li O11 Dynamic EVO"
        ],
        images: [
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800"
        ]
    },
    "2": {
        title: "STREAM MASTER",
        description: "Two PCs, zero excuses for dying in Warzone. While other streamers blame their setup, you'll be blaming your lack of skill - as it should be. One PC for gaming, one for streaming, and somehow still cheaper than your friend's RGB addiction.",
        specs: [
            "Gaming CPU: Ryzen 9 7950X",
            "Gaming GPU: RTX 4080 16GB",
            "Stream CPU: Ryzen 7 7700X",
            "Stream GPU: RTX 4060 8GB",
            "32GB DDR5 per PC",
            "1TB NVMe per PC"
        ],
        images: [
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800"
        ]
    },
    "3": {
        title: "CREATOR PRO",
        description: "Who needs RGB when you've got 128GB of RAM? This workstation means business - literally. Render times so fast, you'll actually have to work instead of taking coffee breaks. Threadripper inside, because apparently, you hate money as much as you hate waiting.",
        specs: [
            "CPU: AMD Threadripper 7980X",
            "GPU: NVIDIA RTX 4090 24GB",
            "RAM: 128GB DDR5 5600MHz",
            "Storage: 4TB NVMe + 16TB HDD",
            "Cooling: Custom Loop",
            "Case: Phanteks Enthoo 719"
        ],
        images: [
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800"
        ]
    },
    "4": {
        title: "COMPACT BEAST",
        description: "Size doesn't matter... or so we've been told. This tiny terror proves it. Packed tighter than a subway at rush hour, but with better airflow. Perfect for those who want a powerful PC but also need room for, you know, actual furniture.",
        specs: [
            "CPU: Intel Core i7-13700K",
            "GPU: RTX 4070 Ti 12GB",
            "RAM: 32GB DDR5 5600MHz",
            "Storage: 2TB NVMe",
            "Cooling: 240mm AIO",
            "Case: NZXT H1"
        ],
        images: [
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800"
        ]
    },
    "5": {
        title: "AQUA FORCE",
        description: "Because air cooling is for peasants. Custom loop so clean you could drink from it (please don't). When your PC looks like it belongs in a modern art museum but performs like it belongs in a NASA facility. No RGB here - we spent that budget on actual performance.",
        specs: [
            "CPU: Intel Core i9-13900KS",
            "GPU: RTX 4090 24GB",
            "RAM: 64GB DDR5 6400MHz",
            "Storage: 4TB NVMe",
            "Cooling: Custom Loop with 2x 360mm",
            "Case: Lian Li O11 XL"
        ],
        images: [
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800"
        ]
    },
    "6": {
        title: "BUDGET WARRIOR",
        description: "Proof that you don't need to sell a kidney to game at 1440p. No flashy lights, no tempered glass side panel - just pure, unadulterated performance. The kind of build that makes RGB enthusiasts question their life choices. Your wallet will thank you, and so will your FPS counter.",
        specs: [
            "CPU: Ryzen 5 7600X",
            "GPU: RTX 4060 Ti 8GB",
            "RAM: 32GB DDR5 5200MHz",
            "Storage: 1TB NVMe",
            "Cooling: Air Cooling",
            "Case: Phanteks P300A"
        ],
        images: [
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800",
            "https://placehold.co/1200x800"
        ]
    }
};

// Cache DOM elements
const modal = document.getElementById('buildModal');
const modalMainImage = document.getElementById('modalMainImage');
const modalTitle = document.getElementById('modalTitle');
const modalSpecs = document.getElementById('modalSpecs');
const modalDescription = document.getElementById('modalDescription');
const thumbnailStrip = document.querySelector('.thumbnail-strip');
const closeModal = document.querySelector('.close-modal');
const prevButton = document.querySelector('.gallery-nav.prev');
const nextButton = document.querySelector('.gallery-nav.next');

let currentBuildId = null;
let currentImageIndex = 0;
let modalImages = [];

// Use event delegation for gallery items
document.querySelector('.gallery-grid').addEventListener('click', (e) => {
    const galleryItem = e.target.closest('.gallery-item');
    if (galleryItem) {
        const buildId = galleryItem.dataset.buildId;
        updateModal(buildId);
    }
});

// Close modal when clicking close button or outside
closeModal.addEventListener('click', closeModalHandler);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModalHandler();
});

// Navigation buttons
prevButton.addEventListener('click', showPreviousImage);
nextButton.addEventListener('click', showNextImage);

function closeModalHandler() {
    modal.style.display = 'none';
    // Clear content to free memory
    modalMainImage.src = '';
    thumbnailStrip.innerHTML = '';
}

function updateModal(buildId) {
    const build = buildData[buildId];
    if (!build) return;

    document.getElementById('modalTitle').textContent = build.title;
    document.getElementById('modalDescription').textContent = build.description;
    
    // Update specs
    const specsList = document.getElementById('modalSpecs');
    specsList.innerHTML = build.specs.map(spec => `<li>${spec}</li>`).join('');
    
    // Update images
    currentImageIndex = 0;
    modalImages = build.images;
    updateModalImage();
    updateThumbnails();
    modal.style.display = 'block';
}

function updateModalImage() {
    const imageUrl = modalImages[currentImageIndex] + '?auto=format&w=1200&q=75';
    modalMainImage.src = imageUrl;
}

function updateThumbnails() {
    const thumbnailsHTML = modalImages.map((img, index) => {
        const thumbUrl = img + '?auto=format&w=100&q=75';
        return `<img src="${thumbUrl}" alt="Build Image ${index + 1}" 
                ${index === 0 ? 'class="active"' : ''} 
                data-index="${index}"
                loading="lazy"
                width="100" height="60">`;
    }).join('');
    thumbnailStrip.innerHTML = thumbnailsHTML;

    // Add click events to thumbnails using event delegation
    thumbnailStrip.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            currentImageIndex = parseInt(e.target.dataset.index);
            updateModalImage();
            updateThumbnails();
        }
    });
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + modalImages.length) % modalImages.length;
    updateModalImage();
    updateThumbnails();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % modalImages.length;
    updateModalImage();
    updateThumbnails();
}

// Add contact button event listener
document.querySelector('.inquire-button').addEventListener('click', () => {
    window.location.href = 'mailto:contact@kellyvillecomputers.com.au?subject=Custom Build Inquiry';
});

// Add quote button event listener
document.querySelector('.quote-button').addEventListener('click', function() {
    window.location.href = 'index.html?scroll=contact';
});
