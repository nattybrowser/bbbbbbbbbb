document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const filteredPostsContainer = document.getElementById('filteredPosts');
    const postsPerPage = 5;
    let currentPage = 1;

    fetch('post.json')
        .then(response => response.json())
        .then(data => {
            // Load all posts for the main page
            if (postsContainer) {
                displayPosts(data, postsContainer, currentPage, postsPerPage);
                displayPagination(data, postsPerPage);
            }

            // Load filtered posts for the filtered page
            if (filteredPostsContainer) {
                const filteredTitles = ["charli D'amelio and dixie", "charli D'amelio"]; // Example titles to be filtered
                const filteredPosts = data.filter(post => filteredTitles.includes(post.title));
                displayPosts(filteredPosts, filteredPostsContainer, currentPage, postsPerPage);
                displayPagination(filteredPosts, postsPerPage);
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
        const endIndex = startIndex + postsPerPage;
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
                    displayPosts(data, postsContainer, currentPage, postsPerPage);
                    displayPagination(posts, postsPerPage);
                }
                if (filteredPostsContainer) {
                    displayPosts(filteredPosts, filteredPostsContainer, currentPage, postsPerPage);
                    displayPagination(filteredPosts, postsPerPage);
                }
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
