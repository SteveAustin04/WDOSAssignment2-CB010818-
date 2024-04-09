  //SECOND WEBPAGE SCRIPTS

  fetch('JSON DATA FILES/Sri Lankan Wildlife Introduction.json')
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
        data.locations.forEach(location => {
          const section = document.createElement('section');
          section.innerHTML = `
            <center><h2>${location.name}</h2></center>
            <div class="map_image">
              <center><img src="${location.image}" width="600" height="450">
              <iframe src="${location.mapUrl}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </center>
            </div>
            <p>${location.description}</p>
          `;
          mainContent.appendChild(section);
        });

        // Populate footer content
        const footerContent = document.getElementById('footerContent');
        const footerText = document.createElement('p');
        footerText.innerHTML = data.footer.text;
        footerContent.appendChild(footerText);

        // Store JSON data in localStorage
    localStorage.setItem('SLWIjsonData', JSON.stringify(data));
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
