const urlParams = new URLSearchParams(window.location.search);
const agentId = urlParams.get('id');

async function fetchAgentDetails(agentId) {
    const container = document.getElementById('agent-container');
    try {
        const response = await fetch(`https://valorant-api.com/v1/agents/${agentId}`);
        const data = await response.json();
        const agent = data.data;

        if (!agent) {
            container.innerHTML = '<div class="error">Agent not found.</div>';
            return;
        }

        const { displayName, fullPortrait, abilities } = agent;

        // Show agent details
        container.innerHTML = `
                    <img src="${fullPortrait || ''}" alt="${displayName}">
                    <h2>${displayName}</h2>
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            ${createAbilitySlides(abilities)}
                        </div>
                    </div>
                `;

        // Initialize Swiper
        new Swiper('.swiper-container', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
            freeMode: true,
        });

    } catch (error) {
        console.error('Error fetching agent details:', error);
        container.innerHTML = '<div class="error">Failed to load agent details. Please try again later.</div>';
    }
}

function createAbilitySlides(abilities) {
    return abilities.map(ability => {
        return `
                    <div class="swiper-slide">
                        <img src="${ability.displayIcon || ''}" alt="${ability.displayName || 'Unknown Ability'}">
                        <h3>${ability.displayName || 'Unknown Ability'}</h3>
                        <p>${ability.description || 'No description available.'}</p>
                    </div>
                `;
    }).join('');
}

fetchAgentDetails(agentId);