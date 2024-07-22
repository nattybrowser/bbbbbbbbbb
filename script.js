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

    // Create a placeholder image for lazy loading
    const imagePlaceholder = document.createElement('img');
    imagePlaceholder.classList.add('image-placeholder'); // Add a class for styling (optional)
    imagePlaceholder.alt = post.title;

    postElement.innerHTML = `
      <h2>${post.title}</h2>
      ${post.image ? '' : ''}  <p>${post.description}</p>
    `;

    // Append the placeholder to the post element
    postElement.appendChild(imagePlaceholder);

    if (post.image) {
      // Create the actual image element with lazy loading attributes
      const image = document.createElement('img');
      image.classList.add('post-image'); // Add a class for styling (optional)
      image.dataset.src = post.image; // Use dataset attribute for lazy loading
      image.alt = post.title;
      image.loading = 'lazy'; // Set the loading attribute for browser-level lazy loading

      // Replace the placeholder with the actual image when it enters the viewport
      const handleIntersection = (entries) => {
        if (entries[0].isIntersecting) {
          imagePlaceholder.parentNode.replaceChild(image, imagePlaceholder);
          observer.unobserve(imagePlaceholder); // Unobserve after loading
        }
      };

      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(imagePlaceholder); // Observe the placeholder for intersection

      postElement.appendChild(image); // Append the actual image after placeholder
    }

    postContainer.appendChild(postElement);

    if ((index + 1) % 6 === 0) {
      // ... your ad script logic here
    }
  });
}

async function displayPagination() {
  // ... existing pagination logic (unchanged)
}

document.getElementById('searchBar').addEventListener('input', async (event) => {
  const searchTerm = event.target.value.toLowerCase().trim(); // Trim whitespace

  // Perform fuzzy search or basic search with normalization
  const filteredPosts = posts.filter(post => {
    const normalizedPostTitle = normalizeSearchTerm(post.title);
    const normalizedSearchTerm = normalizeSearchTerm(searchTerm);
    return normalizedPostTitle.includes(normalizedSearchTerm);
  });

  const postContainer = document.getElementById('postContainer');
  postContainer.innerHTML = '';

  filteredPosts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    // ... rest of the post element creation logic (unchanged)
    postContainer.appendChild(postElement);
  });

  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';
});

displayPosts();
displayPagination();

// Function to normalize search terms (optional)
function normalizeSearchTerm(term) {
  // Remove special characters, convert to lowercase, handle variations (e.g., stemming)
  return term.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase();
}
