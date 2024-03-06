class CommunitySection {
  async createSection() {
    //creating elements
    const communitySection = document.createElement('section');
    const appTitle = document.createElement('h2');
    const appSubtitle = document.createElement('h3');
    const grid = document.createElement('div');

    //adding class names to elements
    communitySection.className = 'app-section app-section--community';
    appTitle.className = 'app-title app-title--dark';
    appSubtitle.className = 'app-subtitle app-subtitle--dark';
    grid.className = 'app-section--community__grid';
    
    //adding inner html to elements
    appTitle.innerHTML = 'Big Community of<br> People Like You';
    appSubtitle.innerHTML = 'We’re proud of our products, and we’re really excited when we get feedback from our users.';

    //adding elements to the section
    communitySection.append(appTitle, appSubtitle, grid);

    //making fetch request to /community endpoint
    try {
      const response = await fetch('api/community');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      //if response is ok, creating cards and adding them into the grid
      const data = await response.json();
      data.forEach(people => {
        const card = document.createElement('div');
        card.className = 'app-section--community__card';
        card.innerHTML = `
          <img class="card-avatar" src="${people.avatar}"/>
          <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.</p>
          <p class="card-fullname">${people.firstName} ${people.lastName}</p>
          <p class="card-title">${people.position}</p>
        `;
        grid.appendChild(card);
      });
    } catch (error) {
      console.error(error);
    }

    return communitySection;
  }
}

class CommunitySectionCreator {
  constructor() {
    this.section = new CommunitySection();
  }

  async create() {
    return await this.section.createSection();
  }
}

export default CommunitySectionCreator;
