class WebsiteSection extends HTMLElement {
  constructor(){
    super();  
    this.attachShadow({mode: 'open'});
  }

  connectedCallback() {

    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    
    if(!title) {
      throw new Error("error");
    }
    
    const section = this.getAttribute('section');
    let titleContent = `<h2 class="app-title">${title}</h2>`;
    let descriptionContent = `<h3 class="app-subtitle">${description}</h3>`;

    if(section === 'read-more') {
      titleContent = `<h2 class="app-title app-title--dark">${title}</h2>`;
      descriptionContent = `<h3 class="app-subtitle app-subtitle--dark">${description}</h3>`;
    }

      this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="main.css">
      <slot name="logo"></slot>
      ${titleContent}
      <slot name="our-culture-btn"></slot>
      ${descriptionContent}
      <slot name="article"></slot>
      <slot name="read-more-btn"></slot>
      `
  }
}

customElements.define('website-section', WebsiteSection);
