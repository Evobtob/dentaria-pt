const APPS_SCRIPT_WEBAPP_URL = "COLOCA_AQUI_O_URL_DO_APPS_SCRIPT_EXEC";
const likesKey = 'clinicLikes';
const likedKey = 'clinicLikedIds';
let clinicLikes = JSON.parse(localStorage.getItem(likesKey) || '{}');
let clinicLikedIds = JSON.parse(localStorage.getItem(likedKey) || '[]');

const clinics = [
  { id: 1, name: "Clínica Sorriso Boavista", zone: "Boavista, Porto", lat: 41.1623, lng: -8.6291, description: "Clínica moderna focada em estética dentária e implantologia.", services: ["Consulta geral", "Implantes", "Ortodontia", "Branqueamento"], prices: [["Consulta", "45€"], ["Destartarização", "60€"], ["Branqueamento", "220€"]], googleReview: { rating: 4.8, count: 214 }, likes: 48, socials: { instagram: "https://instagram.com", facebook: "https://facebook.com" } },
  { id: 2, name: "Porto Dental Matosinhos", zone: "Matosinhos", lat: 41.1821, lng: -8.6893, description: "Atendimento familiar, urgências e medicina dentária preventiva.", services: ["Urgência", "Odontopediatria", "Higiene oral"], prices: [["Consulta", "40€"], ["Urgência", "70€"], ["Restauração", "85€"]], googleReview: { rating: 4.6, count: 132 }, likes: 35, socials: { instagram: "https://instagram.com", website: "https://example.com" } },
  { id: 3, name: "Gaia Oral Center", zone: "Vila Nova de Gaia", lat: 41.1337, lng: -8.6174, description: "Especialistas em cirurgia oral, próteses e reabilitação oral.", services: ["Cirurgia oral", "Próteses", "Endodontia"], prices: [["Consulta", "50€"], ["Endodontia", "180€"], ["Prótese fixa", "650€"]], googleReview: { rating: 4.7, count: 189 }, likes: 41, socials: { facebook: "https://facebook.com", website: "https://example.com" } },
  { id: 4, name: "Foz Smile Clinic", zone: "Foz, Porto", lat: 41.1518, lng: -8.6715, description: "Dentisteria estética com foco em reabilitação oral.", services: ["Consulta", "Facetas", "Higiene oral"], prices: [["Consulta", "48€"], ["Facetas", "380€"], ["Higiene", "65€"]], googleReview: { rating: 4.9, count: 96 }, likes: 28, socials: { website: "https://example.com" } },
  { id: 5, name: "Invicta Dente", zone: "Paranhos, Porto", lat: 41.1763, lng: -8.6024, description: "Clínica generalista com bloco de cirurgia oral.", services: ["Consulta", "Cirurgia", "Implantes"], prices: [["Consulta", "42€"], ["Extração", "80€"], ["Implante", "890€"]], googleReview: { rating: 4.5, count: 173 }, likes: 31, socials: { facebook: "https://facebook.com" } },
  { id: 6, name: "Cedofeita Dental Hub", zone: "Cedofeita, Porto", lat: 41.1544, lng: -8.6146, description: "Odontologia digital e alinhadores transparentes.", services: ["Consulta", "Alinhadores", "Branqueamento"], prices: [["Consulta", "47€"], ["Branqueamento", "210€"], ["Alinhadores", "1450€"]], googleReview: { rating: 4.7, count: 121 }, likes: 27, socials: { instagram: "https://instagram.com" } },
  { id: 7, name: "Clínica Douro Sorriso", zone: "Campanhã, Porto", lat: 41.1499, lng: -8.5851, description: "Medicina dentária para família e urgência.", services: ["Urgência", "Consulta", "Odontopediatria"], prices: [["Consulta", "39€"], ["Urgência", "68€"], ["Destartarização", "58€"]], googleReview: { rating: 4.4, count: 88 }, likes: 22, socials: { website: "https://example.com" } },
  { id: 8, name: "Bonfim Oral Care", zone: "Bonfim, Porto", lat: 41.1549, lng: -8.5976, description: "Equipa multidisciplinar com ortodontia e estética.", services: ["Ortodontia", "Consulta", "Facetas"], prices: [["Consulta", "44€"], ["Facetas", "360€"], ["Aparelho", "1300€"]], googleReview: { rating: 4.8, count: 157 }, likes: 39, socials: { instagram: "https://instagram.com" } },
  { id: 9, name: "Sá da Bandeira Dental", zone: "Baixa, Porto", lat: 41.1473, lng: -8.6107, description: "Localização central e consultas de manutenção.", services: ["Consulta", "Higiene", "Endodontia"], prices: [["Consulta", "46€"], ["Higiene", "62€"], ["Endodontia", "175€"]], googleReview: { rating: 4.6, count: 110 }, likes: 26, socials: { facebook: "https://facebook.com" } },
  { id: 10, name: "Leça Smile Studio", zone: "Leça da Palmeira", lat: 41.1914, lng: -8.7005, description: "Odontologia estética com planeamento digital.", services: ["Branqueamento", "Consulta", "Implantes"], prices: [["Consulta", "45€"], ["Branqueamento", "230€"], ["Implante", "920€"]], googleReview: { rating: 4.7, count: 99 }, likes: 24, socials: { website: "https://example.com" } },
  { id: 11, name: "Matosinhos Prime Dental", zone: "Matosinhos Sul", lat: 41.1778, lng: -8.6881, description: "Clínica premium com reabilitação total.", services: ["Implantes", "Prótese", "Consulta"], prices: [["Consulta", "55€"], ["Implante", "980€"], ["Prótese", "690€"]], googleReview: { rating: 4.8, count: 206 }, likes: 46, socials: { instagram: "https://instagram.com" } },
  { id: 12, name: "Rio Tinto Dental Point", zone: "Rio Tinto", lat: 41.1783, lng: -8.5597, description: "Clínica de proximidade com foco em prevenção.", services: ["Consulta", "Higiene", "Restauração"], prices: [["Consulta", "38€"], ["Higiene", "55€"], ["Restauração", "78€"]], googleReview: { rating: 4.5, count: 140 }, likes: 29, socials: { facebook: "https://facebook.com" } },
  { id: 13, name: "Maia Smile Center", zone: "Maia", lat: 41.2359, lng: -8.6199, description: "Serviço abrangente com ortodontia infantil.", services: ["Odontopediatria", "Ortodontia", "Consulta"], prices: [["Consulta", "41€"], ["Aparelho", "1250€"], ["Higiene", "57€"]], googleReview: { rating: 4.6, count: 167 }, likes: 33, socials: { website: "https://example.com" } },
  { id: 14, name: "Ermesinde Clínica Oral", zone: "Ermesinde", lat: 41.2146, lng: -8.5502, description: "Consultas rápidas e urgências no próprio dia.", services: ["Urgência", "Consulta", "Extração"], prices: [["Consulta", "37€"], ["Urgência", "65€"], ["Extração", "75€"]], googleReview: { rating: 4.3, count: 101 }, likes: 18, socials: { facebook: "https://facebook.com" } },
  { id: 15, name: "Gondomar Dental Care", zone: "Gondomar", lat: 41.1425, lng: -8.5316, description: "Reabilitação oral e implantologia avançada.", services: ["Implantes", "Consulta", "Prótese"], prices: [["Consulta", "43€"], ["Implante", "910€"], ["Prótese", "640€"]], googleReview: { rating: 4.7, count: 154 }, likes: 36, socials: { instagram: "https://instagram.com" } },
  { id: 16, name: "Valongo Sorridente", zone: "Valongo", lat: 41.1883, lng: -8.4984, description: "Clínica moderna para adultos e crianças.", services: ["Consulta", "Odontopediatria", "Branqueamento"], prices: [["Consulta", "40€"], ["Branqueamento", "215€"], ["Higiene", "56€"]], googleReview: { rating: 4.5, count: 118 }, likes: 25, socials: { website: "https://example.com" } },
  { id: 17, name: "Vila do Conde Dental", zone: "Vila do Conde", lat: 41.3533, lng: -8.7452, description: "Equipe experiente em ortodontia e cirurgia oral.", services: ["Ortodontia", "Cirurgia", "Consulta"], prices: [["Consulta", "46€"], ["Cirurgia", "190€"], ["Aparelho", "1280€"]], googleReview: { rating: 4.6, count: 127 }, likes: 27, socials: { facebook: "https://facebook.com" } },
  { id: 18, name: "Póvoa Smile Dental", zone: "Póvoa de Varzim", lat: 41.3804, lng: -8.7636, description: "Clínica costeira com foco em estética dentária.", services: ["Facetas", "Branqueamento", "Consulta"], prices: [["Consulta", "44€"], ["Facetas", "370€"], ["Branqueamento", "225€"]], googleReview: { rating: 4.7, count: 143 }, likes: 30, socials: { instagram: "https://instagram.com" } },
  { id: 19, name: "Espinho Oral Clinic", zone: "Espinho", lat: 41.0072, lng: -8.6412, description: "Atendimento personalizado e tecnologia digital.", services: ["Consulta", "Implantes", "Endodontia"], prices: [["Consulta", "42€"], ["Implante", "900€"], ["Endodontia", "170€"]], googleReview: { rating: 4.6, count: 136 }, likes: 28, socials: { website: "https://example.com" } },
  { id: 20, name: "Santa Maria da Feira Dental", zone: "Santa Maria da Feira", lat: 40.9257, lng: -8.5422, description: "Clínica regional com cuidados completos de saúde oral.", services: ["Consulta", "Prótese", "Higiene"], prices: [["Consulta", "39€"], ["Prótese", "620€"], ["Higiene", "54€"]], googleReview: { rating: 4.5, count: 149 }, likes: 32, socials: { facebook: "https://facebook.com" } }
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
