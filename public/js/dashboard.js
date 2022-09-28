const newPostHandler= async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#title').value.trim();
    const article = document.querySelector('#article').value.trim();
  
    if (title && article) {
      const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({ title, contents }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Cannot Create Blog Post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Cannot Delete Blog Post');
      }
    }
  };

  const updateButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute ('data-id');

        const response = await fetch(`/api/post/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, contents }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        }else {
            alert ('Cannot Update Blog Post')
        }
    }
  };
  
  document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);
  
  document
    .getElementById('#delButton')
    .addEventListener('click', delButtonHandler);

  document
    .getElementById('#updateButton')
    .addEventListener('click', updateButtonHandler);
  