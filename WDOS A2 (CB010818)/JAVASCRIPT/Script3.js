// Fetch JSON data from 'Department of Wildlife Conservation.json'
fetch('JSON DATA FILES/Department of Wildlife Conservation.json')
  .then(response => response.json())
  .then(data => {
    // Populate navigation links
    const navigation = document.getElementById('navigation');
    data.header.navigation.links.forEach(link => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.textContent = link.text;
      anchor.href = link.url;
      listItem.appendChild(anchor);
      navigation.appendChild(listItem);
    });

   // Populate main content sections
const mainContent = document.getElementById('mainContent');
data.main.sections.forEach(section => { // Access 'sections' from 'main' object
  const sectionDiv = document.createElement('div');
  sectionDiv.classList.add('section');
  if (section.type === 'image') {
    const image = document.createElement('img');
    image.src = section.src;
    image.alt = section.alt;
    sectionDiv.appendChild(image);
  }
  const title = document.createElement('h2');
  title.textContent = section.title;
  sectionDiv.appendChild(title);
  const paragraph = document.createElement('p');
  paragraph.textContent = section.description;
  sectionDiv.appendChild(paragraph);
  mainContent.appendChild(sectionDiv);
});


//Populate the Sections called Protected areas
const protectedAreas = document.getElementById("protectedAreas")
    data.main.sections[1].areas.forEach(area => {
    const areaSection = document.createElement('Section');
    areaSection.innerHTML = `
    <center><h2>${area.name}</h2></center>
    <div class="image">
        <center><img src="${area.image}" width="600" height="450">
        <iframe src="${area.mapUrl}" width="600" height="450" style="border:0;"></iframe>
    </div>`
    protectedAreas.appendChild(areaSection);
})


    // Populate footer content
const footerContent = document.getElementById('footerContent');
const footerText = document.createElement('p');
footerText.innerHTML = data.footer.text; // Error likely occurs here
footerContent.appendChild(footerText);


    // Store JSON data in localStorage
    localStorage.setItem('DWLCjsonData', JSON.stringify(data));
  })
  .catch(error => console.error('Error loading JSON:', error));

  //Newsletter subscriptions
  
  document.getElementById('newsletterForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Check if localStorage is supported by the browser
    if (typeof(Storage) !== "undefined") {
        // Retrieve existing subscriptions from localStorage
        let subscriptions = JSON.parse(localStorage.getItem('newsletterSubscriptions')) || [];
        
        // Add the new subscription
        subscriptions.push(email);
        
        // Save updated subscriptions to localStorage
        localStorage.setItem('newsletterSubscriptions', JSON.stringify(subscriptions));
        
        alert('Thank you for subscribing to our newsletter!');
        
        // Clear the form
        document.getElementById('email').value = '';
    } else {
        alert('Sorry, localStorage is not supported by your browser.');
    }
});
