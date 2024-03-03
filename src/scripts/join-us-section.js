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
    appSubtitle.innerHTML = 'Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.'
    emailForm.className = 'app-section__form';
    input.className = 'app-section__form-input';
    input.setAttribute('placeholder', 'Email');
    input.setAttribute('required', true);
    input.setAttribute('type', 'email');
    button.className = 'app-section__button app-section__button--join-op';
    button.textContent = this.buttonText;

    emailForm.append(input, button);

    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = input.value;
      console.log(email);
    });
    
    joinOurProgram.append(appTitle, appSubtitle, emailForm);
    this.section = joinOurProgram;
    
    return joinOurProgram;
  }

  remove() {
    if(this.section) {
      this.section.remove();
    }
  }
}

class SectionCreator {
  create(type) {
    switch (type) {
      case 'standard':
        return new JoinUsSection().createSection();
      case 'advanced':
        return new JoinUsSection('Join Our Advanced Program', 'Subscribe to Advanced Program').createSection();
      default: 
        throw new Error('Invalid section type');
    }
  }
}

export { SectionCreator }