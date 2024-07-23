document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const filteredPostsContainer = document.getElementById('filteredPosts');
    const postsPerPage = 16;
    let currentPage = 1;
    let posts = [];  // This will store all posts for pagination
    let filteredPosts = [];  // This will store filtered posts

    fetch('post.json')
        .then(response => response.json())
        .then(data => {
            posts = data;  // Store all posts

            if (postsContainer) {
                displayPosts(posts, postsContainer, currentPage, postsPerPage);
                if (posts.length > postsPerPage) {
                    displayPagination(posts, postsPerPage);
                }
            }

            if (filteredPostsContainer) {
                const filteredTitles = ["charli D'amelio, charli D;'amelio and dixie"]; // Example titles to be filtered
                filteredPosts = posts.filter(post => filteredTitles.includes(post.title));
                displayPosts(filteredPosts, filteredPostsContainer, currentPage, postsPerPage);
                if (filteredPosts.length > postsPerPage) {
                    displayPagination(filteredPosts, postsPerPage);
                }
            }
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
                if (postsContainer) {
                    displayPosts(posts, postsContainer, currentPage, postsPerPage);
                }
                if (filteredPostsContainer) {
                    displayPosts(filteredPosts, filteredPostsContainer, currentPage, postsPerPage);
                }
                displayPagination(posts, postsPerPage);  // Update pagination buttons
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
