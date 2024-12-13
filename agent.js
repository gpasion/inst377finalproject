// Function to extract query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);  // Get the value of the given parameter (e.g., 'id')
}

async function fetchAgentDetails() {
    // Get the agent ID from the URL
    const agentId = getQueryParam('id');
    const detailsContainer = document.getElementById('agent-details');
    
    if (!agentId) {
        detailsContainer.innerHTML = '<div class="error">Agent ID is missing in the URL.</div>';
        return;
    }

    try {
        // Fetch the agent data using the unique ID
        const response = await fetch(`https://valorant-api.com/v1/agents/${agentId}`);
        const data = await response.json();
        
        // If no agent data is returned
        if (!data.data) {
            detailsContainer.innerHTML = '<div class="error">Agent not found.</div>';
            return;
        }

        // Extract relevant details about the agent
        const { displayName, description, fullPortrait } = data.data;
        detailsContainer.innerHTML = `
            <img src="${fullPortrait}" alt="${displayName}">
            <h2>${displayName}</h2>
            <p>${description || 'No description available.'}</p>
        `;
    } catch (error) {
        console.error('Error fetching agent details:', error);
        detailsContainer.innerHTML = '<div class="error">Failed to load agent details. Please try again later.</div>';
    }
}

// Call the function to fetch agent details
fetchAgentDetails();