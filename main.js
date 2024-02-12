import { JoinUsSection } from './join-us-section.js';

class SectionCreator {
  create(type) {
    switch (type){
      case 'standard':
        return new JoinUsSection().createSection();
      case 'advanced':
        return new JoinUsSection('Join Our Advanced Program', 'Subscribe to Advanced Program').createSection();
      default: 
        throw new Error('Invalid section type')
    }
  }

}

const sectionCreator = new SectionCreator();
const standardSection = sectionCreator.create('standard')
const advancedSection = sectionCreator.create('advanced');

const footer = document.querySelector('.app-footer');
footer.before(advancedSection);

