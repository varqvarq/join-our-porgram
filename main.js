document.addEventListener('DOMContentLoaded', () => {
  const footer = document.querySelector('.app-footer');
  const joinOurProgram = document.createElement('section');
  const appTitle = document.createElement('h2');
  const appSubtitle = document.createElement('h3');
  const emailForm = document.createElement('form');
  const input = document.createElement('input');
  const button = document.createElement('button');

  joinOurProgram.className = 'app-section app-section--join-our-program';
  appTitle.className = 'app-title';
  appTitle.textContent = 'Join Our Program';
  appSubtitle.className = 'app-subtitle';
  appSubtitle.innerHTML = 'Sed do eiusmod tempor incididunt<br>ut labore et dolore magna aliqua.'
  emailForm.className = 'app-section__form';
  input.className = 'app-section__form-input';
  input.setAttribute('placeholder', 'Email');
  input.setAttribute('required', true);
  input.setAttribute('type', 'email');
  button.className = 'app-section__button app-section__button--join-oc';
  button.textContent = 'subcribe';

  emailForm.append(input, button);

  emailForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(input.value);
    input.value = '';
  });
 
  joinOurProgram.append(appTitle, appSubtitle, emailForm);
   
  footer.before(joinOurProgram);
})