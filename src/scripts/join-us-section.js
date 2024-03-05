import validate from './email-validator';

class JoinUsSection {
  constructor(title, buttonText) {
    this.title = title || 'Join Our Program';
    this.buttonText = buttonText || 'subscribe';
    this.section = null;
  }

  createSection() {
    //creating elements
    const joinOurProgram = document.createElement('section');
    const appTitle = document.createElement('h2');
    const appSubtitle = document.createElement('h3');
    const emailForm = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');

    //adding class names to elements
    joinOurProgram.className = 'app-section app-section--join-our-program';
    appTitle.className = 'app-title';
    appSubtitle.className = 'app-subtitle app-subtitle--light';
    emailForm.className = 'app-section__form not-sub';
    input.className = 'app-section__form-input';
    button.className = 'app-section__button app-section__button--join-op';
    
    //adding attributes to input
    input.type = 'email';
    input.placeholder = 'Email';
    input.value = localStorage.getItem('email');
    input.required = true;

    //adding innner html to elements
    appTitle.innerHTML = this.title;
    appSubtitle.innerHTML = 'Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.';
    button.innerHTML = this.buttonText;

    //event listener that save input value to localStorage
    input.addEventListener('input', () => {
      const email = input.value.toLowerCase();
      localStorage.setItem('email', email);
    });

    //function that change form state 
    const toggleSubscription = (subscribed) => {
      if (subscribed) {
        button.innerHTML = 'unsubscribe';
        input.style.display = 'none';
        localStorage.setItem('sub', true);
      } else {
        button.innerHTML = this.buttonText;
        input.style.display = 'block';
        localStorage.clear();
        input.value = '';
      }
    };

    //a function that blocks a button during fetch
    const changeButtonState = (isLoading) => {
      button.disabled = isLoading;
      button.style.opacity = isLoading ? '0.5' : '';
    };

    //fetch function
    const fetchData = async () => {
      const email = localStorage.getItem('email');
      const isValid = validate(email);
      const isSub = localStorage.getItem('sub');
      const url = 'http://localhost:3000';

      //make a fetch to /subscribe if email is valid and if localStorage doesn't have sub value,
      //to add an email to the server 
      if (isValid && !isSub) {
        try {
          //when fetch starts - button turns off
          changeButtonState(true);
          const response = await fetch(`${url}/subscribe`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });

          const result = await response.json();

          if (response.ok) {
            toggleSubscription(true);
            console.log('You subscribed!');
            console.log(result);
            //if email is 'forbidden@gmail.com'
          } else if (response.status === 422) {
            alert(result.error);
            input.value = '';
            localStorage.clear();
          } else {
            console.log('Ошибка: ', response.status);
          }
        } catch (e) {
          console.error(e);
        } finally {
          //when fetch ends - button turns on
          changeButtonState(false);
        }
        //if email is not valid then alert shows up
      } else if (!isValid) {
        alert('Enter a correct email');
        //if user already subscribed then make a fetch to /unsubscribe to remove email from server
      } else {
        try {
          changeButtonState(true);
          const response = await fetch(`${url}/unsubscribe`, {
            method: 'POST',
          });
          if (response.ok) {
            toggleSubscription(false);
            console.log('You unsubscribed');
          } else {
            console.log('Ошибка: ', response.status);
          }
        } catch (e) {
          console.error(e);
        } finally {
          changeButtonState(false);
        }
      }
    };

    //when form submit 
    emailForm.addEventListener('submit', (e) => {
      e.preventDefault();
      fetchData();
    });

    //on page load if user subscribed then form save its state
    const isSub = localStorage.getItem('sub');
    if (isSub) toggleSubscription(true);

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
