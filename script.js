document.addEventListener("DOMContentLoaded", function () {
    const rotateButton = document.getElementById("rotateButton");
    const imagefish1 = document.getElementById("imagefish1");
    const imageLizard1 = document.getElementById("imageLizard1");
    const dragonfly = document.getElementById('dragonfly1');
    const confettiElement = document.querySelector('.repeating-confetti-image'); // Select the confetti element

    let rotationFish = 0;  // Variable to keep track of the current rotation for fish
    let jumpHeight = 100;   // Height of the jump in pixels
    let translateY = 0;    // Current Y position for the lizard
    let isJumping = false; // Track if the lizard is currently jumping

    rotateButton.addEventListener("click", function () {

        // Show the confetti
        confettiElement.style.display = 'block'; // Change to block or the desired value


        // Start rotating the fish image every 2 seconds
        const intervalIdFish = setInterval(function () {
            rotationFish += 360; // Increase rotation by 360 degrees each time
            imagefish1.style.transform = `translateX(-50%) rotate(${rotationFish}deg)`; // Apply the rotation
        }, 2000); // Call every 2000 milliseconds (2 seconds)

        // Start the lizard jump every 2 seconds
        const intervalIdJump = setInterval(function () {


            if (!isJumping) {
                isJumping = true; // Set jumping state

                // Jump up first
                const jumpUp = setInterval(function () {
                    if (translateY < jumpHeight) {
                        translateY += 10; // Move up by 5 pixels
                        imageLizard1.style.transform = `translate(-50%, -50%) translateY(-${translateY}px)`; // Update Y position (negative for upward movement)
                    } else {
                        clearInterval(jumpUp); // Stop the jump up interval

                        // Jump down
                        const jumpDown = setInterval(function () {
                            if (translateY > 0) {
                                translateY -= 10; // Move down by 5 pixels
                                imageLizard1.style.transform = `translate(-50%, -50%) translateY(-${translateY}px)`; // Update Y position (negative for upward movement)
                            } else {
                                clearInterval(jumpDown); // Stop the jump down interval
                                isJumping = false; // Reset jumping state
                            }
                        }, 50); // Jump down every 50 milliseconds
                    }
                }, 50); // Jump up every 50 milliseconds
            }
        }, 2000); // Start the jump every 2 seconds

        //play the music:
        audioPlayer.volume = 0.75; // Set volume to 75%
        audioPlayer.play();

        //dragonfly motion

        let angle = 0; // Starting angle
        const radius = 100; // Radius of the circle
        const centerX = window.innerWidth / 2; // Center X position
        const centerY = window.innerHeight / 2; // Center Y position
        let animationId; // Variable to hold the requestAnimationFrame ID

        // Function to move the dragonfly in a circle
        function moveInCircle() {
            angle += 0.05; // Increment the angle for circular motion

            // Calculate new X and Y positions
            const x = centerX + radius * Math.cos(angle); // X position
            const y = centerY + radius * Math.sin(angle); // Y position
        
            // Update the dragonfly's position
            dragonfly.style.transform = `translate(${x}px, ${y}px)`;
        
            animationId = requestAnimationFrame(moveInCircle); // Continue the animation
        }
        //start the dragonfly motion
        moveInCircle();

        // Stop the fish rotation after 20 seconds
        setTimeout(() => {
            clearInterval(intervalIdFish); // Stop the fish rotation
            clearInterval(intervalIdJump); // Stop the lizard jump
            confettiElement.style.display = 'none'; // Hide the confetti again
            audioPlayer.pause(); // Pause the audio
            cancelAnimationFrame(animationId);
        }, 20000); // 10 seconds



    });
});
