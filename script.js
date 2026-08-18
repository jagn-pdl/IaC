// ============================================
// OLYMPIC GAMES 2028 - MAIN JAVASCRIPT
// ============================================

// ===== LOADING SCREEN =====
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1200);

  // Initialize all components
  initCountdown();
  initThemeToggle();
  initNavbar();
  initSportsFilter();
  initMedalTable();
  initAthletes();
  initTimeline();
  initEvents();
  initGallery();
  initFacts();
  initContactForm();
  initBackToTop();
  initScrollReveal();
  initCounterAnimation();
});

// ===== COUNTDOWN TIMER =====
function initCountdown() {
  const targetDate = new Date('2028-07-14T00:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff <= 0) {
      document.getElementById('days').textContent = '00';
      document.getElementById('hours').textContent = '00';
      document.getElementById('minutes').textContent = '00';
      document.getElementById('seconds').textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const icon = toggle.querySelector('i');

  // Check saved theme
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// ===== NAVBAR =====
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky navbar with blur
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(13, 13, 26, 0.85)';
      navbar.style.backdropFilter = 'blur(20px)';
    } else {
      navbar.style.background = '';
      navbar.style.backdropFilter = '';
    }

    // Active section indicator
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile hamburger
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.classList.remove('active');
    });
  });
}

// ===== SPORTS FILTER =====
function initSportsFilter() {
  const sportsData = [
    { name: 'Swimming', icon: 'fa-swimmer', category: 'aquatics', description: 'Freestyle, backstroke, breaststroke' },
    { name: 'Diving', icon: 'fa-water', category: 'aquatics', description: '10m platform, 3m springboard' },
    { name: 'Athletics', icon: 'fa-running', category: 'athletics', description: 'Track & field events' },
    { name: 'Gymnastics', icon: 'fa-gymnastics', category: 'gymnastics', description: 'Artistic, rhythmic, trampoline' },
    { name: 'Basketball', icon: 'fa-basketball-ball', category: 'team', description: '5x5, 3x3' },
    { name: 'Football', icon: 'fa-futbol', category: 'team', description: 'Men\'s & Women\'s tournaments' },
    { name: 'Volleyball', icon: 'fa-volleyball-ball', category: 'team', description: 'Indoor & beach' },
    { name: 'Cycling', icon: 'fa-bicycle', category: 'athletics', description: 'Road, track, mountain bike' },
  ];

  const grid = document.getElementById('sportsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderSports(category = 'all') {
    const filtered = category === 'all' 
      ? sportsData 
      : sportsData.filter(sport => sport.category === category);
    
    grid.innerHTML = filtered.map(sport => `
      <div class="sport-card">
        <i class="fas ${sport.icon}"></i>
        <h4>${sport.name}</h4>
        <p>${sport.description}</p>
      </div>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderSports(btn.dataset.filter);
    });
  });

  renderSports('all');
}

// ===== MEDAL TABLE =====
function initMedalTable() {
  const medalData = [
    { country: 'United States', gold: 39, silver: 41, bronze: 33 },
    { country: 'China', gold: 38, silver: 32, bronze: 18 },
    { country: 'Japan', gold: 27, silver: 14, bronze: 17 },
    { country: 'Great Britain', gold: 22, silver: 20, bronze: 22 },
    { country: 'Russia', gold: 20, silver: 28, bronze: 23 },
    { country: 'Australia', gold: 17, silver: 7, bronze: 22 },
    { country: 'Netherlands', gold: 10, silver: 12, bronze: 14 },
    { country: 'France', gold: 10, silver: 12, bronze: 11 },
    { country: 'Germany', gold: 10, silver: 11, bronze: 16 },
    { country: 'Italy', gold: 10, silver: 10, bronze: 20 },
  ];

  let currentData = [...medalData];
  const table = document.getElementById('medalTable');
  const search = document.getElementById('medalSearch');
  const sortBtn = document.getElementById('sortMedals');

  function renderTable(data) {
    table.innerHTML = `
      <thead>
        <tr>
          <th>Rank</th>
          <th>Country</th>
          <th class="medal-gold">Gold</th>
          <th class="medal-silver">Silver</th>
          <th class="medal-bronze">Bronze</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((row, index) => `
          <tr>
            <td>${index + 1}</td>
            <td><strong>${row.country}</strong></td>
            <td class="medal-gold">${row.gold}</td>
            <td class="medal-silver">${row.silver}</td>
            <td class="medal-bronze">${row.bronze}</td>
            <td>${row.gold + row.silver + row.bronze}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
  }

  function filterData() {
    const query = search.value.toLowerCase();
    const filtered = medalData.filter(row => 
      row.country.toLowerCase().includes(query)
    );
    currentData = filtered;
    renderTable(filtered);
  }

  function sortByGold() {
    const sorted = [...currentData].sort((a, b) => b.gold - a.gold);
    currentData = sorted;
    renderTable(sorted);
  }

  search.addEventListener('input', filterData);
  sortBtn.addEventListener('click', sortByGold);
  renderTable(medalData);
}

// ===== ATHLETES =====
function initAthletes() {
  const athletes = [
    { name: 'Simone Biles', sport: 'Gymnastics', country: 'USA', achievements: '7 Olympic medals' },
    { name: 'Usain Bolt', sport: 'Athletics', country: 'Jamaica', achievements: '8 Olympic golds' },
    { name: 'Katie Ledecky', sport: 'Swimming', country: 'USA', achievements: '7 Olympic golds' },
    { name: 'Michael Phelps', sport: 'Swimming', country: 'USA', achievements: '23 Olympic golds' },
    { name: 'Naomi Osaka', sport: 'Tennis', country: 'Japan', achievements: '4 Grand Slam titles' },
    { name: 'Eliud Kipchoge', sport: 'Athletics', country: 'Kenya', achievements: '2 Olympic golds' },
  ];

  const grid = document.getElementById('athletesGrid');
  grid.innerHTML = athletes.map(athlete => `
    <div class="athlete-card" onclick="this.classList.toggle('expanded')">
      <div class="avatar">${athlete.name.split(' ').map(n => n[0]).join('')}</div>
      <h4>${athlete.name}</h4>
      <p class="sport">${athlete.sport} · ${athlete.country}</p>
      <div class="athlete-detail">${athlete.achievements}</div>
    </div>
  `).join('');
}

// ===== TIMELINE =====
function initTimeline() {
  const timelineData = [
    { year: '1896', event: 'First modern Olympic Games in Athens' },
    { year: '1924', event: 'First Winter Olympics in Chamonix' },
    { year: '1960', event: 'Rome Olympics, first televised globally' },
    { year: '2008', event: 'Beijing Olympics, record-setting games' },
    { year: '2016', event: 'Rio Olympics, first in South America' },
    { year: '2020', event: 'Tokyo Olympics, postponed to 2021' },
    { year: '2028', event: 'Los Angeles Olympics, next summer games' },
  ];

  const container = document.getElementById('timeline');
  container.innerHTML = timelineData.map(item => `
    <div class="timeline-item">
      <span class="year">${item.year}</span>
      <span>${item.event}</span>
    </div>
  `).join('');
}

// ===== EVENTS =====
function initEvents() {
  const events = [
    { name: 'Opening Ceremony', date: 'July 14, 2028', location: 'Los Angeles Memorial Coliseum' },
    { name: 'Athletics Finals', date: 'July 20-25, 2028', location: 'LA Stadium' },
    { name: 'Swimming Finals', date: 'July 18-23, 2028', location: 'Aquatics Center' },
    { name: 'Gymnastics Finals', date: 'July 19-22, 2028', location: 'LA Arena' },
    { name: 'Basketball Finals', date: 'July 26-28, 2028', location: 'Crypto.com Arena' },
    { name: 'Closing Ceremony', date: 'July 30, 2028', location: 'Los Angeles Memorial Coliseum' },
  ];

  const grid = document.getElementById('eventsGrid');
  grid.innerHTML = events.map(event => `
    <div class="event-card">
      <h4>${event.name}</h4>
      <p class="date"><i class="fas fa-calendar-alt"></i> ${event.date}</p>
      <p><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
    </div>
  `).join('');
}

// ===== GALLERY =====
function initGallery() {
  const images = [
    'https://picsum.photos/seed/olympic1/400/300',
    'https://picsum.photos/seed/olympic2/400/300',
    'https://picsum.photos/seed/olympic3/400/300',
    'https://picsum.photos/seed/olympic4/400/300',
    'https://picsum.photos/seed/olympic5/400/300',
    'https://picsum.photos/seed/olympic6/400/300',
  ];

  const masonry = document.getElementById('galleryMasonry');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeLightbox = document.querySelector('.close-lightbox');

  masonry.innerHTML = images.map((src, i) => `
    <img src="${src}" alt="Olympic gallery ${i+1}" loading="lazy" />
  `).join('');

  // Lightbox
  masonry.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
      lightboxImg.src = e.target.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  });

  closeLightbox.addEventListener('click', closeLightboxFn);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightboxFn();
  });

  function closeLightboxFn() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ===== FACTS =====
function initFacts() {
  const facts = [
    'The Olympic rings represent the five inhabited continents: Africa, Asia, Europe, America, and Oceania.',
    'The Olympic flame is lit months before the games using a parabolic mirror in Olympia, Greece.',
    'The first modern Olympic Games were held in Athens in 1896 with 241 athletes from 14 countries.',
    'Women first competed in the Olympics in 1900 in Paris, participating in tennis and golf.',
    'The Olympic motto is "Citius, Altius, Fortius" which means "Faster, Higher, Stronger".',
    'The 2028 Los Angeles Olympics will feature 339 events across 47 sports.',
    'The Olympic torch relay was introduced at the 1936 Berlin Games.',
    'No Olympics were held in 1916, 1940, and 1944 due to World Wars.',
  ];

  const factText = document.getElementById('factText');
  const newFactBtn = document.getElementById('newFact');

  function showRandomFact() {
    const randomIndex = Math.floor(Math.random() * facts.length);
    factText.textContent = facts[randomIndex];
  }

  newFactBtn.addEventListener('click', showRandomFact);
  showRandomFact();
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon. 🏅');
    form.reset();
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const sections = document.querySelectorAll('.section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    observer.observe(section);
  });
}

// ===== COUNTER ANIMATION =====
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.count);
        let current = 0;
        const increment = Math.ceil(target / 60);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          entry.target.textContent = current.toLocaleString();
        }, 20);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}