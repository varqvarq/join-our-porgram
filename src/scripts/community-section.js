class CommunitySection {
  createSection() {
    const communitySection = document.createElement('section');
    const appTitle = document.createElement('h2');
    const appSubtitle = document.createElement('h3');
    const grid = document.createElement('div');

    communitySection.className = 'app-section app-section--community';
    appTitle.className = 'app-title app-title--dark';
    appSubtitle.className = 'app-subtitle app-subtitle--dark';
    grid.className = 'app-section--community__grid';

    appTitle.innerHTML = 'Big Community of<br> People Like You';
    appSubtitle.innerHTML = 'We’re proud of our products, and we’re really excited when we get feedback from our users.';

    const fetchPeople = async () => {
      const response = await fetch('http://localhost:3000/community');
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      data.map((people) => {
        console.log(people.firstName);
        grid.innerHTML += `
          <div class="app-section--community__card">
            <img class="card-avatar" src="${people.avatar}"/>
            <p class="card-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolor.</p>
            <p class="card-fullname">${people.firstName} ${people.lastName}</p>
            <p class="card-title">${people.position}</p>
          </div>
        `;
      });
    };
    fetchPeople();

    communitySection.append(appTitle, appSubtitle, grid);
    return communitySection;
  }
}

class CommunitySectionCreator {
  constructor() {
    this.section = new CommunitySection();
  }

  create() {
    return this.section.createSection();
  }
}

export default CommunitySectionCreator;
