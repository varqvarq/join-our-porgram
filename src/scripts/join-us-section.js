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
    appTitle.innerHTML = this.title;
    appSubtitle.className = 'app-subtitle app-subtitle--light';
    appSubtitle.innerHTML = 'Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.';
    emailForm.className = 'app-section__form not-sub';
    input.className = 'app-section__form-input';
    input.placeholder = 'Email';
    input.required = true;
    input.type = 'email';
    input.value = localStorage.getItem('email');
    button.className = 'app-section__button app-section__button--join-op';
    button.innerHTML = this.buttonText;

    input.addEventListener('input', e => {
      const email = input.value.toLowerCase()
      localStorage.setItem('email', email);
    });

    const subToggle = (bool) => {
      if(bool){
        button.innerHTML = 'unsubscribe';
        input.style.display = 'none';
        localStorage.setItem('sub', true);
      } else {
        button.innerHTML = this.buttonText;
        input.style.display = 'block';
        localStorage.clear();
        input.value = '';
      }   
    }

    const buttonLoadingState = isLoading => {
      button.disabled = isLoading;
      button.style.opacity = isLoading ? '0.5' : '';
    }

    const fetchData = async () => {
      const email = localStorage.getItem('email');
      const isValid = validate(email);
      const isSub = localStorage.getItem('sub');
      const url = 'http://localhost:3000/'

      if(isValid && !isSub) {
        try {
          buttonLoadingState(true);
          const response = await fetch(`${url}subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({email}),
          })
  
          const data = await response.json();
               
          if (response.status === 422) {
            alert(data.error)
            localStorage.clear();
            input.value = '';
          } else if (!response.ok) {
            console.error(error)
          } else {
            subToggle(true);
          }
        } catch (e) {
          console.log(response.status);
          console.error(e.message)
        } finally {
          buttonLoadingState(false);
        }
        
      } else {
        try {
          buttonLoadingState(true);
          const response = await fetch(`${url}unsubscribe`, {
            method: 'POST'
          });
          const data = await response.json();
          if(!response.ok) {
            console.error(data.error);
          }
          subToggle(false);
        } catch(e) {
          console.error(e);
        } finally {
          buttonLoadingState(false);
        }
      }
    }

    const isSub = localStorage.getItem('sub')
    if(isSub) subToggle(true);

    emailForm.addEventListener('submit', e => {
      e.preventDefault();
      fetchData();
    })
  
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

class JoinUsSectionCreator {
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

export default JoinUsSectionCreator;