import validate from './email-validator.js';

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
    appTitle.textContent = this.title;
    appSubtitle.className = 'app-subtitle';
    appSubtitle.innerHTML = 'Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.';

    emailForm.className = 'app-section__form';
    input.className = 'app-section__form-input';
    input.setAttribute('placeholder', 'Email');
    input.setAttribute('required', true);
    input.setAttribute('type', 'email');
    input.value = localStorage.getItem('email');
    button.className = 'app-section__button app-section__button--join-op';
    button.textContent = this.buttonText;

    const subscribe = () => {
      button.textContent = 'unsubscribe';
      input.classList.add('hidden');
      localStorage.setItem('subcribed', 'true');
      input.value = '';
    };

    const unsubscribe = () => {
      button.textContent = this.buttonText;
      input.classList.remove('hidden');
      localStorage.setItem('subcribed', 'false');
      input.value = '';
    };

    const isSub = localStorage.getItem('subcribed');
    
    if(isSub) {
      subscribe();
    }

    input.addEventListener('input', () => {
      localStorage.setItem('email', input.value);
    });

    button.addEventListener('click', () => {
      if(button.textContent === 'unsubscribe') {
        unsubscribe();
        localStorage.clear();
      }
    });

    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = input.value;
      const emailIsValid = validate(email);
      const storedEmail = localStorage.getItem('email');
      
      if(emailIsValid && storedEmail) {
        subscribe();
      }
    });

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