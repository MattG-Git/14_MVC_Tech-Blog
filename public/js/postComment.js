const newCommentHandler = async (event) => {
    event.preventDefault();

    const contents = document.querySelector('#inputComment').value.trim();
    const post_id = document.querySelector('comment-form').dataset.id
    if (contents) {
      const response = await fetch(`/api/comment`, {
        method: 'POST',
        body: JSON.stringify({ post_id, contents, }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.reload(); 
      } else {
        alert('Cannot Create Comment');
      }
    }
  };
  
  document
  .querySelector('.comment-form')
  .addEventListener('submit', newCommentHandler);
