// eslint-disable-next-line semi
import '../styles/style.css'
// eslint-disable-next-line semi
import SectionCreator from './join-us-section.js'
// eslint-disable-next-line semi
import validate from './email-validator.js'

const sectionCreator = new SectionCreator();
const standardSection = sectionCreator.create('standard');

const footer = document.querySelector('.app-footer');
footer.before(standardSection);

const form = document.querySelector('.app-section__form');
form.addEventListener('submit', e => {
  e.preventDefault();
  
  const input = document.querySelector('.app-section__form-input');
  const email = input.value;
  const emailIsValid = validate(email);

  if(emailIsValid) {
    alert('You subscribed!');
    input.value = '';
  } else {
    alert('Enter a correct email');
  }
});