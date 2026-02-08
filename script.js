document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const openingScreen = document.getElementById('openingScreen');
    const mainContent = document.getElementById('mainContent');
    const startBtn = document.getElementById('startBtn');
    const yesBtn = document.getElementById('yesBtn');
    const maybeBtn = document.getElementById('maybeBtn');
    const noBtn = document.getElementById('noBtn');
    const responseModal = document.getElementById('responseModal');
    const closeModal = document.getElementById('closeModal');
    const continueBtn = document.getElementById('continueBtn');
    const responseTitle = document.getElementById('responseTitle');
    const responseText = document.getElementById('responseText');
    
    // Initialize floating hearts
    createFloatingHearts();
    
    // Start button click event
    startBtn.addEventListener('click', function() {
        openingScreen.style.opacity = '0';
        openingScreen.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            openingScreen.style.display = 'none';
            mainContent.style.display = 'block';
            
            // Animate elements sequentially
            animateElements();
        }, 500);
    });
    
    // Option buttons click events
    yesBtn.addEventListener('click', function() {
        showResponse("You Said Yes! 💖", 
            "This is the best Valentine's Day ever! I'm so incredibly happy! You've made me the luckiest person in the world! 🎉💖🎊");
        createConfetti();
    });
    
    maybeBtn.addEventListener('click', function() {
        showResponse("You Want Me To Ask Again? 😘", 
            "Okay, let me try... Will you PLEASE be my Valentine? Pretty please with a cherry on top? 🍒💕 I promise to make it special!");
    });
    
    noBtn.addEventListener('click', function() {
        // Move the "No" button when hovered
        const maxX = window.innerWidth - noBtn.offsetWidth;
        const maxY = window.innerHeight - noBtn.offsetHeight;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
        
        // After 3 escapes, show the real response
        let escapeCount = parseInt(noBtn.getAttribute('data-escape') || '0');
        escapeCount++;
        noBtn.setAttribute('data-escape', escapeCount);
        
        if (escapeCount >= 3) {
            showResponse("Just Kidding, I Knew It! 💕", 
                "Of course you'd say yes! You're stuck with me forever, my love! 💖😘 Now let's celebrate our amazing Valentine's Day!");
            noBtn.style.display = 'none';
        }
    });
    
    // Modal close events
    closeModal.addEventListener('click', closeResponseModal);
    continueBtn.addEventListener('click', closeResponseModal);
    
    // Close modal when clicking outside
    responseModal.addEventListener('click', function(e) {
        if (e.target === responseModal) {
            closeResponseModal();
        }
    });
    
    // Countdown Timer
    function updateCountdown() {
        const now = new Date();
        const nextValentine = new Date(now.getFullYear() + 1, 1, 14); // February 14 next year
        
        // If Valentine's Day has passed this year, use next year
        if (now.getMonth() > 1 || (now.getMonth() === 1 && now.getDate() > 14)) {
            nextValentine.setFullYear(nextValentine.getFullYear() + 1);
        }
        
        const diff = nextValentine - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown(); // Initial call
    
    // Helper Functions
    function showResponse(title, text) {
        responseTitle.textContent = title;
        responseText.textContent = text;
        responseModal.style.display = 'flex';
        
        // Add celebration effect
        document.body.style.overflow = 'hidden';
    }
    
    function closeResponseModal() {
        responseModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    function createFloatingHearts() {
        const floatingHearts = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = Math.random() * 100 + '%';
            heart.style.opacity = Math.random() * 0.5 + 0.1;
            heart.style.animation = `floatAround ${Math.random() * 30 + 20}s linear infinite`;
            heart.style.animationDelay = Math.random() * 20 + 's';
            
            floatingHearts.appendChild(heart);
        }
    }
    
    function createConfetti() {
        const confettiColors = ['#ff6b6b', '#ffa502', '#2ed573', '#1e90ff', '#ff4757'];
        const confettiContainer = document.querySelector('.floating-hearts');
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.innerHTML = ['🎊', '🎉', '💖', '💕', '✨'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-50px';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.8';
            
            // Random animation
            const animationDuration = Math.random() * 3 + 2;
            confetti.style.animation = `fall ${animationDuration}s linear forwards`;
            
            // Random horizontal movement
            const horizontalMovement = Math.random() * 200 - 100;
            confetti.style.setProperty('--move-x', `${horizontalMovement}px`);
            
            confettiContainer.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, animationDuration * 1000);
        }
    }
    
    function animateElements() {
        const elements = document.querySelectorAll('.message-card, .question-box, .photo-frame, .love-letter');
        
        elements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 100);
            }, index * 200);
        });
    }
    
    // Add CSS for confetti fall animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) translateX(var(--move-x)) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && responseModal.style.display === 'flex') {
            closeResponseModal();
        }
        
        if (e.key === 'y' || e.key === 'Y') {
            yesBtn.click();
        }
    });
    
    // Add hover effect to photos
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => {
        photo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        photo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
});

// Photo Loader Function
function loadPhotos() {
    const photoIds = ['photo1', 'photo2', 'photo3', 'photo4'];
    const defaultImages = [
        'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80',
        'https://images.unsplash.com/photo-1529254479751-fbacb4c7a587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1511988617509-a57c8a288659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=764&q=80'
    ];
    
    photoIds.forEach((id, index) => {
        const photoElement = document.getElementById(id);
        
        // Try to load local photo first
        const localPhotoPath = `photos/photo${index + 1}.jpg`;
        
        // Create a test image to check if local photo exists
        const testImage = new Image();
        testImage.onload = function() {
            // Local photo exists
            photoElement.style.backgroundImage = `url('${localPhotoPath}')`;
            photoElement.style.backgroundSize = 'cover';
            photoElement.style.backgroundPosition = 'center';
            console.log(`Loaded local photo: ${localPhotoPath}`);
        };
        
        testImage.onerror = function() {
            // Local photo doesn't exist, use default
            photoElement.style.backgroundImage = `url('${defaultImages[index]}')`;
            photoElement.style.backgroundSize = 'cover';
            photoElement.style.backgroundPosition = 'center';
            console.log(`Using default photo for ${id}`);
        };
        
        testImage.src = localPhotoPath;
    });
}

// Call loadPhotos when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing code) ...
    
    // Load photos
    loadPhotos();
    
    // Add photo preview functionality
    setupPhotoPreview();
});

// Photo Preview Functionality
function setupPhotoPreview() {
    const photos = document.querySelectorAll('.photo');
    const modal = document.createElement('div');
    modal.className = 'photo-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="" alt="Enlarged Photo" class="enlarged-photo">
            <p class="photo-description"></p>
        </div>
    `;
    document.body.appendChild(modal);
    
    const enlargedPhoto = modal.querySelector('.enlarged-photo');
    const photoDescription = modal.querySelector('.photo-description');
    const closeBtn = modal.querySelector('.close-modal');
    const overlay = modal.querySelector('.modal-overlay');
    
    photos.forEach(photo => {
        photo.addEventListener('click', function() {
            const bgImage = this.style.backgroundImage;
            if (bgImage && bgImage !== 'none') {
                // Extract URL from background-image property
                const imageUrl = bgImage.slice(5, -2);
                enlargedPhoto.src = imageUrl;
                photoDescription.textContent = this.querySelector('.photo-label').textContent;
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeBtn.addEventListener('click', closePhotoModal);
    overlay.addEventListener('click', closePhotoModal);
    
    function closePhotoModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Add CSS for photo modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .photo-modal {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1000;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: white;
            padding: 20px;
            border-radius: 15px;
            max-width: 90%;
            max-height: 90%;
            z-index: 1001;
        }
        
        .enlarged-photo {
            max-width: 100%;
            max-height: 70vh;
            display: block;
            margin: 0 auto;
            border-radius: 10px;
        }
        
        .close-modal {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 2rem;
            color: #ff6b6b;
            cursor: pointer;
            background: white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1002;
        }
        
        .photo-description {
            text-align: center;
            margin-top: 15px;
            font-size: 1.2rem;
            color: #ff6b6b;
            font-weight: 600;
        }
    `;
    document.head.appendChild(modalStyle);
}