// Function to sync localStorage data to the extension
function syncToExtension() {
    const data = {
        events_data: localStorage.getItem('events_data'),
        random_event: localStorage.getItem('random_event')
    };

    // Send data to background script
    chrome.runtime.sendMessage({
        type: 'SYNC_STORAGE',
        data: data
    });
}

// Watch for changes in localStorage
window.addEventListener('storage', (e) => {
    if (e.key === 'events_data' || e.key === 'random_event') {
        syncToExtension();
    }
});

// Initial sync when script loads
syncToExtension();

// Add visual indicator that sync is active
const syncIndicator = document.createElement('div');
syncIndicator.textContent = '🔄 Sync Active';
syncIndicator.style.position = 'fixed';
syncIndicator.style.bottom = '10px';
syncIndicator.style.right = '10px';
syncIndicator.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
syncIndicator.style.color = 'white';
syncIndicator.style.padding = '8px 12px';
syncIndicator.style.borderRadius = '4px';
syncIndicator.style.fontSize = '12px';
syncIndicator.style.zIndex = '9999';
document.body.appendChild(syncIndicator); 