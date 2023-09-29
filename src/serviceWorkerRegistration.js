export function register() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then((registration) => {
        // Check if the page is loaded and no service worker is controlling it.
        if (!navigator.serviceWorker.controller) {
          return;
        }

        // Check for a new service worker waiting to be active.
        if (registration.waiting) {
          updateReady(registration.waiting);
          return;
        }

        // Check for a new service worker installing.
        if (registration.installing) {
          trackInstalling(registration.installing);
          return;
        }

        // Listen for updates to any service worker.
        registration.addEventListener('updatefound', () => {
          trackInstalling(registration.installing);
        });
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });

    // Refresh to show the latest version to the user.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload();
    });
  }
}

// Notify the user that there is an update ready.
function updateReady(worker) {
  // Show a notification, user interaction, or reload the page.
}

// Track the installing service worker and notify the user when there's an update ready.
function trackInstalling(worker) {
  worker.addEventListener('statechange', () => {
    if (worker.state === 'installed') {
      updateReady(worker);
    }
  });
}
