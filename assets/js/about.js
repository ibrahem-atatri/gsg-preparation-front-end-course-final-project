// About Section JavaScript
document.getElementById('learn-more').addEventListener('click', function() {
    const moreInfo = document.getElementById('more-info');
    
    // Toggle display of additional information
    if (moreInfo.style.display === 'none') {
      moreInfo.style.display = 'block';
      this.textContent = 'Show Less';
    } else {
      moreInfo.style.display = 'none';
      this.textContent = 'Learn More';
    }
  });