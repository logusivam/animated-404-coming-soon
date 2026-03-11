
// --- Firebase Globals (Required to be defined but not used here) ---
// We define the required global variables here to prevent runtime errors,
// even though this specific app does not use Firestore or Authentication.
const __app_id = '404-loading-page';
const __firebase_config = '{}';
const __initial_auth_token = undefined;
// -------------------------------------------------------------------

const progressBar = document.getElementById('progress-bar');
const loadingText = document.getElementById('loading-text');
const loadingView = document.getElementById('loading-view');
// Renamed variable to match the new content
const developerView = document.getElementById('developer-view');

let progress = 0;
const messages = [
    "Initializing application core...",
    "Validating system dependencies...",
    "Fetching latest configuration...",
    "Establishing connection to server...",
    "Almost there! Just a few more checks...",
    "Application deployment complete."
];

/**
 * Simulates a dynamic loading process with increasing speed
 */
function startLoadingSimulation() {
    const interval = 100; // Base interval in ms
    let step = 1;

    const loadingLoop = setInterval(() => {
        // Increase speed slightly after 50% for a less linear feel
        step = progress < 50 ? 1 : 0.5 + (100 - progress) / 50;
        progress = Math.min(100, progress + step);

        progressBar.style.width = progress + '%';

        // Update text based on progress milestones
        if (progress >= 10 && progress < 30) {
            loadingText.textContent = messages[1];
        } else if (progress >= 30 && progress < 60) {
            loadingText.textContent = messages[2];
        } else if (progress >= 60 && progress < 85) {
            loadingText.textContent = messages[3];
        } else if (progress >= 85 && progress < 100) {
            loadingText.textContent = messages[4];
        } else if (progress >= 100) {
            loadingText.textContent = messages[5];
            clearInterval(loadingLoop);
            onLoadingComplete();
        }
    }, interval);
}

/**
 * Handles the final state once the simulation is complete, transitioning to the developer view.
 */
function onLoadingComplete() {
    // Wait a moment for the user to read the final status
    setTimeout(() => {
        // Hide the main loading progress view
        loadingView.classList.add('hidden');

        // Show the developer view
        developerView.classList.remove('hidden');

        // Remove the pulsing animation from the container for a clean look
        document.getElementById('content-container').classList.remove('animate-pulse');
    }, 500);
}

// Start the simulation when the window loads
window.onload = startLoadingSimulation;

