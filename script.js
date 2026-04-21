// Charger les données JSON contenant les images et noms des motos
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        initializeGame(data); // Jeu "Deviner la Moto"
        initializeBrandGame(data); // Jeu "Deviner la Marque"
    })
    .catch(err => console.error('Erreur lors du chargement des données :', err));
    function initializeGame(data) {
        let currentMotoIndex = 0; // Index de la moto actuelle
        let attemptsLeft = data.motos[currentMotoIndex].images.length; // Nombre d'essais restants
        let currentImageIndex = 0; // Index de l'image affichée pour la moto actuelle
        let timerInterval; // Intervalle pour le chronomètre
        const maxTime = 30; // Temps maximum par essai en secondes
        let correctName = data.motos[currentMotoIndex].name; // Nom correct de la moto
    
        const motoImage = document.getElementById('moto-image'); // Image affichée
        const guessInput = document.getElementById('guess-input'); // Zone de saisie
        const submitBtn = document.getElementById('submit-btn'); // Bouton "Valider"
        const feedback = document.getElementById('feedback'); // Zone de feedback
        const remainingAttempts = document.getElementById('remaining-attempts'); // Compteur d'essais
        const nextBtn = document.getElementById('next-btn'); // Bouton "Suivant"
        const timerDisplay = document.getElementById('timer'); // Affichage du chronomètre
    
        // Charger la première image de la première moto
        loadMotoImage(data.motos[currentMotoIndex].images[currentImageIndex]);
        startTimer();
    
        // Fonction pour démarrer le chronomètre
        function startTimer() {
            let timeLeft = maxTime;
            timerDisplay.textContent = timeLeft;
            clearInterval(timerInterval);
            motoImage.style.filter = 'blur(10px)'; // Start with a blur
            timerInterval = setInterval(() => {
                timeLeft--;
                timerDisplay.textContent = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timerInterval);
                    handleIncorrectGuess();
                } else if (timeLeft <= 30 , timeLeft > 5) {
                    // Gradually reduce blur over 25 seconds
                    const blurValue = (10 * timeLeft) / 30;
                    motoImage.style.filter = `blur(${blurValue}px)`;
                }
                else if (timeLeft <= 5) {
                    // Lighten the image over 5 seconds
                    motoImage.style.filter = 'brightness(1.2)';
 
                }
            }, 1000);
        }
    
        // Gestion du clic sur le bouton "Valider"
        submitBtn.addEventListener('click', () => {
            const userGuess = guessInput.value.trim(); // Récupère et nettoie la saisie
    
            if (userGuess.toLowerCase() === correctName.toLowerCase()) {
                const goodAnswerSound = document.getElementById('good-answer-sound');
                goodAnswerSound.play(); // Joue le son pour une bonne réponse
                clearInterval(timerInterval);
                feedback.textContent = "Bravo ! Vous avez trouvé la bonne moto.";
                feedback.style.color = "green";
                nextBtn.style.display = "block"; // Affiche le bouton "Suivant"
                submitBtn.disabled = true; // Désactive le bouton "Valider"
            } else {
                handleIncorrectGuess();
            }
    
            guessInput.value = ''; // Réinitialise la saisie
        });
    
        function handleIncorrectGuess() {
            const wrongAnswerSound = document.getElementById('wrong-answer-sound');
            wrongAnswerSound.play(); // Joue le son pour une mauvaise réponse
        
            attemptsLeft--;
            remainingAttempts.textContent = attemptsLeft;
        
            if (attemptsLeft > 0) {
                currentImageIndex++; // Passe à l'image suivante de la moto
                if (currentImageIndex < data.motos[currentMotoIndex].images.length) {
                    feedback.textContent = "Mauvaise réponse. Un nouvel indice apparaît.";
                    feedback.style.color = "red";
                    loadMotoImage(data.motos[currentMotoIndex].images[currentImageIndex]);
                    startTimer(); // Redémarre le chronomètre pour le prochain essai
                } else {
                    feedback.textContent = "Mauvaise réponse. Pas d'autres indices disponibles.";
                    feedback.style.color = "red";
                }
            } else {
                feedback.textContent = `Vous avez perdu. La bonne réponse était : ${correctName}.`;
                feedback.style.color = "red";
                nextBtn.style.display = "block"; // Affiche le bouton "Suivant"
                submitBtn.disabled = true; // Désactive le bouton "Valider"
            }
        }
    
        // Gestion du clic sur le bouton "Suivant"
        nextBtn.addEventListener('click', () => {
            currentMotoIndex++;
            currentImageIndex = 0; // Réinitialise l'index des images
            if (currentMotoIndex < data.logo.length) {
                attemptsLeft = data.logo[currentMotoIndex].images.length; // Nombre d'images disponibles
                correctName = data.logo[currentMotoIndex].name; // Met à jour le nom correct
                currentImageIndex = 0; // Réinitialise à la première image
                loadMotoImage(data.logo[currentMotoIndex].images[currentImageIndex]);
                remainingAttempts.textContent = attemptsLeft; // Met à jour l'affichage des essais
                feedback.textContent = '';
                submitBtn.disabled = false; // Réactive le bouton "Valider"
                nextBtn.style.display = "none"; // Cache le bouton "Suivant"
                startTimer(); // Redémarre le chronomètre
            } else {
                feedback.textContent = "Félicitations, vous avez terminé le jeu !";
                feedback.style.color = "blue";
                nextBtn.style.display = "none"; // Cache le bouton "Suivant"
                submitBtn.disabled = true; // Désactive le bouton "Valider"
            }
        });
    
        // Charger une image
        function loadMotoImage(imageUrl) {
            motoImage.src = imageUrl;
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        const ambientSound = document.getElementById('ambient-sound');
        const toggleMusicBtn = document.getElementById('toggle-music-btn');
        let isMusicPlaying = false; // État de la musique
    
        // Commence la musique lorsqu'on clique n'importe où sur la page
        document.addEventListener('click', function startAmbientMusic() {
            ambientSound.play();
            isMusicPlaying = true;
            toggleMusicBtn.textContent = '🔊'; // Icône pour indiquer que la musique joue
            document.removeEventListener('click', startAmbientMusic);
        });
    
        // Basculer entre lecture et pause
        toggleMusicBtn.addEventListener('click', () => {
            if (isMusicPlaying) {
                ambientSound.pause();
                toggleMusicBtn.textContent = '🔇'; // Icône pour indiquer que la musique est en pause
            } else {
                ambientSound.play();
                toggleMusicBtn.textContent = '🔊'; // Icône pour indiquer que la musique joue
            }
            isMusicPlaying = !isMusicPlaying; // Inverser l'état
        });
    });
    

 