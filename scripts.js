document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const filteredPostsContainer = document.getElementById('filteredPosts');
    const postsPerPage = 16;
    let currentPage = 1;
    let allPosts = [];
    let filteredPosts = [];

    fetch('post.json')
        .then(response => response.json())
        .then(data => {
            allPosts = data;

            // Display posts for the main page
            if (postsContainer) {
                displayPosts(allPosts, postsContainer, currentPage, postsPerPage);
                if (allPosts.length > postsPerPage) {
                    displayPagination(allPosts, postsPerPage);
                }
            }

            // Display filtered posts for the filtered page
            if (filteredPostsContainer) {
                const filteredTitles = ["jameliz"]; // Example title to be filtered
                filteredPosts = allPosts.filter(post => filteredTitles.includes(post.title));
                displayPosts(filteredPosts, filteredPostsContainer, currentPage, postsPerPage);
                if (filteredPosts.length > postsPerPage) {
                    displayPagination(filteredPosts, postsPerPage);
                }
            }

            // Hide the preloader once posts are loaded
            const preloader = document.getElementById("preloader");
            preloader.classList.add("hide-preloader");
        });

    function createPostElement(post) {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;

        const postImage = document.createElement('img');
        postImage.src = post.image;
        postImage.alt = post.title;

        const postDescription = document.createElement('p');
        postDescription.textContent = post.description;

        postDiv.appendChild(postTitle);
        postDiv.appendChild(postImage);
        postDiv.appendChild(postDescription);

        return postDiv;
    }

    function displayPosts(posts, container, page, postsPerPage) {
        container.innerHTML = ''; // Clear existing posts
        const startIndex = (page - 1) * postsPerPage;
        const endIndex = Math.min(startIndex + postsPerPage, posts.length);
        const paginatedPosts = posts.slice(startIndex, endIndex);

        paginatedPosts.forEach(post => {
            const postElement = createPostElement(post);
            container.appendChild(postElement);
        });
    }

    function displayPagination(posts, postsPerPage) {
        const pagination = document.getElementById('pagination');
        pagination.innerHTML = '';

        const totalPages = Math.ceil(posts.length / postsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            if (i === currentPage) {
                pageButton.classList.add('active');
            }
            pageButton.addEventListener('click', () => {
                currentPage = i;
                displayPosts(posts, postsContainer, currentPage, postsPerPage);
                displayPagination(posts, postsPerPage);
            });
            pagination.appendChild(pageButton);
        }
    }

    window.addEventListener("load", function () {
        const preloader = document.getElementById("preloader");
        preloader.classList.add("hide-preloader");

        // Initialize Isotope
        const isotopeContainer = document.querySelector('.entry-container');
        if (isotopeContainer) {
            $(isotopeContainer).isotope({
                itemSelector: '.entry-item',
                layoutMode: 'masonry'
            });
        }
    });
});
