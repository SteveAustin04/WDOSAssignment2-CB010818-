// Fetch JSON data from file or server
fetch('JSON DATA FILES/Sri Lankan Leopard.json')
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
        data.main.sections.forEach(section => {
            const sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');
            const title = document.createElement('h2');
            title.textContent = section.title;
            sectionDiv.appendChild(title);
            const paragraph = document.createElement('p');
            paragraph.textContent = section.description;
            sectionDiv.appendChild(paragraph);
            mainContent.appendChild(sectionDiv);
        });

        //Populate the Threats section
        const Threats = document.getElementById("Threats");
        data.main.threats.forEach(threat => {
            const threatDiv = document.createElement("div");
            threatDiv.innerHTML = `
            <center><h2>${threat.title}</h2>
            <img src="${threat.image}" width="600" height="450">
            <p>${threat.description}</p><br>
            <p>For more details: <a href="${threat.link}">Click here...</a></p>
            </center>`
            Threats.appendChild(threatDiv);
        })

           // Populate footer content
        const footerContent = document.getElementById('footerContent');
        const footerText = document.createElement('p');
        footerText.innerText = data.footer.text; // Error likely occurs here
        footerContent.appendChild(footerText);

        // Store JSON data in localStorage (optional)
        localStorage.setItem('SLLData', JSON.stringify(data));
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

