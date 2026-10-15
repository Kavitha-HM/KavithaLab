(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const d of t.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&l(d)}).observe(document,{childList:!0,subtree:!0});function s(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(o){if(o.ep)return;o.ep=!0;const t=s(o);fetch(o.href,t)}})();const T="lab-language",r={lang:localStorage.getItem(T)||"en"},k=new URL("../data/",import.meta.url);function v(e){return new URL(e,k).href}function a(e,n){if(!e)return"";const s=`${n}_${r.lang}`;return e[s]?e[s]:e[n]?e[n]:e[`${n}_en`]?e[`${n}_en`]:e[`${n}_ja`]?e[`${n}_ja`]:typeof e=="string"?e:""}async function $(){const[e,n,s,l,o]=await Promise.all([fetch(v("professor.json")).then(t=>t.json()),fetch(v("members.json")).then(t=>t.json()),fetch(v("research.json")).then(t=>t.json()),fetch(v("publications.json")).then(t=>t.json()),fetch(v("news.json")).then(t=>t.json())]);return{professor:e,members:n,research:s,publications:l,news:o}}function H(e){r.lang=e,localStorage.setItem(T,e),document.documentElement.lang=e,document.querySelectorAll(".lang-btn").forEach(n=>{const s=n.dataset.lang===e;n.classList.toggle("active",s),n.setAttribute("aria-pressed",String(s))}),document.body.dataset.page==="home"&&P(),document.body.dataset.page==="research"&&S(),document.body.dataset.page==="members"&&C(),document.body.dataset.page==="publications"&&x(),document.body.dataset.page==="news"&&N(),document.body.dataset.page==="contact"&&R()}function b(e){const n=document.getElementById("brand-name"),s=document.getElementById("brand-lab");n&&(n.textContent=a(e.professor,"name")),s&&(s.textContent=r.lang==="ja"?"研究室":"Research Laboratory")}function P(){$().then(({professor:e,members:n,research:s,publications:l,news:o})=>{const t=e;b({professor:t});const d=document.getElementById("hero-title"),p=document.getElementById("hero-university"),g=document.getElementById("hero-department"),y=document.getElementById("hero-description"),j=document.getElementById("hero-tag"),E=document.getElementById("hero-image");d&&(d.textContent=a(t,"lab_name")),p&&(p.textContent=a(t,"university")),g&&(g.textContent=a(t,"department")),y&&(y.textContent=a(t,"hero_description")),j&&(j.textContent=r.lang==="ja"?"研究室":"Research Laboratory"),E&&(E.src=t.lab_image);const h=document.getElementById("about-heading");h&&(h.textContent=a(t,"about_heading"));const f=document.getElementById("lab-intro");f&&(f.textContent=a(t,"about_intro"));const c=document.getElementById("research-areas");if(c){const u=s.slice(0,5);c.innerHTML=u.map(i=>`
        <article class="research-card">
          <img src="${i.image}" alt="${a(i,"title")}" />
          <div class="research-body">
            <h3>${a(i,"title")}</h3>
            <p>${a(i,"description")}</p>
            <div class="tag-row">
              ${i.keywords.slice(0,3).map(w=>`<span>${w}</span>`).join("")}
            </div>
          </div>
        </article>
      `).join("")}const m=document.getElementById("professor-card");if(m){const u=r.lang==="ja"?t.interests_ja:t.interests_en,i=r.lang==="ja"?t.education_ja:t.education_en,w=t.name_ja||"Japanese name";m.innerHTML=`
        <div class="profile-figure">
          <img src="${t.photo}" alt="${a(t,"name")}" />
        </div>
        <div class="profile-content">
          <div class="profile-header">
            <div>
              <p class="section-tag small-tag">${r.lang==="ja"?"教授プロフィール":"Professor Profile"}</p>
              <h3>${a(t,"name")}</h3>
              <p class="profile-name-jp">${r.lang==="ja"?w:"Japanese name"}</p>
            </div>
            <span class="position-badge">${a(t,"position")}</span>
          </div>
          <p class="profile-meta">${a(t,"university")} · ${a(t,"department")}</p>
          <p>${a(t,"biography")}</p>
          <dl class="info-list">
            <div>
              <dt>${r.lang==="ja"?"研究分野":"Research Interests"}</dt>
              <dd>${u.join(", ")}</dd>
            </div>
            <div>
              <dt>${r.lang==="ja"?"学歴":"Education"}</dt>
              <dd>${i.join(" · ")}</dd>
            </div>
          </dl>
        </div>
      `}const L=document.getElementById("featured-research");L&&(L.innerHTML=s.slice(0,3).map(u=>`
        <article class="project-card">
          <img src="${u.image}" alt="${a(u,"title")}" />
          <div class="project-body">
            <div class="project-badge">${r.lang==="ja"?"研究テーマ":"Research Theme"}</div>
            <h3>${a(u,"title")}</h3>
            <p>${a(u,"description")}</p>
            <ul>
              ${u.keywords.slice(0,3).map(i=>`<li>${i}</li>`).join("")}
            </ul>
          </div>
        </article>
      `).join(""));const I=document.getElementById("publication-list");if(I){const u=l.publications.slice(0,3);I.innerHTML=u.map(i=>`
        <article class="publication-item">
          <div class="publication-type">${i.type}</div>
          <div class="publication-copy">
            <h3>${a(i,"title")}</h3>
            <p>${i.authors}</p>
            <span>${i.venue} · ${i.year}</span>
          </div>
        </article>
      `).join("")}const A=document.getElementById("news-list");if(A){const u=o.news.slice(0,3);A.innerHTML=u.map(i=>`
        <article class="news-card">
          <img src="${i.image}" alt="${a(i,"title")}" />
          <div class="news-body">
            <div class="news-meta">
              <span>${i.date}</span>
              <span class="badge">${r.lang==="ja"&&i.category_ja||i.category}</span>
            </div>
            <h3>${a(i,"title")}</h3>
            <p>${a(i,"summary")}</p>
          </div>
        </article>
      `).join("")}const B=document.getElementById("member-preview");if(B){const u=n.members.slice(0,4);B.innerHTML=u.map(i=>`
        <article class="member-card preview-member" data-member-id="${i.id}">
          <img src="${i.photo||""}" alt="${a(i,"name")}" />
          <div>
            <h3>${a(i,"name")}</h3>
            <p>${a(i,"position")}</p>
          </div>
        </article>
      `).join("")}const _=document.getElementById("footer-title");_&&(_.textContent=a(t,"lab_name"));const M=document.getElementById("year");M&&(M.textContent=new Date().getFullYear())})}function S(){$().then(({research:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");s&&(s.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">Research</p>
        <h1>${r.lang==="ja"?"研究領域":"Research Areas"}</h1>
      </div>
      <div class="research-grid full-grid">
        ${e.map(l=>`
          <article class="research-card large-card">
            <img src="${l.image}" alt="${a(l,"title")}" />
            <div class="research-body">
              <h3>${a(l,"title")}</h3>
              <p>${a(l,"description")}</p>
              <div class="tag-row">
                ${l.keywords.map(o=>`<span>${o}</span>`).join("")}
              </div>
              <div class="meta-block">
                <p><strong>${r.lang==="ja"?"関連メンバー":"Related members"}:</strong> ${l.members.join(", ")}</p>
                <p><strong>${r.lang==="ja"?"関連論文":"Related publications"}:</strong> ${l.publications.join(", ")}</p>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `)})}function C(){$().then(({members:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");if(!s)return;const o=["Professor","Researchers","Postdoctoral Researchers","PhD Students","Master's Students","Undergraduate Students","Alumni"].map(t=>{const d=e.members.filter(p=>p.category===t);return d.length?`
        <div class="member-group">
          <h2 class="group-title">${t}</h2>
          <div class="member-grid">
            ${d.map(p=>`
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
        <h1>${r.lang==="ja"?"研究室メンバー":"Laboratory Members"}</h1>
      </div>
      ${o}
    `,O()})}function x(){$().then(({publications:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");if(!s)return;const l=[...new Set(e.publications.map(d=>d.year))].sort((d,p)=>p-d),o=["All","Journal","Conference","Book","Other"],t=(d="All",p="All")=>{const y=e.publications.filter(c=>{const m=d==="All"||String(c.year)===d,L=p==="All"||c.type===p;return m&&L}).reduce((c,m)=>(c[m.year]||(c[m.year]=[]),c[m.year].push(m),c),{}),j=Object.keys(y).sort((c,m)=>Number(m)-Number(c)),E=j.length?j.map(c=>`
            <div class="year-group">
              <h2>${c}</h2>
              <div class="publication-stack">
                ${y[c].map(m=>`
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
          `).join(""):`<p class="empty-state">${r.lang==="ja"?"該当する論文はありません。":"No publications match the selected filters."}</p>`;s.innerHTML=`
        <div class="section-heading">
          <p class="section-tag">Publications</p>
          <h1>${r.lang==="ja"?"学術論文":"Academic Publications"}</h1>
        </div>
        <div class="filter-row">
          <label>
            <span>${r.lang==="ja"?"年":"Year"}</span>
            <select id="yearFilter">
              <option value="All">${r.lang==="ja"?"すべての年":"All years"}</option>
              ${l.map(c=>`<option value="${c}">${c}</option>`).join("")}
            </select>
          </label>
          <label>
            <span>${r.lang==="ja"?"種別":"Type"}</span>
            <select id="typeFilter">
              ${o.map(c=>`<option value="${c==="All"?"All":c}">${c==="All"?r.lang==="ja"?"すべての種別":"All types":c}</option>`).join("")}
            </select>
          </label>
        </div>
        ${E}
      `;const h=document.getElementById("yearFilter"),f=document.getElementById("typeFilter");h&&(h.value=d,h.addEventListener("change",c=>t(c.target.value,f?f.value:"All"))),f&&(f.value=p,f.addEventListener("change",c=>t(h?h.value:"All",c.target.value)))};t()})}function N(){$().then(({news:e,professor:n})=>{b({professor:n});const s=document.getElementById("page-content");s&&(s.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">News</p>
        <h1>${r.lang==="ja"?"ニュースとお知らせ":"News & Announcements"}</h1>
      </div>
      <div class="news-grid full-news-grid">
        ${e.news.map(l=>`
          <article class="news-card full-card">
            <img src="${l.image}" alt="${a(l,"title")}" />
            <div class="news-body">
              <div class="news-meta">
                <span>${l.date}</span>
                <span class="badge">${l.category}</span>
              </div>
              <h3>${a(l,"title")}</h3>
              <p>${a(l,"summary")}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `)})}function R(){$().then(({professor:e})=>{b({professor:e});const n=document.getElementById("page-content");if(!n)return;const s=r.lang==="ja"?e.contact.address_ja:e.contact.address_en;n.innerHTML=`
      <div class="section-heading">
        <p class="section-tag">Contact</p>
        <h1>${r.lang==="ja"?"お問い合わせ":"Contact"}</h1>
      </div>
      <div class="contact-page-grid">
        <div class="panel contact-card">
          <h2>${a(e,"lab_name")}</h2>
          <p>${a(e,"university")} · ${a(e,"department")}</p>
          <ul class="contact-list">
            <li><strong>${r.lang==="ja"?"住所":"Address"}:</strong> ${s}</li>
            <li><strong>Email:</strong> <a href="mailto:${e.contact.email}">${e.contact.email}</a></li>
            <li><strong>${r.lang==="ja"?"電話":"Phone"}:</strong> ${e.contact.phone}</li>
            <li><strong>Google Maps:</strong> <a href="${e.contact.maps_url}" target="_blank" rel="noreferrer">Open map</a></li>
          </ul>
        </div>
        <div class="panel map-card">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80" alt="University campus" />
        </div>
      </div>
    `})}function O(){document.querySelectorAll(".detail-trigger").forEach(n=>{n.addEventListener("click",async()=>{const s=Number(n.dataset.memberId),o=(await fetch(v("members.json")).then(g=>g.json())).members.find(g=>g.id===s);if(!o)return;if(!document.getElementById("member-modal")){const g=document.createElement("div");g.id="member-modal",g.className="member-modal",g.innerHTML=`
          <div class="member-modal-card">
            <button type="button" class="modal-close" aria-label="Close">×</button>
            <div class="member-modal-body"></div>
          </div>
        `,document.body.appendChild(g)}const d=document.getElementById("member-modal"),p=d.querySelector(".member-modal-body");p.innerHTML=`
        <img src="${o.photo||""}" alt="${a(o,"name")}" />
        <div>
          <p class="section-tag small-tag">${r.lang==="ja"?"研究室メンバー":"Laboratory Member"}</p>
          <h2>${a(o,"name")}</h2>
          <p class="modal-role">${a(o,"position")}</p>
          <p class="modal-topic">${r.lang==="ja"?"研究テーマ":"Research topic"}: ${a(o,"research_topic")}</p>
          <p>${a(o,"bio")}</p>
          ${o.email?`<p><strong>Email:</strong> <a href="mailto:${o.email}">${o.email}</a></p>`:""}
        </div>
      `,d.classList.add("is-open"),d.querySelector(".modal-close").addEventListener("click",()=>d.classList.remove("is-open")),d.addEventListener("click",g=>{g.target===d&&d.classList.remove("is-open")})})})}function q(){const e=document.querySelector(".menu-toggle"),n=document.querySelector(".nav-links");e&&n&&(e.addEventListener("click",()=>{const s=n.classList.toggle("is-open");e.setAttribute("aria-expanded",String(s))}),n.querySelectorAll("a").forEach(s=>{s.addEventListener("click",()=>{n.classList.remove("is-open"),e.setAttribute("aria-expanded","false")})}))}function D(){document.querySelectorAll(".lang-btn").forEach(e=>{e.addEventListener("click",()=>H(e.dataset.lang))})}function U(){q(),D();const e=document.body.dataset.page;document.documentElement.lang=r.lang,document.querySelectorAll(".lang-btn").forEach(n=>{const s=n.dataset.lang===r.lang;n.classList.toggle("active",s),n.setAttribute("aria-pressed",String(s))}),e==="home"&&P(),e==="research"&&S(),e==="members"&&C(),e==="publications"&&x(),e==="news"&&N(),e==="contact"&&R()}document.addEventListener("DOMContentLoaded",U);
