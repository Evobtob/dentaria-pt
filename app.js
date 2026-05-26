const APPS_SCRIPT_WEBAPP_URL = "COLOCA_AQUI_O_URL_DO_APPS_SCRIPT_EXEC";
const likesKey = 'clinicLikes';
const likedKey = 'clinicLikedIds';
let clinicLikes = JSON.parse(localStorage.getItem(likesKey) || '{}');
let clinicLikedIds = JSON.parse(localStorage.getItem(likedKey) || '[]');

const clinics = [
  {
    id: 1,
    name: "Clínica Sorriso Boavista",
    zone: "Boavista, Porto",
    lat: 41.1623,
    lng: -8.6291,
    description: "Clínica moderna focada em estética dentária e implantologia.",
    services: ["Consulta geral", "Implantes", "Ortodontia", "Branqueamento"],
    prices: [
      ["Consulta", "45€"],
      ["Destartarização", "60€"],
      ["Branqueamento", "220€"],
      ["Implante unitário", "900€"],
    ],
    googleReview: { rating: 4.8, count: 214 },
    likes: 48,
    socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" }
  },
  {
    id: 2,
    name: "Porto Dental Matosinhos",
    zone: "Matosinhos",
    lat: 41.1821,
    lng: -8.6893,
    description: "Atendimento familiar, urgências e medicina dentária preventiva.",
    services: ["Urgência", "Odontopediatria", "Higiene oral"],
    prices: [["Consulta", "40€"], ["Urgência", "70€"], ["Restauração", "85€"]],
    googleReview: { rating: 4.6, count: 132 },
    likes: 35,
    socials: { instagram: "https://instagram.com", website: "https://example.com" }
  },
  {
    id: 3,
    name: "Gaia Oral Center",
    zone: "Vila Nova de Gaia",
    lat: 41.1337,
    lng: -8.6174,
    description: "Especialistas em cirurgia oral, próteses e reabilitação oral.",
    services: ["Cirurgia oral", "Próteses", "Endodontia"],
    prices: [["Consulta", "50€"], ["Endodontia", "180€"], ["Prótese fixa", "650€"]],
    googleReview: { rating: 4.7, count: 189 },
    likes: 41,
    socials: { facebook: "https://facebook.com", website: "https://example.com" }
  }
];

const tabs = document.querySelectorAll('.tab-btn');
const contents = document.querySelectorAll('.tab-content');
const clinicList = document.getElementById('clinicList');
const clinicDetail = document.getElementById('clinicDetail');
const searchInput = document.getElementById('searchInput');

let selectedClinic = clinics[0];

function switchTab(tab) {
  tabs.forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
  contents.forEach(c => c.classList.toggle('active', c.id === `tab-${tab}`));
}

tabs.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));

function renderClinicList(items) {
  clinicList.innerHTML = '';
  items.forEach(c => {
    const el = document.createElement('div');
    el.className = 'clinic-item';
    el.innerHTML = `
      <div class="clinic-head">
        <h3>${c.name}</h3>
        <div class="google-review" title="Google Reviews">⭐ ${c.googleReview.rating} <span>(${c.googleReview.count})</span></div>
      </div>
      <p>${c.zone}</p>
      <div class="clinic-actions-row">
        <button class="btn-like ${clinicLikedIds.includes(c.id) ? 'liked' : ''}" data-like-id="${c.id}" type="button">❤️ ${clinicLikes[c.id] ?? c.likes ?? 0}</button>
      </div>
      <button class="btn small">Ver detalhe</button>
    `;
    const likeBtn = el.querySelector('[data-like-id]');
    likeBtn.addEventListener('click', () => {
      const id = c.id;
      if (clinicLikedIds.includes(id)) {
        clinicLikedIds = clinicLikedIds.filter(x => x !== id);
        clinicLikes[id] = Math.max((clinicLikes[id] ?? c.likes ?? 0) - 1, 0);
      } else {
        clinicLikedIds.push(id);
        clinicLikes[id] = (clinicLikes[id] ?? c.likes ?? 0) + 1;
      }
      localStorage.setItem(likesKey, JSON.stringify(clinicLikes));
      localStorage.setItem(likedKey, JSON.stringify(clinicLikedIds));
      renderClinicList(items);
    });
    el.querySelector('.btn.small').addEventListener('click', () => {
      selectedClinic = c;
      renderDetail(c);
      map.setView([c.lat, c.lng], 13);
      switchTab('detail');
    });
    clinicList.appendChild(el);
  });
}

function renderDetail(c) {
  clinicDetail.innerHTML = `
    <h2>${c.name}</h2>
    <p>${c.description}</p>
    <p><strong>Zona:</strong> ${c.zone}</p>
    <h3>Serviços</h3>
    <ul class="services-list">${c.services.map(s => `<li>${s}</li>`).join('')}</ul>
    <h3>Tabela de preços</h3>
    <ul class="price-list">${c.prices.map(([n,v]) => `<li>${n}: <strong>${v}</strong></li>`).join('')}</ul>
    <h3>Redes / Links</h3>
    <p class="socials">${Object.entries(c.socials).map(([k,v]) => `<a href="${v}" target="_blank" rel="noopener">${k}</a>`).join('')}</p>
  `;
}

searchInput.addEventListener('input', () => {
  const q = searchInput.value.toLowerCase().trim();
  const filtered = clinics.filter(c => (`${c.name} ${c.zone}`).toLowerCase().includes(q));
  renderClinicList(filtered);
});

const map = L.map('map').setView([41.1579, -8.6291], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

clinics.forEach(c => {
  const marker = L.marker([c.lat, c.lng]).addTo(map);
  marker.bindPopup(`<strong>${c.name}</strong><br>${c.zone}`);
  marker.on('click', () => {
    selectedClinic = c;
    renderDetail(c);
  });
});

function addMessage(text, role='bot') {
  const chatBox = document.getElementById('chatBox');
  const msg = document.createElement('div');
  msg.className = `msg ${role}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

addMessage('Olá. Posso ajudar com dúvidas gerais sobre saúde oral.');

function botReply(userText) {
  const t = userText.toLowerCase();
  if (t.includes('dor') || t.includes('urg')) return 'Se houver dor intensa, inchaço ou febre, procura urgência dentária hoje.';
  if (t.includes('aparelho')) return 'Ortodontia depende da avaliação clínica. Em adultos, alinhadores são opção frequente.';
  if (t.includes('branque')) return 'Branqueamento deve ser feito após avaliação de cáries e sensibilidade.';
  return 'Posso orientar de forma geral, mas para diagnóstico tens de marcar avaliação presencial.';
}

document.getElementById('chatSend').addEventListener('click', () => {
  const input = document.getElementById('chatInput');
  const txt = input.value.trim();
  if (!txt) return;
  addMessage(txt, 'user');
  addMessage(botReply(txt), 'bot');
  input.value = '';
});

const loginModal = document.getElementById('loginModal');
document.getElementById('loginBtn').addEventListener('click', () => loginModal.showModal());
document.getElementById('closeLogin').addEventListener('click', () => loginModal.close());

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  localStorage.setItem('patientProfile', JSON.stringify(data));
  await logToSheet({ type: 'login', ...data });
  loginModal.close();
  alert('Login guardado (protótipo).');
});

async function logToSheet(payload) {
  if (!APPS_SCRIPT_WEBAPP_URL.startsWith('http')) return { skipped: true };
  try {
    await fetch(APPS_SCRIPT_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ timestamp: new Date().toISOString(), ...payload })
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

function openDemoEmail(payload) {
  const subject = encodeURIComponent(`Pedido de marcação demo — ${payload.name}`);
  const body = encodeURIComponent(
`Pedido demo de marcação\n\nNome: ${payload.name}\nEmail: ${payload.email}\nTelefone: ${payload.phone}\nClínica: ${payload.clinic}\nMensagem: ${payload.message || '-'}\nOrigem: Protótipo REDE SORRISO`
  );
  window.location.href = `mailto:brunoairesaugusto@gmail.com?subject=${subject}&body=${body}`;
}

document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const status = document.getElementById('contactStatus');
  const data = Object.fromEntries(new FormData(e.target).entries());
  status.textContent = 'A registar contacto...';
  const res = await logToSheet({ type: 'lead', ...data, clinicSelected: selectedClinic?.name || '' });
  openDemoEmail(data);
  status.textContent = res.ok ? 'Contacto registado na Google Sheet (ou endpoint configurado).' : 'Contacto local pronto; configura endpoint Apps Script para registo remoto.';
  e.target.reset();
});

renderClinicList(clinics);
renderDetail(clinics[0]);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}
