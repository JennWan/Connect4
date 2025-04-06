// Load event data from chrome.storage
chrome.storage.local.get(['events_data', 'random_event'], (result) => {
  const randomEvent = result.random_event ? JSON.parse(result.random_event) : null;

  if (randomEvent && randomEvent.imageUrl) {
    document.body.style.backgroundImage = `url(${randomEvent.imageUrl})`;
    document.getElementById('event-name').textContent = randomEvent.name;
    document.getElementById('event-date').textContent = randomEvent.date;
    document.getElementById('event-desc').textContent = randomEvent.desc;
  } else {
    document.body.style.backgroundColor = '#111';
    document.getElementById('event-name').textContent = 'No event found';
  }
});

// Handle search form submission
document.getElementById('search-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('search-box').value.trim();
  if (query) {
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  }
});

// Attach button event listeners
document.querySelectorAll('button[data-link]').forEach(btn => {
    btn.addEventListener('click', () => {
      const route = btn.getAttribute('data-link');
      window.open(`http://localhost:5173/${route}`, '_blank');
    });
  });
