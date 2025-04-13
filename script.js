// script.js (updated)
document.addEventListener('DOMContentLoaded', function() {
    // ... (previous code remains the same)
    
    // Fetch materials from backend
    async function fetchMaterials(subject = 'all', level = 'all') {
        try {
            const response = await fetch(`/api/materials?subject=${subject}&level=${level}`);
            const materials = await response.json();
            renderMaterials(materials);
        } catch (error) {
            console.error('Error fetching materials:', error);
        }
    }
    
    function renderMaterials(materials) {
        const materialsGrid = document.querySelector('.materials-grid');
        materialsGrid.innerHTML = '';
        
        materials.forEach(material => {
            const materialCard = document.createElement('div');
            materialCard.className = 'material-card';
            materialCard.dataset.subject = material.subject;
            materialCard.dataset.level = material.level;
            
            materialCard.innerHTML = `
                <div class="material-thumbnail">
                    <img src="${material.thumbnailUrl || 'https://via.placeholder.com/300x200'}" alt="${material.title}">
                </div>
                <div class="material-info">
                    <h3>${material.title}</h3>
                    <div class="material-meta">
                        <span class="subject">${material.subject}</span>
                        <span class="level">${material.level}</span>
                    </div>
                    <p>${material.description}</p>
                    <div class="material-actions">
                        <a href="/materials/${material._id}" class="btn btn-primary">View Details</a>
                        <span class="price">${material.price > 0 ? `$${material.price}` : 'Free'}</span>
                    </div>
                </div>
            `;
            
            materialsGrid.appendChild(materialCard);
        });
    }
    
    // Handle login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                    window.location.href = '/dashboard.html';
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        });
    }
    
    // Initial load
    fetchMaterials();
});
// Fetch study materials from your backend
async function fetchMaterials() {
    const response = await fetch('http://localhost:5000/api/materials');
    const materials = await response.json();
    console.log(materials); // Display in console
  }
  fetchMaterials();