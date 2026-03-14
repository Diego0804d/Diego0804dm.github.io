/**
 * Script para la carta de cumpleaños interactiva
 * ================================================
 * PERSONALIZACIÓN:
 * - friendName: nombre de la persona
 * - thanksText: texto de agradecimiento
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const body = document.getElementById('body');
    const startScreen = document.getElementById('startScreen');
    const startBtn = document.getElementById('startBtn');
    const messageScreen = document.getElementById('messageScreen');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const nextBtn = document.getElementById('nextBtn');
    const carouselScreen = document.getElementById('carouselScreen');
    const audio = document.getElementById('bgMusic');

    // Variables personalizables
    const friendName = 'Ale';                     // <--- CAMBIA AQUÍ
    const thanksText = 'Gracias por ser Ale';      // <--- CAMBIA AQUÍ

    const firstMessage = `¡Feliz cumpleaños, ${friendName}! Sabes que soy de muchas palabras y en tu cumpleaños más, quiero darte las gracias por ser tan espectacular como eres, espero que todos tus deseos se cumplan, tienes un corazón muy linda, eres mi hermanita rubia de Maracaibo, muchas gracias por todo, simplemente…...`;
    const secondMessage = thanksText;

    let messageStep = 0; // 0: primer mensaje, 1: segundo mensaje
    let carouselInitialized = false;

    // Función para lanzar confeti
    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#8e44ad', '#ffb6c1', '#FFF9C4', '#E1BEE7']
        });
    }

    // Inicia la música (llamada tras interacción)
    function playMusic() {
        audio.play().catch(e => {
            console.log('Error al reproducir audio. Asegúrate de que el archivo existe y el usuario interactuó.', e);
        });
    }

    // Cambia fondo a morado
    function setPurpleBackground() {
        body.classList.remove('bg-yellow');
        body.classList.add('bg-purple');
    }

    // Evento del botón de inicio
    startBtn.addEventListener('click', function() {
        // Animación de desvanecimiento del botón
        startBtn.classList.add('fade-out');
        
        setTimeout(() => {
            hideElement(startScreen);
            showElement(messageScreen);
            showElement(nextBtn);
        }, 500);

        setPurpleBackground();
        playMusic();
        birthdayMessage.textContent = firstMessage;
        messageStep = 0;

        // Pequeño confeti de bienvenida
        launchConfetti();
    });

    // Evento del botón Siguiente
    nextBtn.addEventListener('click', function() {
        if (messageStep === 0) {
            // Primer clic: mostrar segundo mensaje
            birthdayMessage.textContent = secondMessage;
            messageStep = 1;
        } else if (messageStep === 1) {
            // Segundo clic: mostrar carrusel y lanzar confeti
            hideElement(messageScreen);
            hideElement(nextBtn);
            showElement(carouselScreen);

            // Inicializar carrusel si es necesario (aunque con data-bs-ride=false no debería autoiniciar)
            if (!carouselInitialized) {
                const carouselElement = document.getElementById('carouselExample');
                if (carouselElement) {
                    new bootstrap.Carousel(carouselElement, {
                        interval: false, // asegura que no se deslice automáticamente
                        ride: false
                    });
                    carouselInitialized = true;
                }
            }

            // Lanzar confeti al llegar al carrusel
            launchConfetti();
            setTimeout(launchConfetti, 300);
        }
    });

    // Funciones auxiliares
    function hideElement(el) {
        el.classList.add('d-none');
    }

    function showElement(el) {
        el.classList.remove('d-none');
    }

    // Manejo de error de audio
    audio.addEventListener('error', function(e) {
        console.warn('Error al cargar el audio. Verifica la ruta: asset/music/fondo.mp3');
    });

    // Asegurar que el carrusel no tenga autoplay (redundante pero seguro)
    const carouselElement = document.getElementById('carouselExample');
    if (carouselElement) {
        carouselElement.setAttribute('data-bs-ride', 'false');
        carouselElement.setAttribute('data-bs-interval', 'false');
    }
});