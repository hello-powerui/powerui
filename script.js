// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create and load the managers.js script
    var script = document.createElement("script");
    
    // Check if Webflow staging site is in use
    var isDev = window.location.hostname.includes("webflow.io");
    
    script.src = isDev
        ? "https://dev.powerui.com/managers.js?v=1.0.18"
        : "https://app.powerui.com/managers.js?v=1.0.18";
    
    // Add event listeners to track script loading
    script.onload = async function() {
        try {
            // Initialize StateManager first (it's required by other managers)
            const memberData = await window.StateManager.initialize();
            
            // Initialize CustomPalettesManager
            await window.CustomPalettesManager.initialize();
            
            // Initialize ThemeManager
            await window.ThemeManager.initialize();
            
            // Initialize EventManager
            window.EventManager.initialize();
            
            // Initialize TooltipManager if it exists
            if (window.TooltipManager) {
                window.TooltipManager.initialize();
            }
        } catch (error) {
            console.error('Error during initialization:', error);
        }
    };
    
    script.onerror = function() {
        console.error('Failed to load managers.js');
    };
    
    // Append the script to the head
    document.head.appendChild(script);
}); 