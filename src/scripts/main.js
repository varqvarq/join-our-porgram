import '../styles/style.css';
import './website-section.js';
import './performance.js'
import SectionCreator from './join-us-section.js';

const sectionCreator = new SectionCreator();
const standardSection = sectionCreator.create('standard');

const footer = document.querySelector('.app-footer');
footer.before(standardSection);


// if(window.Worker) {
//   const worker = new Worker(new URL('./web-worker.js', import.meta.url));

//   const buttons = document.querySelectorAll('button');
//   const input = document.querySelector('input');

//   buttons.forEach(button => {
//     button.addEventListener('click', e => {
//       worker.postMessage({eventType: 'click', target: button.className})
//     });
//   })

//   input.addEventListener('input', e => {
//     worker.postMessage({type: 'input', target: input.className})
//   })
// };