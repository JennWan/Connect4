// Load event data from chrome storage/localStorage
const list = JSON.parse(localStorage.getItem('myList') || '[]');
const item = list.find(obj => obj.id === 0);

if (item && item.imageUrl) {
  document.body.style.backgroundImage = `url(${item.imageUrl})`;
  document.getElementById('event-name').textContent = item.name;
  document.getElementById('event-date').textContent = item.date;
  document.getElementById('event-desc').textContent = item.desc;
} else {
  document.body.style.backgroundColor = '#111';
  document.getElementById('event-name').textContent = 'No event found';
}

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
