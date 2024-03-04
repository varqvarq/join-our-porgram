import '../styles/style.css';
import JoinUsSectionCreator from './join-us-section';
import CommunitySectionCreator from './community-section';

const joinSectionCreator = new JoinUsSectionCreator();
const standardSection = joinSectionCreator.create('standard');
const communitySectionCreator = new CommunitySectionCreator();
const communitySection = communitySectionCreator.create();

const footer = document.querySelector('.app-footer');
footer.before(standardSection);

const secondSection = document.querySelector('.app-section--read-more');
secondSection.after(communitySection);
