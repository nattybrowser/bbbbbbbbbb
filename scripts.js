document.addEventListener('DOMContentLoaded', function() {
    const postsContainer = document.getElementById('posts');
    const filteredPostsContainer = document.getElementById('filteredPosts');

    fetch('post.json')
        .then(response => response.json())
        .then(data => {
            // Load all posts for the main page
            if (postsContainer) {
                data.forEach(post => {
                    const postElement = createPostElement(post);
                    postsContainer.appendChild(postElement);
                });
            }

            // Load filtered posts for the filtered page
            if (filteredPostsContainer) {
                const filteredTitles = ["charli D'amelio", "dixie D'amelio", "charli D'amelio and dixie"]; // Titles to be filtered
                const filteredPosts = data.filter(post => filteredTitles.includes(post.title));

                filteredPosts.forEach(post => {
                    const postElement = createPostElement(post);
                    filteredPostsContainer.appendChild(postElement);
                });
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
});
async function displayPagination(posts) {
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
            displayPosts(posts);
            displayPagination(posts);
        });
        pagination.appendChild(pageButton);
    }
}

