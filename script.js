document.addEventListener('DOMContentLoaded', (event) => {
    const birthday = new Date('July 31, 2024 00:00:00').getTime();
    const countdownElements = document.querySelectorAll('.header, .countdown, .gallery, .message');
    
    // Create a single instance of the Audio object and set it to loop
    let sound = new Audio('music.wav');
    sound.loop = true; // Enable looping
    let musicPlaying = false; // To track whether the music is playing

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthday - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('hours').innerText = hours;
        document.getElementById('minutes').innerText = minutes;
        document.getElementById('seconds').innerText = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown-timer').innerText = "Happy Birthday!";
        }
    }

    function checkVisibility() {
        const windowHeight = window.innerHeight;

        countdownElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                element.classList.add('fade-in');
                element.classList.remove('fade-out');
            } else {
                element.classList.add('fade-out');
                element.classList.remove('fade-in');
            }
        });
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();

    // Play background music if not already playing
    if (!musicPlaying) {
        sound.play().catch(error => {
            console.log('Audio playback failed:', error);
        });
        musicPlaying = true;
    }
    
    document.getElementById('surpriseButton').addEventListener('click', () => {
    showSurprise();
    // Check if the audio is already playing before trying to play it
    // If it's already playing, no need to play again
    sound.play()
});

});


function showSurprise() {
    document.getElementById('surprise').classList.remove('hidden');
}
