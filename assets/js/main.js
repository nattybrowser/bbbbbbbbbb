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

        // Insert ad after every 6th post
        if ((index + 1) % 6 === 0) {
            const adContainer = document.createElement('div');
            adContainer.classList.add('ad-container');
            postContainer.appendChild(adContainer);

            const adScriptConfig = document.createElement('script');
            adScriptConfig.type = 'text/javascript';
            adScriptConfig.text = `
                atOptions = {
                    'key' : '94e546547f0c1d04bcc33be261ff8357',
                    'format' : 'iframe',
                    'height' : 300,
                    'width' : 160,
                    'params' : {}
                };
            `;
            adContainer.appendChild(adScriptConfig);

            const adScript = document.createElement('script');
            adScript.type = 'text/javascript';
            adScript.src = "//constellationbedriddenexams.com/94e546547f0c1d04bcc33be261ff8357/invoke.js";
            adContainer.appendChild(adScript);

            console.log("Ad script added after post index:", index);
        }
    });
}
