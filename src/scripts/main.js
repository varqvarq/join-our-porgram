import '../styles/style.css';
import JoinUsSectionCreator from './join-us-section';
import CommunitySectionCreator from './community-section';

//join-us-section
const joinSectionCreator = new JoinUsSectionCreator();
const standardSection = joinSectionCreator.create('standard');
const footer = document.querySelector('.app-footer');
footer.before(standardSection);

//community-section
const learnMoreSection = document.querySelector('.app-section--read-more');
const communitySectionCreator = new CommunitySectionCreator();
communitySectionCreator.create().then(communitySection =>{
  learnMoreSection.after(communitySection);
})
