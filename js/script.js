import { createAppKit } from 'https://esm.sh/@reown/appkit'
import { EthersAdapter } from 'https://esm.sh/@reown/appkit-adapter-ethers'
import { mainnet, arbitrum } from 'https://esm.sh/@reown/appkit/networks'

// 1. Get projectId
const projectId = '0215bcf8c9091ca434a370c845ebd9b4'

// 2. Set the networks
const networks = [mainnet, arbitrum]

// 3. Create a metadata object
const metadata = {
    name: 'AppKit Vanilla JS',
    description: 'AppKit Vanilla JS Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 4. Create the AppKit instance
const modal = createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    features: {
        analytics: true
    }
});

const launchButtons = document.querySelectorAll('.service-launch-btn');

launchButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.open(); 
    });
});

window.launchAppKit = function() {
    modal.open();
};
