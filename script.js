const postsPerPage = 16;
let currentPage = 1;

async function fetchPosts() {
    const response = await fetch('post.json');
    return response.json();
}

async function displayPosts() {
    const posts = await fetchPosts();
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';
    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const slicedPosts = posts.slice(start, end);
    
    slicedPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            ${post.video ? `<iframe src="${post.video}" frameborder="0"></iframe>` : ''}
            <p>${post.description}</p>
        `;
        
        postContainer.appendChild(postElement);

        if ((index + 1) % 6 === 0) {
            const adScript = document.createElement('script');
            adScript.type = 'text/javascript';
            adScript.src = "//constellationbedriddenexams.com/94e546547f0c1d04bcc33be261ff8357/invoke.js";
            postContainer.appendChild(adScript);
        }
    });
}

async function displayPagination() {
    const posts = await fetchPosts();
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(posts.length / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            displayPosts();
        });
        pagination.appendChild(pageLink);
    }
}

document.getElementById('searchBar').addEventListener('input', async (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const posts = await fetchPosts();
    const filteredPosts = posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) || 
        post.description.toLowerCase().includes(`#${searchTerm}`)
    );
    
    const postContainer = document.getElementById('postContainer');
    postContainer.innerHTML = '';
    
    filteredPosts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            ${post.image ? `<img src="${post.image}" alt="${post.title}">` : ''}
            ${post.video ? `<iframe src="${post.video}" frameborder="0"></iframe>` : ''}
            <p>${post.description}</p>
        `;
        
        postContainer.appendChild(postElement);
    });

    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
});

displayPosts();
displayPagination();


function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
