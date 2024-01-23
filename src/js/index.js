import { Workbox } from 'workbox-window';
import Editor from './editor';
import { initdb } from './database';
import '../css/style.css';
import './install';



const main = document.querySelector('#main');
main.innerHTML = '';

const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

const editor = new Editor();

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });

  // Logic for installing the PWA
  let deferredPrompt;

  // Event handler for the beforeinstallprompt event
  window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event for later use
    deferredPrompt = event;
    // Update UI to notify the user they can add to the home screen
    showInstallButton();
  });

  const butInstall = document.getElementById('buttonInstall');

  // Event handler for the click event on butInstall
  butInstall.addEventListener('click', async () => {
    // Hide the install button
    hideInstallButton();
    // Show loading spinner
    loadSpinner();
    // Prompt the user to install the app
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // Reset the deferredPrompt variable
    deferredPrompt = null;
    // Hide the loading spinner
    main.innerHTML = '';
  });

  // Event handler for the appinstalled event
  window.addEventListener('appinstalled', (event) => {
    // Check if the installation was successful
    if (event instanceof Event) {
      console.log('App successfully installed');
      // TODO: Implement logic for when the app is successfully installed
      // For example, you can redirect to a "thank you" page or perform other actions.
      // window.location.href = '/thank-you';
    }
  });
} else {
  // Service workers are not supported
  // TODO: Handle this case based on your application's requirements
  console.error('Service workers are not supported.');
}
// index.js
export function hideInstallButton() {
  // your implementation for hiding the install button
}

export function showSpinner() {
  // your implementation for showing the spinner
}

export function hideSpinner() {
  // your implementation for hiding the spinner
}
