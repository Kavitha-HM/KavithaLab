(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))c(o);new MutationObserver(o=>{for(const d of o)if(d.type==="childList")for(const t of d.addedNodes)t.tagName==="LINK"&&t.rel==="modulepreload"&&c(t)}).observe(document,{childList:!0,subtree:!0});function s(o){const d={};return o.integrity&&(d.integrity=o.integrity),o.referrerPolicy&&(d.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?d.credentials="include":o.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function c(o){if(o.ep)return;o.ep=!0;const d=s(o);fetch(o.href,d)}})();const P="lab-language",i={lang:localStorage.getItem(P)||"en"};function v(e){const n="/KavithaLab/";return new URL(`data/${e}`,`${window.location.origin}${n}`).href}function a(e,n){if(!e)return"";const s=`${n}_${i.lang}`;return e[s]?e[s]:e[n]?e[n]:e[`${n}_en`]?e[`${n}_en`]:e[`${n}_ja`]?e[`${n}_ja`]:typeof e=="string"?e:""}async function $(){const[e,n,s,c,o,d]=await Promise.all([fetch(v("professor.json")).then(t=>t.json()),fetch(v("members.json")).then(t=>t.json()),fetch(v("research.json")).then(t=>t.json()),fetch(v("publications.json")).then(t=>t.json()),fetch(v("news.json")).then(t=>t.json()),fetch(v("site-config.json")).then(t=>t.json())]);return{professor:e,members:n,research:s,publications:c,news:o,siteConfig:d}}function R(e){i.lang=e,localStorage.setItem(P,e),document.documentElement.lang=e,document.querySelectorAll(".lang-btn").forEach(n=>{const s=n.dataset.lang===e;n.classList.toggle("active",s),n.setAttribute("aria-pressed",String(s))}),document.body.dataset.page==="home"&&T(),document.body.dataset.page==="research"&&S(),document.body.dataset.page==="members"&&x(),document.body.dataset.page==="publications"&&N(),document.body.dataset.page==="news"&&k(),document.body.dataset.page==="contact"&&H()}function b(e){const n=document.getElementById("brand-name"),s=document.getElementById("brand-lab"),c=e.siteConfig||{};n&&(n.textContent=a(e.professor,"name")),s&&(s.textContent=c.siteTagline||(i.lang==="ja"?"研究室":"Research Laboratory"))}function T(){$().then(({professor:e,members:n,research:s,publications:c,news:o,siteConfig:d})=>{const t=e;b({professor:t,siteConfig:d||{}});const p=document.getElementById("hero-title"),u=document.getElementById("hero-university"),y=document.getElementById("hero-department"),j=document.getElementById("hero-description"),E=document.getElementById("hero-tag"),h=document.getElementById("hero-image");p&&(p.textContent=a(t,"lab_name")),u&&(u.textContent=a(t,"university")),y&&(y.textContent=a(t,"department")),j&&(j.textContent=a(t,"hero_description")),E&&(E.textContent=i.lang==="ja"?"研究室":"Research Laboratory"),h&&(h.src=t.lab_image);const f=document.getElementById("about-heading");f&&(f.textContent=a(t,"about_heading"));const l=document.getElementById("lab-intro");l&&(l.textContent=a(t,"about_intro"));const m=document.getElementById("research-areas");if(m){const g=s.slice(0,5);m.innerHTML=g.map(r=>`
        <article class="research-card">
          <img src="${r.image}" alt="${a(r,"title")}" />
          <div class="research-body">
            <h3>${a(r,"title")}</h3>
            <p>${a(r,"description")}</p>
            <div class="tag-row">
              ${r.keywords.slice(0,3).map(w=>`<span>${w}</span>`).join("")}
            </div>
          </div>
        </article>
      `).join("")}const L=document.getElementById("professor-card");if(L){const g=i.lang==="ja"?t.interests_ja:t.interests_en,r=i.lang==="ja"?t.education_ja:t.education_en,w=t.name_ja||"Japanese name";L.innerHTML=`
        <div class="profile-figure">
          <img src="${t.photo}" alt="${a(t,"name")}" />
        </div>
        <div class="profile-content">
          <div class="profile-header">
            <div>
              <p class="section-tag small-tag">${i.lang==="ja"?"教授プロフィール":"Professor Profile"}</p>
              <h3>${a(t,"name")}</h3>
              <p class="profile-name-jp">${i.lang==="ja"?w:"Japanese name"}</p>
            </div>
            <span class="position-badge">${a(t,"position")}</span>
          </div>
          <p class="profile-meta">${a(t,"university")} · ${a(t,"department")}</p>
          <p>${a(t,"biography")}</p>
          <dl class="info-list">
            <div>
              <dt>${i.lang==="ja"?"研究分野":"Research Interests"}</dt>
              <dd>${g.join(", ")}</dd>
            </div>
            <div>
              <dt>${i.lang==="ja"?"学歴":"Education"}</dt>
              <dd>${r.join(" · ")}</dd>
            </div>
          </dl>
        </div>
      `}const I=document.getElementById("featured-research");I&&(I.innerHTML=s.slice(0,3).map(g=>`
        <article class="project-card">
          <img src="${g.image}" alt="${a(g,"title")}" />
          <div class="project-body">
            <div class="project-badge">${i.lang==="ja"?"研究テーマ":"Research Theme"}</div>
            <h3>${a(g,"title")}</h3>
            <p>${a(g,"description")}</p>
            <ul>
              ${g.keywords.slice(0,3).map(r=>`<li>${r}</li>`).join("")}
            </ul>
          </div>
        </article>
      `).join(""));const B=document.getElementById("publication-list");if(B){const g=c.publications.slice(0,3);B.innerHTML=g.map(r=>`
        <article class="publication-item">
          <div class="publication-type">${r.type}</div>
          <div class="publication-copy">
            <h3>${a(r,"title")}</h3>
            <p>${r.authors}</p>
            <span>${r.venue} · ${r.year}</span>
          </div>
        </article>
      `).join("")}const A=document.getElementById("news-list");if(A){const g=o.news.slice(0,3);A.innerHTML=g.map(r=>`
        <article class="news-card">
          <img src="${r.image}" alt="${a(r,"title")}" />
          <div class="news-body">
            <div class="news-meta">
              <span>${r.date}</span>
              <span class="badge">${i.lang==="ja"&&r.category_ja||r.category}</span>
            </div>
            <h3>${a(r,"title")}</h3>
            <p>${a(r,"summary")}</p>
          </div>
        </article>
      `).join("")}const _=document.getElementById("member-preview");if(_){const g=n.members.slice(0,4);_.innerHTML=g.map(r=>`
        <article class="member-card preview-member" data-member-id="${r.id}">
          <img src="${r.photo||""}" alt="${a(r,"name")}" />
          <div>
            <h3>${a(r,"name")}</h3>
            <p>${a(r,"position")}</p>
          </div>
        </article>
      `).join("")}const M=document.getElementById("footer-title");M&&(M.textContent=a(t,"lab_name"));const C=document.getElementById("year");C&&(C.textContent=new Date().getFullYear())})}function S(){$().then(({research:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");s&&(s.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">Research</p>
        <h1>${i.lang==="ja"?"研究領域":"Research Areas"}</h1>
      </div>
      <div class="research-grid full-grid">
        ${e.map(c=>`
          <article class="research-card large-card">
            <img src="${c.image}" alt="${a(c,"title")}" />
            <div class="research-body">
              <h3>${a(c,"title")}</h3>
              <p>${a(c,"description")}</p>
              <div class="tag-row">
                ${c.keywords.map(o=>`<span>${o}</span>`).join("")}
              </div>
              <div class="meta-block">
                <p><strong>${i.lang==="ja"?"関連メンバー":"Related members"}:</strong> ${c.members.join(", ")}</p>
                <p><strong>${i.lang==="ja"?"関連論文":"Related publications"}:</strong> ${c.publications.join(", ")}</p>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `)})}function x(){$().then(({members:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");if(!s)return;const o=["Professor","Researchers","Postdoctoral Researchers","PhD Students","Master's Students","Undergraduate Students","Alumni"].map(d=>{const t=e.members.filter(p=>p.category===d);return t.length?`
        <div class="member-group">
          <h2 class="group-title">${d}</h2>
          <div class="member-grid">
            ${t.map(p=>`
              <article class="member-card detail-trigger" data-member-id="${p.id}">
                <img src="${p.photo}" alt="${a(p,"name")}" />
                <div class="member-body">
                  <h3>${a(p,"name")}</h3>
                  <p class="member-role">${a(p,"position")}</p>
                  <p class="member-topic">${a(p,"research_topic")}</p>
                </div>
              </article>
            `).join("")}
          </div>
        </div>
      `:""}).join("");s.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">Members</p>
        <h1>${i.lang==="ja"?"研究室メンバー":"Laboratory Members"}</h1>
      </div>
      ${o}
    `,q()})}function N(){$().then(({publications:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");if(!s)return;const c=[...new Set(e.publications.map(t=>t.year))].sort((t,p)=>p-t),o=["All","Journal","Conference","Book","Other"],d=(t="All",p="All")=>{const y=e.publications.filter(l=>{const m=t==="All"||String(l.year)===t,L=p==="All"||l.type===p;return m&&L}).reduce((l,m)=>(l[m.year]||(l[m.year]=[]),l[m.year].push(m),l),{}),j=Object.keys(y).sort((l,m)=>Number(m)-Number(l)),E=j.length?j.map(l=>`
            <div class="year-group">
              <h2>${l}</h2>
              <div class="publication-stack">
                ${y[l].map(m=>`
                  <article class="publication-item detail-item">
                    <div class="publication-type">${m.type}</div>
                    <div class="publication-copy">
                      <h3>${a(m,"title")}</h3>
                      <p>${m.authors}</p>
                      <span>${m.venue} · ${m.doi}</span>
                    </div>
                    <a class="small-button" href="${m.pdf||"#"}" target="_blank" rel="noreferrer">PDF</a>
                  </article>
                `).join("")}
              </div>
            </div>
          `).join(""):`<p class="empty-state">${i.lang==="ja"?"該当する論文はありません。":"No publications match the selected filters."}</p>`;s.innerHTML=`
        <div class="section-heading">
          <p class="section-tag">Publications</p>
          <h1>${i.lang==="ja"?"学術論文":"Academic Publications"}</h1>
        </div>
        <div class="filter-row">
          <label>
            <span>${i.lang==="ja"?"年":"Year"}</span>
            <select id="yearFilter">
              <option value="All">${i.lang==="ja"?"すべての年":"All years"}</option>
              ${c.map(l=>`<option value="${l}">${l}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>${i.lang==="ja"?"種別":"Type"}</span>
            <select id="typeFilter">
              ${o.map(l=>`<option value="${l==="All"?"All":l}">${l==="All"?i.lang==="ja"?"すべての種別":"All types":l}</option>`).join("")}
            </select>
          </label>
        </div>
        ${E}
      `;const h=document.getElementById("yearFilter"),f=document.getElementById("typeFilter");h&&(h.value=t,h.addEventListener("change",l=>d(l.target.value,f?f.value:"All"))),f&&(f.value=p,f.addEventListener("change",l=>d(h?h.value:"All",l.target.value)))};d()})}function k(){$().then(({news:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");s&&(s.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">News</p>
        <h1>${i.lang==="ja"?"ニュースとお知らせ":"News & Announcements"}</h1>
      </div>
      <div class="news-grid full-news-grid">
        ${e.news.map(c=>`
          <article class="news-card full-card">
            <img src="${c.image}" alt="${a(c,"title")}" />
            <div class="news-body">
              <div class="news-meta">
                <span>${c.date}</span>
                <span class="badge">${c.category}</span>
              </div>
              <h3>${a(c,"title")}</h3>
              <p>${a(c,"summary")}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `)})}function H(){$().then(({professor:e})=>{b({professor:e});const n=document.getElementById("page-content");if(!n)return;const s=i.lang==="ja"?e.contact.address_ja:e.contact.address_en;n.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">Contact</p>
        <h1>${i.lang==="ja"?"お問い合わせ":"Contact"}</h1>
      </div>
      <div class="contact-page-grid">
        <div class="panel contact-card">
          <h2>${a(e,"lab_name")}</h2>
          <p>${a(e,"university")} · ${a(e,"department")}</p>
          <ul class="contact-list">
            <li><strong>${i.lang==="ja"?"住所":"Address"}:</strong> ${s}</li>
            <li><strong>Email:</strong> <a href="mailto:${e.contact.email}">${e.contact.email}</a></li>
            <li><strong>${i.lang==="ja"?"電話":"Phone"}:</strong> ${e.contact.phone}</li>
            <li><strong>Google Maps:</strong> <a href="${e.contact.maps_url}" target="_blank" rel="noreferrer">Open map</a></li>
          </ul>
        </div>
        <div class="panel map-card">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="University campus" />
        </div>
      </div>
    `})}function q(){document.querySelectorAll(".detail-trigger").forEach(n=>{n.addEventListener("click",async()=>{const s=Number(n.dataset.memberId),o=(await fetch(v("members.json")).then(u=>u.json())).members.find(u=>u.id===s);if(!o)return;if(!document.getElementById("member-modal")){const u=document.createElement("div");u.id="member-modal",u.className="member-modal",u.innerHTML=`
          <div class="member-modal-card">
            <button type="button" class="modal-close" aria-label="Close">×</button>
            <div class="member-modal-body"></div>
          </div>
        `,document.body.appendChild(u)}const t=document.getElementById("member-modal"),p=t.querySelector(".member-modal-body");p.innerHTML=`
        <img src="${o.photo||""}" alt="${a(o,"name")}" />
        <div>
          <p class="section-tag small-tag">${i.lang==="ja"?"研究室メンバー":"Laboratory Member"}</p>
          <h2>${a(o,"name")}</h2>
          <p class="modal-role">${a(o,"position")}</p>
          <p class="modal-topic">${i.lang==="ja"?"研究テーマ":"Research topic"}: ${a(o,"research_topic")}</p>
          <p>${a(o,"bio")}</p>
          ${o.email?`<p><strong>Email:</strong> <a href="mailto:${o.email}">${o.email}</a></p>`:""}
        </div>
      `,t.classList.add("is-open"),t.querySelector(".modal-close").addEventListener("click",()=>t.classList.remove("is-open")),t.addEventListener("click",u=>{u.target===t&&t.classList.remove("is-open")})})})}function D(){const e=document.querySelector(".menu-toggle"),n=document.querySelector(".nav-links");e&&n&&(e.addEventListener("click",()=>{const s=n.classList.toggle("is-open");e.setAttribute("aria-expanded",String(s))}),n.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{n.classList.remove("is-open"),e.setAttribute("aria-expanded","false")})}))}function O(){document.querySelectorAll(".lang-btn").forEach(e=>{e.addEventListener("click",()=>R(e.dataset.lang))})}function U(){D(),O();const e=document.body.dataset.page;document.documentElement.lang=i.lang,document.querySelectorAll(".lang-btn").forEach(n=>{const s=n.dataset.lang===i.lang;n.classList.toggle("active",s),n.setAttribute("aria-pressed",String(s))}),e==="home"&&T(),e==="research"&&S(),e==="members"&&x(),e==="publications"&&N(),e==="news"&&k(),e==="contact"&&H()}document.addEventListener("DOMContentLoaded",U);
