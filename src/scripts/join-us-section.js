import { validate } from './email-validator.js';

class JoinUsSection {
  constructor(title, buttonText) {
    this.title = title || 'Join Our Program';
    this.buttonText = buttonText || 'subscribe';
    this.section = null;
  }

  createSection() {
    const joinOurProgram = document.createElement('section');
    const appTitle = document.createElement('h2');
    const appSubtitle = document.createElement('h3');
    const emailForm = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
  
    joinOurProgram.className = 'app-section app-section--join-our-program';
    appTitle.className = 'app-title';
    appTitle.innerHTML = this.title;
    appSubtitle.className = 'app-subtitle';
    appSubtitle.innerHTML = 'Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.';
    emailForm.className = 'app-section__form not-sub';
    input.className = 'app-section__form-input';
    input.placeholder = 'Email';
    input.required = true;
    input.type = 'email';
    input.value = localStorage.getItem('email');
    button.className = 'app-section__button app-section__button--join-op';
    button.innerHTML = this.buttonText;

    const checkSub = () => {
      const email = localStorage.getItem('email');
      const ifNotSub = emailForm.classList.contains('not-sub')

      if(ifNotSub && email) {
        emailForm.classList.toggle('not-sub');
        button.innerHTML = 'unsubscribe';
        input.style.display = 'none';
        localStorage.setItem('sub', true);
      } else {
        emailForm.classList.toggle('not-sub');
        input.style.display = '';
        input.value = ''
        localStorage.clear();
      }
    }
    
    input.addEventListener('input', e => {
      localStorage.setItem('email', input.value);
    });

    emailForm.addEventListener('submit', e => {
      e.preventDefault();

      const email = input.value;
      const isValid = validate(email);

      if (isValid) {
        checkSub();
      } else {
        alert('Enter a correct email');
      }
    });

    const isSub = localStorage.getItem('sub');

    if(isSub) {
      checkSub();
    }
  
    emailForm.append(input, button);
    joinOurProgram.append(appTitle, appSubtitle, emailForm);
    this.section = joinOurProgram;
    
    return joinOurProgram;
  }

  remove() {
    if (this.section) {
      this.section.remove();
    }
  }
}

class SectionCreator {
  constructor() {
    this.standard = new JoinUsSection();
    this.advanced = new JoinUsSection('Join Our Advanced Program', 'Subscribe to Advanced Program');
  }
  
  create(type) {
    switch (type) {
      case 'standard':
        return this.standard.createSection();
      case 'advanced':
        return this.advanced.createSection();
      default: 
        throw new Error('Invalid section type');
    }
  }
}

export default SectionCreator;