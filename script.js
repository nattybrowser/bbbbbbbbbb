const postsPerPage = 16;
let currentPage = 1;

async function fetchPosts() {
    const response = await fetch('post.json');
    return response.json();
}

async function displayPosts(posts) {
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
            ${post.image ? `<img src="${post.image}" alt="${post.title}" loading="lazy">` : ''}
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

async function displayPagination(posts) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(posts.length / postsPerPage);
    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.addEventListener('click', () => {
            currentPage = i;
            displayPosts(posts);
        });
        pagination.appendChild(pageLink);
    }
}

async function handleSearch() {
    const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();
    const posts = await fetchPosts();
    
    const filteredPosts = posts.filter(post => {
        // Normalize both title and description for comparison
        const normalizedTitle = post.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
        const normalizedDescription = post.description.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Remove accents
        
        return normalizedTitle.includes(searchTerm) || normalizedDescription.includes(searchTerm);
    });

    displayPosts(filteredPosts);
    displayPagination(filteredPosts);
}

document.getElementById('searchBar').addEventListener('input', handleSearch);

// Initial display of posts and pagination
async function initialize() {
    const posts = await fetchPosts();
    displayPosts(posts);
    displayPagination(posts);
}

initialize();

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("hide-preloader");

    // Initialize Isotope
    $('.entry-container').isotope({
      itemSelector: '.entry-item',
      layoutMode: 'masonry'
    });
    
  });
