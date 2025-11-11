// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
        return;
    }

    // Display user email
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
    document.getElementById('userEmail').textContent = userEmail;

    // Navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const pageTitle = document.getElementById('pageTitle');
    const contentArea = document.getElementById('contentArea');

    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove active class from all items
            navItems.forEach(function(navItem) {
                navItem.classList.remove('active');
            });

            // Add active class to clicked item
            this.classList.add('active');

            // Get page name
            const page = this.querySelector('a').getAttribute('data-page');

            // Update page title
            pageTitle.textContent = page.charAt(0).toUpperCase() + page.slice(1);

            // Update content based on page
            updateContent(page);
        });
    });

    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', function() {
        // Clear login state
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');

        // Redirect to login page
        window.location.href = 'login.html';
    });

    // Function to update content area based on selected page
    function updateContent(page) {
        let content = '';

        switch(page) {
            case 'home':
                content = `
                    <div class="dashboard-cards">
                        <div class="card">
                            <h3>Welcome!</h3>
                            <p>You have successfully logged in to your dashboard.</p>
                        </div>

                        <div class="card">
                            <h3>Quick Stats</h3>
                            <div class="stats">
                                <div class="stat-item">
                                    <span class="stat-label">Projects</span>
                                    <span class="stat-value">12</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Tasks</span>
                                    <span class="stat-value">48</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Completed</span>
                                    <span class="stat-value">32</span>
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <h3>Recent Activity</h3>
                            <ul class="activity-list">
                                <li>Project "Website Redesign" updated</li>
                                <li>New task assigned: UI Review</li>
                                <li>Completed: Database Migration</li>
                            </ul>
                        </div>
                    </div>
                `;
                break;

            case 'analytics':
                content = `
                    <div class="dashboard-cards">
                        <div class="card">
                            <h3>Analytics Overview</h3>
                            <p>View your performance metrics and insights here.</p>
                        </div>

                        <div class="card">
                            <h3>Monthly Stats</h3>
                            <div class="stats">
                                <div class="stat-item">
                                    <span class="stat-label">Views</span>
                                    <span class="stat-value">2.5K</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Users</span>
                                    <span class="stat-value">892</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Growth</span>
                                    <span class="stat-value">+15%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'projects':
                content = `
                    <div class="dashboard-cards">
                        <div class="card">
                            <h3>Active Projects</h3>
                            <ul class="activity-list">
                                <li>Website Redesign - 75% Complete</li>
                                <li>Mobile App Development - 40% Complete</li>
                                <li>API Integration - 90% Complete</li>
                                <li>Database Optimization - 25% Complete</li>
                            </ul>
                        </div>

                        <div class="card">
                            <h3>Project Stats</h3>
                            <div class="stats">
                                <div class="stat-item">
                                    <span class="stat-label">Active</span>
                                    <span class="stat-value">12</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Completed</span>
                                    <span class="stat-value">45</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">On Hold</span>
                                    <span class="stat-value">3</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'tasks':
                content = `
                    <div class="dashboard-cards">
                        <div class="card">
                            <h3>Today's Tasks</h3>
                            <ul class="activity-list">
                                <li>Review pull requests</li>
                                <li>Update documentation</li>
                                <li>Team meeting at 2 PM</li>
                                <li>Deploy new features</li>
                                <li>Code review session</li>
                            </ul>
                        </div>

                        <div class="card">
                            <h3>Task Summary</h3>
                            <div class="stats">
                                <div class="stat-item">
                                    <span class="stat-label">Total</span>
                                    <span class="stat-value">48</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">In Progress</span>
                                    <span class="stat-value">16</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-label">Done</span>
                                    <span class="stat-value">32</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                break;

            case 'settings':
                content = `
                    <div class="dashboard-cards">
                        <div class="card">
                            <h3>Account Settings</h3>
                            <p>Manage your account preferences and security settings.</p>
                            <ul class="activity-list">
                                <li>Profile Information</li>
                                <li>Password & Security</li>
                                <li>Email Notifications</li>
                                <li>Privacy Settings</li>
                            </ul>
                        </div>

                        <div class="card">
                            <h3>Preferences</h3>
                            <ul class="activity-list">
                                <li>Theme: Light Mode</li>
                                <li>Language: English</li>
                                <li>Time Zone: UTC-5</li>
                                <li>Date Format: MM/DD/YYYY</li>
                            </ul>
                        </div>
                    </div>
                `;
                break;

            default:
                content = '<div class="card"><h3>Page not found</h3></div>';
        }

        contentArea.innerHTML = content;
    }
});
