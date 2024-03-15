import '../styles/style.css';
import SectionCreator from './join-us-section.js';

const sectionCreator = new SectionCreator();
const standardSection = sectionCreator.create('standard');

const footer = document.querySelector('.app-footer');

document.addEventListener('DOMContentLoaded', e => {
  footer.before(standardSection);
})