(function(){
  const $ = (sel, el=document) => el.querySelector(sel);
  const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));
  const app = $("#app");
  $("#year").textContent = new Date().getFullYear();

  const site = window.SITE;

  // Simple hash router: #/, #/experience, #/experience/:slug, #/projects, #/projects/:slug, #/certifications, #/contact
  function router(){
    const hash = location.hash || "#/";
    const [_, route, sub] = hash.split("/");
    if(!route){ return renderHome(); }

    switch(route){
      case "experience":
        return sub ? renderExperienceDetail(sub) : renderExperienceList();
      case "projects":
        return sub ? renderProjectDetail(sub) : renderProjectsList();
      case "":
        return renderHome();
      case "certifications":
        return renderCerts();
      case "contact":
        return renderContact();
      case "privacy":
        return renderStatic("Privacy", "This is a personal portfolio website. No tracking scripts are embedded. For inquiries, use the contact section.");
      case "imprint":
        return renderStatic("Imprint", "Information provided for professional networking purposes.");
      default:
        return renderNotFound();
    }
  }

  function hero(){
    return `
      <section class="hero">
        <div>
          <h1>${site.owner}</h1>
          <h2>${site.role}</h2>
          <p>${site.summary.join(" ")}</p>
          <div class="badges">
            <span class="badge">Digital Payments</span>
            <span class="badge">CBDC</span>
            <span class="badge">Program Management</span>
            <span class="badge">IS Audit</span>
          </div>
        </div>
        <div>
          <img src="assets/headshot.jpg" alt="Professional headshot" />
        </div>
      </section>
    `;
  }

  function renderHome(){
    app.innerHTML = `
      ${hero()}
      <section class="section">
        <h3>Recent Highlights</h3>
        <div class="grid">
          ${site.projects.slice(0,4).map(p => cardProject(p)).join("")}
        </div>
      </section>

      <section class="section">
        <h3>Experience at a Glance</h3>
        <div class="grid">
          ${site.experiences.slice(0,4).map(e => cardExperience(e)).join("")}
        </div>
      </section>

      <section class="section">
        <h3>Core Skills</h3>
        <div class="taglist">
          ${site.skills.map(s => `<span class="tag">${s}</span>`).join("")}
        </div>
      </section>
    `;
  }

  function cardExperience(e){
    return `
      <article class="card">
        <h4>${e.title}</h4>
        <div class="meta">${e.org} · ${e.period}</div>
        <p>${e.intro}</p>
        <a class="cta" href="#/experience/${e.slug}">View role</a>
      </article>
    `;
  }

  function cardProject(p){
    return `
      <article class="card">
        <h4>${p.name}</h4>
        <div class="meta">Key Impact</div>
        <p>${p.summary}</p>
        <a class="cta" href="#/projects/${p.slug}">View project</a>
      </article>
    `;
  }

  function renderExperienceList(){
    app.innerHTML = `
      <div class="content">
        <h1>Professional Experience</h1>
        <p class="lead">A leadership journey across banking technology, digital payments, audit, PMO, and branch operations.</p>
      </div>
      <div class="grid">
        ${site.experiences.map(e => cardExperience(e)).join("")}
      </div>
    `;
  }

  function renderExperienceDetail(slug){
    const e = site.experiences.find(x => x.slug === slug);
    if(!e) return renderNotFound();

    app.innerHTML = `
      <article class="detail">
        <div class="content">
          <h1>${e.title}</h1>
          <p class="lead">${e.org} · ${e.period}</p>
          <p>${e.intro}</p>

          <h2>Key Responsibilities & Achievements</h2>
          <ul>
            ${e.highlights.map(h => `<li>${h}</li>`).join("")}
          </ul>

          <div class="callout">
            Tip: Explore related projects under the “Projects” section for deeper technical and business outcomes.
          </div>

          <p><a class="cta" href="#/experience">Back to all experience</a></p>
        </div>
      </article>
    `;
  }

  function renderProjectsList(){
    app.innerHTML = `
      <div class="content">
        <h1>Projects</h1>
        <p class="lead">Selected initiatives spanning payments, audit, security, and digital transformation.</p>
      </div>
      <div class="grid">
        ${site.projects.map(p => cardProject(p)).join("")}
      </div>
    `;
  }

  function renderProjectDetail(slug){
    const p = site.projects.find(x => x.slug === slug);
    if(!p) return renderNotFound();

    app.innerHTML = `
      <article class="detail">
        <div class="content">
          <h1>${p.name}</h1>
          <p class="lead">${p.summary}</p>

          <h2>Business Impact</h2>
          <ul>
            ${p.impact.map
$$
