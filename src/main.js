const LANGUAGE_KEY = 'lab-language';

const LABELS = {
  en: {
    researchAreas: 'Research Areas',
    professorProfile: 'Professor Profile',
    featuredResearch: 'Featured Research',
    latestPublications: 'Latest Publications',
    latestNews: 'Latest News',
    labMembers: 'Laboratory Members',
    exploreResearch: 'Explore Research',
    publications: 'Publications',
    internal: 'Research Laboratory',
    about: 'About the Laboratory',
    viewAll: 'View all',
    allYears: 'All years',
    allTypes: 'All types',
    journal: 'Journal',
    conference: 'Conference',
    book: 'Book',
    other: 'Other',
    contact: 'Contact',
    education: 'Education',
    academicCareer: 'Academic Career',
    researchInterests: 'Research Interests',
    academicProfiles: 'Academic Profiles',
    viewProfile: 'View profile',
    memberProfile: 'Member Profile'
  },
  ja: {
    researchAreas: '研究領域',
    professorProfile: '教授プロフィール',
    featuredResearch: '注目研究',
    latestPublications: '最新論文',
    latestNews: '最新ニュース',
    labMembers: '研究室メンバー',
    exploreResearch: '研究を見る',
    publications: '論文',
    internal: '研究室',
    about: '研究室紹介',
    viewAll: 'すべて見る',
    allYears: 'すべての年',
    allTypes: 'すべての種別',
    journal: '雑誌',
    conference: '学会',
    book: '書籍',
    other: 'その他',
    contact: '連絡先',
    education: '学歴',
    academicCareer: '学術経歴',
    researchInterests: '研究分野',
    academicProfiles: '研究者プロフィール',
    viewProfile: 'プロフィールを見る',
    memberProfile: 'メンバー詳細'
  }
};

const pageState = {
  lang: localStorage.getItem(LANGUAGE_KEY) || 'en'
};

function dataUrl(fileName) {
  const base = import.meta.env.BASE_URL || '/';
  return new URL(`data/${fileName}`, `${window.location.origin}${base}`).href;
}

function textValue(value, key) {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object') {
    const candidate = value[pageState.lang] || value.en || value.ja || '';
    const alt = value[`${key}_${pageState.lang}`] || value[`${key}_en`] || value[`${key}_ja`] || '';
    return candidate || alt;
  }
  return '';
}

function getLocaleText(item, base) {
  if (!item) return '';
  const key = `${base}_${pageState.lang}`;
  if (item[key]) return item[key];
  if (item[base]) return item[base];
  if (item[`${base}_en`]) return item[`${base}_en`];
  if (item[`${base}_ja`]) return item[`${base}_ja`];
  if (typeof item === 'string') return item;
  return '';
}

function currentLangLabel() {
  return pageState.lang === 'ja' ? '日本語' : 'English';
}

async function fetchData() {
  const [professor, members, research, publications, news, siteConfig] = await Promise.all([
    fetch(dataUrl('professor.json')).then((res) => res.json()),
    fetch(dataUrl('members.json')).then((res) => res.json()),
    fetch(dataUrl('research.json')).then((res) => res.json()),
    fetch(dataUrl('publications.json')).then((res) => res.json()),
    fetch(dataUrl('news.json')).then((res) => res.json()),
    fetch(dataUrl('site-config.json')).then((res) => res.json())
  ]);

  return { professor, members, research, publications, news, siteConfig };
}

function setLanguage(lang) {
  pageState.lang = lang;
  localStorage.setItem(LANGUAGE_KEY, lang);
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  if (document.body.dataset.page === 'home') renderHome();
  if (document.body.dataset.page === 'research') renderResearchPage();
  if (document.body.dataset.page === 'members') renderMembersPage();
  if (document.body.dataset.page === 'publications') renderPublicationsPage();
  if (document.body.dataset.page === 'news') renderNewsPage();
  if (document.body.dataset.page === 'contact') renderContactPage();
}

function updateBrand(data) {
  const brandName = document.getElementById('brand-name');
  const brandLab = document.getElementById('brand-lab');
  const siteConfig = data.siteConfig || {};
  if (brandName) {
    brandName.textContent = getLocaleText(data.professor, 'name');
  }
  if (brandLab) {
    brandLab.textContent = siteConfig.siteTagline || (pageState.lang === 'ja' ? '研究室' : 'Research Laboratory');
  }
}

function renderHome() {
  fetchData().then(({ professor, members, research, publications, news, siteConfig }) => {
    const data = professor;

    updateBrand({ professor: data, siteConfig: siteConfig || {} });

    const heroTitle = document.getElementById('hero-title');
    const heroUniversity = document.getElementById('hero-university');
    const heroDepartment = document.getElementById('hero-department');
    const heroDescription = document.getElementById('hero-description');
    const heroTag = document.getElementById('hero-tag');
    const heroImage = document.getElementById('hero-image');

    if (heroTitle) heroTitle.textContent = getLocaleText(data, 'lab_name');
    if (heroUniversity) heroUniversity.textContent = getLocaleText(data, 'university');
    if (heroDepartment) heroDepartment.textContent = getLocaleText(data, 'department');
    if (heroDescription) heroDescription.textContent = getLocaleText(data, 'hero_description');
    if (heroTag) heroTag.textContent = pageState.lang === 'ja' ? '研究室' : 'Research Laboratory';
    if (heroImage) heroImage.src = data.lab_image;

    const aboutHeading = document.getElementById('about-heading');
    if (aboutHeading) aboutHeading.textContent = getLocaleText(data, 'about_heading');

    const labIntro = document.getElementById('lab-intro');
    if (labIntro) labIntro.textContent = getLocaleText(data, 'about_intro');

    const researchAreas = document.getElementById('research-areas');
    if (researchAreas) {
      const items = research.slice(0, 5);
      researchAreas.innerHTML = items.map((item) => `
        <article class="research-card">
          <img src="${item.image}" alt="${getLocaleText(item, 'title')}" />
          <div class="research-body">
            <h3>${getLocaleText(item, 'title')}</h3>
            <p>${getLocaleText(item, 'description')}</p>
            <div class="tag-row">
              ${item.keywords.slice(0, 3).map((keyword) => `<span>${keyword}</span>`).join('')}
            </div>
          </div>
        </article>
      `).join('');
    }

    const professorCard = document.getElementById('professor-card');
    if (professorCard) {
      const interests = pageState.lang === 'ja' ? data.interests_ja : data.interests_en;
      const education = pageState.lang === 'ja' ? data.education_ja : data.education_en;
      const japaneseName = data.name_ja || 'Japanese name';
      professorCard.innerHTML = `
        <div class="profile-figure">
          <img src="${data.photo}" alt="${getLocaleText(data, 'name')}" />
        </div>
        <div class="profile-content">
          <div class="profile-header">
            <div>
              <p class="section-tag small-tag">${pageState.lang === 'ja' ? '教授プロフィール' : 'Professor Profile'}</p>
              <h3>${getLocaleText(data, 'name')}</h3>
              <p class="profile-name-jp">${pageState.lang === 'ja' ? japaneseName : 'Japanese name'}</p>
            </div>
            <span class="position-badge">${getLocaleText(data, 'position')}</span>
          </div>
          <p class="profile-meta">${getLocaleText(data, 'university')} · ${getLocaleText(data, 'department')}</p>
          <p>${getLocaleText(data, 'biography')}</p>
          <dl class="info-list">
            <div>
              <dt>${pageState.lang === 'ja' ? '研究分野' : 'Research Interests'}</dt>
              <dd>${interests.join(', ')}</dd>
            </div>
            <div>
              <dt>${pageState.lang === 'ja' ? '学歴' : 'Education'}</dt>
              <dd>${education.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      `;
    }

    const featuredResearch = document.getElementById('featured-research');
    if (featuredResearch) {
      featuredResearch.innerHTML = research.slice(0, 3).map((item) => `
        <article class="project-card">
          <img src="${item.image}" alt="${getLocaleText(item, 'title')}" />
          <div class="project-body">
            <div class="project-badge">${pageState.lang === 'ja' ? '研究テーマ' : 'Research Theme'}</div>
            <h3>${getLocaleText(item, 'title')}</h3>
            <p>${getLocaleText(item, 'description')}</p>
            <ul>
              ${item.keywords.slice(0, 3).map((keyword) => `<li>${keyword}</li>`).join('')}
            </ul>
          </div>
        </article>
      `).join('');
    }

    const publicationList = document.getElementById('publication-list');
    if (publicationList) {
      const firstItems = publications.publications.slice(0, 3);
      publicationList.innerHTML = firstItems.map((item) => `
        <article class="publication-item">
          <div class="publication-type">${item.type}</div>
          <div class="publication-copy">
            <h3>${getLocaleText(item, 'title')}</h3>
            <p>${item.authors}</p>
            <span>${item.venue} · ${item.year}</span>
          </div>
        </article>
      `).join('');
    }

    const newsList = document.getElementById('news-list');
    if (newsList) {
      const latestNews = news.news.slice(0, 3);
      newsList.innerHTML = latestNews.map((item) => `
        <article class="news-card">
          <img src="${item.image}" alt="${getLocaleText(item, 'title')}" />
          <div class="news-body">
            <div class="news-meta">
              <span>${item.date}</span>
              <span class="badge">${pageState.lang === 'ja' ? (item.category_ja || item.category) : item.category}</span>
            </div>
            <h3>${getLocaleText(item, 'title')}</h3>
            <p>${getLocaleText(item, 'summary')}</p>
          </div>
        </article>
      `).join('');
    }

    const memberPreview = document.getElementById('member-preview');
    if (memberPreview) {
      const previewMembers = members.members.slice(0, 4);
      memberPreview.innerHTML = previewMembers.map((member) => `
        <article class="member-card preview-member" data-member-id="${member.id}">
          <img src="${member.photo || ''}" alt="${getLocaleText(member, 'name')}" />
          <div>
            <h3>${getLocaleText(member, 'name')}</h3>
            <p>${getLocaleText(member, 'position')}</p>
          </div>
        </article>
      `).join('');
    }

    const footerTitle = document.getElementById('footer-title');
    if (footerTitle) footerTitle.textContent = getLocaleText(data, 'lab_name');

    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });
}

function renderResearchPage() {
  fetchData().then(({ research, professor }) => {
    updateBrand({ professor: professor });
    const root = document.getElementById('page-content');
    if (!root) return;
    root.innerHTML = `
      <div class="section-heading">
        <p class="section-tag">Research</p>
        <h1>${pageState.lang === 'ja' ? '研究領域' : 'Research Areas'}</h1>
      </div>
      <div class="research-grid full-grid">
        ${research.map((item) => `
          <article class="research-card large-card">
            <img src="${item.image}" alt="${getLocaleText(item, 'title')}" />
            <div class="research-body">
              <h3>${getLocaleText(item, 'title')}</h3>
              <p>${getLocaleText(item, 'description')}</p>
              <div class="tag-row">
                ${item.keywords.map((keyword) => `<span>${keyword}</span>`).join('')}
              </div>
              <div class="meta-block">
                <p><strong>${pageState.lang === 'ja' ? '関連メンバー' : 'Related members'}:</strong> ${item.members.join(', ')}</p>
                <p><strong>${pageState.lang === 'ja' ? '関連論文' : 'Related publications'}:</strong> ${item.publications.join(', ')}</p>
              </div>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  });
}

function renderMembersPage() {
  fetchData().then(({ members, professor }) => {
    updateBrand({ professor: professor });
    const root = document.getElementById('page-content');
    if (!root) return;

    const categories = ['Professor', 'Researchers', 'Postdoctoral Researchers', 'PhD Students', 'Master\'s Students', 'Undergraduate Students', 'Alumni'];

    const markup = categories.map((category) => {
      const items = members.members.filter((member) => member.category === category);
      if (!items.length) return '';

      return `
        <div class="member-group">
          <h2 class="group-title">${category}</h2>
          <div class="member-grid">
            ${items.map((member) => `
              <article class="member-card detail-trigger" data-member-id="${member.id}">
                <img src="${member.photo}" alt="${getLocaleText(member, 'name')}" />
                <div class="member-body">
                  <h3>${getLocaleText(member, 'name')}</h3>
                  <p class="member-role">${getLocaleText(member, 'position')}</p>
                  <p class="member-topic">${getLocaleText(member, 'research_topic')}</p>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      `;
    }).join('');

    root.innerHTML = `
      <div class="section-heading">
        <p class="section-tag">Members</p>
        <h1>${pageState.lang === 'ja' ? '研究室メンバー' : 'Laboratory Members'}</h1>
      </div>
      ${markup}
    `;

    setupMemberDetails();
  });
}

function renderPublicationsPage() {
  fetchData().then(({ publications, professor }) => {
    updateBrand({ professor: professor });
    const root = document.getElementById('page-content');
    if (!root) return;

    const years = [...new Set(publications.publications.map((item) => item.year))].sort((a, b) => b - a);
    const types = ['All', 'Journal', 'Conference', 'Book', 'Other'];

    const renderList = (yearFilter = 'All', typeFilter = 'All') => {
      const filtered = publications.publications.filter((item) => {
        const matchesYear = yearFilter === 'All' || String(item.year) === yearFilter;
        const matchesType = typeFilter === 'All' || item.type === typeFilter;
        return matchesYear && matchesType;
      });

      const grouped = filtered.reduce((acc, item) => {
        if (!acc[item.year]) acc[item.year] = [];
        acc[item.year].push(item);
        return acc;
      }, {});

      const entries = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

      const listMarkup = entries.length
        ? entries.map((year) => `
            <div class="year-group">
              <h2>${year}</h2>
              <div class="publication-stack">
                ${grouped[year].map((item) => `
                  <article class="publication-item detail-item">
                    <div class="publication-type">${item.type}</div>
                    <div class="publication-copy">
                      <h3>${getLocaleText(item, 'title')}</h3>
                      <p>${item.authors}</p>
                      <span>${item.venue} · ${item.doi}</span>
                    </div>
                    <a class="small-button" href="${item.pdf || '#'}" target="_blank" rel="noreferrer">PDF</a>
                  </article>
                `).join('')}
              </div>
            </div>
          `).join('')
        : `<p class="empty-state">${pageState.lang === 'ja' ? '該当する論文はありません。' : 'No publications match the selected filters.'}</p>`;

      root.innerHTML = `
        <div class="section-heading">
          <p class="section-tag">Publications</p>
          <h1>${pageState.lang === 'ja' ? '学術論文' : 'Academic Publications'}</h1>
        </div>
        <div class="filter-row">
          <label>
            <span>${pageState.lang === 'ja' ? '年' : 'Year'}</span>
            <select id="yearFilter">
              <option value="All">${pageState.lang === 'ja' ? 'すべての年' : 'All years'}</option>
              ${years.map((year) => `<option value="${year}">${year}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>${pageState.lang === 'ja' ? '種別' : 'Type'}</span>
            <select id="typeFilter">
              ${types.map((type) => `<option value="${type === 'All' ? 'All' : type}">${type === 'All' ? (pageState.lang === 'ja' ? 'すべての種別' : 'All types') : type}</option>`).join('')}
            </select>
          </label>
        </div>
        ${listMarkup}
      `;

      const yearFilterEl = document.getElementById('yearFilter');
      const typeFilterEl = document.getElementById('typeFilter');
      if (yearFilterEl) {
        yearFilterEl.value = yearFilter;
        yearFilterEl.addEventListener('change', (event) => renderList(event.target.value, typeFilterEl ? typeFilterEl.value : 'All'));
      }
      if (typeFilterEl) {
        typeFilterEl.value = typeFilter;
        typeFilterEl.addEventListener('change', (event) => renderList(yearFilterEl ? yearFilterEl.value : 'All', event.target.value));
      }
    };

    renderList();
  });
}

function renderNewsPage() {
  fetchData().then(({ news, professor }) => {
    updateBrand({ professor: professor });
    const root = document.getElementById('page-content');
    if (!root) return;
    root.innerHTML = `
      <div class="section-heading">
        <p class="section-tag">News</p>
        <h1>${pageState.lang === 'ja' ? 'ニュースとお知らせ' : 'News & Announcements'}</h1>
      </div>
      <div class="news-grid full-news-grid">
        ${news.news.map((item) => `
          <article class="news-card full-card">
            <img src="${item.image}" alt="${getLocaleText(item, 'title')}" />
            <div class="news-body">
              <div class="news-meta">
                <span>${item.date}</span>
                <span class="badge">${item.category}</span>
              </div>
              <h3>${getLocaleText(item, 'title')}</h3>
              <p>${getLocaleText(item, 'summary')}</p>
            </div>
          </article>
        `).join('')}
      </div>
    `;
  });
}

function renderContactPage() {
  fetchData().then(({ professor }) => {
    updateBrand({ professor });
    const root = document.getElementById('page-content');
    if (!root) return;
    const addressText = pageState.lang === 'ja' ? professor.contact.address_ja : professor.contact.address_en;
    root.innerHTML = `
      <div class="section-heading">
        <p class="section-tag">Contact</p>
        <h1>${pageState.lang === 'ja' ? 'お問い合わせ' : 'Contact'}</h1>
      </div>
      <div class="contact-page-grid">
        <div class="panel contact-card">
          <h2>${getLocaleText(professor, 'lab_name')}</h2>
          <p>${getLocaleText(professor, 'university')} · ${getLocaleText(professor, 'department')}</p>
          <ul class="contact-list">
            <li><strong>${pageState.lang === 'ja' ? '住所' : 'Address'}:</strong> ${addressText}</li>
            <li><strong>Email:</strong> <a href="mailto:${professor.contact.email}">${professor.contact.email}</a></li>
            <li><strong>${pageState.lang === 'ja' ? '電話' : 'Phone'}:</strong> ${professor.contact.phone}</li>
            <li><strong>Google Maps:</strong> <a href="${professor.contact.maps_url}" target="_blank" rel="noreferrer">Open map</a></li>
          </ul>
        </div>
        <div class="panel map-card">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="University campus" />
        </div>
      </div>
    `;
  });
}

function setupMemberDetails() {
  const members = document.querySelectorAll('.detail-trigger');
  members.forEach((card) => {
    card.addEventListener('click', async () => {
      const id = Number(card.dataset.memberId);
      const memberData = await fetch(dataUrl('members.json')).then((res) => res.json());
      const match = memberData.members.find((member) => member.id === id);
      if (!match) return;

      const modal = document.getElementById('member-modal');
      if (!modal) {
        const overlay = document.createElement('div');
        overlay.id = 'member-modal';
        overlay.className = 'member-modal';
        overlay.innerHTML = `
          <div class="member-modal-card">
            <button type="button" class="modal-close" aria-label="Close">×</button>
            <div class="member-modal-body"></div>
          </div>
        `;
        document.body.appendChild(overlay);
      }

      const modalBox = document.getElementById('member-modal');
      const modalBody = modalBox.querySelector('.member-modal-body');
      modalBody.innerHTML = `
        <img src="${match.photo || ''}" alt="${getLocaleText(match, 'name')}" />
        <div>
          <p class="section-tag small-tag">${pageState.lang === 'ja' ? '研究室メンバー' : 'Laboratory Member'}</p>
          <h2>${getLocaleText(match, 'name')}</h2>
          <p class="modal-role">${getLocaleText(match, 'position')}</p>
          <p class="modal-topic">${pageState.lang === 'ja' ? '研究テーマ' : 'Research topic'}: ${getLocaleText(match, 'research_topic')}</p>
          <p>${getLocaleText(match, 'bio')}</p>
          ${match.email ? `<p><strong>Email:</strong> <a href="mailto:${match.email}">${match.email}</a></p>` : ''}
        </div>
      `;

      modalBox.classList.add('is-open');
      modalBox.querySelector('.modal-close').addEventListener('click', () => modalBox.classList.remove('is-open'));
      modalBox.addEventListener('click', (event) => {
        if (event.target === modalBox) modalBox.classList.remove('is-open');
      });
    });
  });
}

function bindNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

function bindLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
}

function initPage() {
  bindNavigation();
  bindLanguageButtons();
  const currentPage = document.body.dataset.page;
  document.documentElement.lang = pageState.lang;
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const active = btn.dataset.lang === pageState.lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  if (currentPage === 'home') renderHome();
  if (currentPage === 'research') renderResearchPage();
  if (currentPage === 'members') renderMembersPage();
  if (currentPage === 'publications') renderPublicationsPage();
  if (currentPage === 'news') renderNewsPage();
  if (currentPage === 'contact') renderContactPage();
}

document.addEventListener('DOMContentLoaded', initPage);
