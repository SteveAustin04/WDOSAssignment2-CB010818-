fetch('JSON DATA FILES/Wilpattu National Park.json')
    .then(response => response.json())
    .then(data => {
        // Populate navigation links
        const navigation = document.querySelector('header nav ul');
        if (data && data.header && data.header.navigation && data.header.navigation.links) {
            data.header.navigation.links.forEach(link => {
                const listItem = document.createElement('li');
                const anchor = document.createElement('a');
                anchor.textContent = link.text;
                anchor.href = link.url;
                listItem.appendChild(anchor);
                navigation.appendChild(listItem);
            });
        } else {
            console.error('Navigation data not found in JSON.');
        }

        // Populate main content sections
        const main = document.querySelector('main');
        if (data && data.main && data.main.sections) {
            data.main.sections.forEach(section => {
                const sectionDiv = document.createElement('section');
                if (section.content.image) {
                    const image = document.createElement('img');
                    image.src = section.content.image;
                    sectionDiv.appendChild(image);
                }
                if (section.content.heading) {
                    const heading = document.createElement('h2');
                    heading.textContent = section.content.heading;
                    sectionDiv.appendChild(heading);
                }
                if (section.content.text) {
                    const text = document.createElement('p');
                    text.textContent = section.content.text;
                    sectionDiv.appendChild(text);
                }
                main.appendChild(sectionDiv);
            });
        } else {
            console.error('Main sections data not found in JSON.');
        }

        // Populate footer content
        const footerContent = document.querySelector('footer .footer_content');
        if (data && data.footer && data.footer.text) {
            footerContent.innerHTML = data.footer.text;
        } else {
            console.error('Footer text not found in JSON.');
        }

        // Store JSON data in localStorage (optional)
        localStorage.setItem('WNPData', JSON.stringify(data));
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
