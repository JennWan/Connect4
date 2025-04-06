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

// Motivational quotes
const quotes = [
    {
        text: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        text: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        author: "Winston Churchill"
    },
    {
        text: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt"
    },
    {
        text: "Don't watch the clock; do what it does. Keep going.",
        author: "Sam Levenson"
    }
];

// Update clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

// Update quote
function updateQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById('quote').textContent = randomQuote.text;
    document.getElementById('quote-author').textContent = `- ${randomQuote.author}`;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Update clock every minute
    updateClock();
    setInterval(updateClock, 60000);

    // Update quote
    updateQuote();

    // Update quote every hour
    setInterval(updateQuote, 3600000);
});
