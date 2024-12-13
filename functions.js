async function fetchAgents() {
    const container = document.getElementById('agents-container');
    try {
        const response = await fetch('https://valorant-api.com/v1/agents');
        const data = await response.json();
        //(isPlayableCharacter = true)
        const playableAgents = data.data.filter(agent => agent.isPlayableCharacter);

        displayAgents(playableAgents);
    } catch (error) {
        console.error('Error fetching agents:', error);
        container.innerHTML = '<div class="error">Failed to load agents. Please try again later.</div>';
    }
}

function displayAgents(agents) {

    const container = document.getElementById('agents-container');
    if (!agents || agents.length === 0) {
        container.innerHTML = '<div class="error">No agents found.</div>';
        return;
    }

    

    container.innerHTML = agents.map(agent => {
        const { uuid, displayName, fullPortrait } = agent;
        return `
            <a href="agent.html?id=${uuid}" class="agent-button">
                <img src="${fullPortrait || ''}" alt="${displayName || 'Unknown'}">
                <h2>${displayName || 'Unknown'}</h2>
            </a>
        `;
    }).join('');
}

fetchAgents();