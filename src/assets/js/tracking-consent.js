// Tracking Consent Management
(function() {
    'use strict';

    // Configuration
    const CLARITY_PROJECT_ID = 'r1auiquojm';
    const STORAGE_KEY = 'tracking_consent';

    // DOM elements
    let consentBanner = null;

    // Check if consent has been given
    function checkConsent() {
        return localStorage.getItem(STORAGE_KEY);
    }

    // Load Microsoft Clarity tracking script
    function loadClarityScript() {
        if (window.clarity) {
            return; // Already loaded
        }

        (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", CLARITY_PROJECT_ID);
    }

    // Save consent choice to localStorage
    function saveConsent(choice) {
        localStorage.setItem(STORAGE_KEY, choice);
    }

    // Handle accept button click
    function handleAccept() {
        saveConsent('accepted');
        loadClarityScript();
        hideBanner();
    }

    // Handle reject button click
    function handleReject() {
        saveConsent('rejected');
        hideBanner();
    }

    // Show the consent banner
    function showBanner() {
        if (!consentBanner) {
            createBanner();
        }
        consentBanner.style.display = 'block';
        // Trigger animation
        setTimeout(() => {
            consentBanner.classList.add('visible');
        }, 10);
    }

    // Hide the consent banner
    function hideBanner() {
        if (consentBanner) {
            consentBanner.classList.remove('visible');
            setTimeout(() => {
                consentBanner.style.display = 'none';
            }, 300); // Match CSS transition duration
        }
    }

    // Create the consent banner HTML
    function createBanner() {
        const bannerHTML = `
            <div id="tracking-consent-banner" class="tracking-consent-banner">
                <div class="tracking-consent-banner__container">
                    <div class="tracking-consent-banner__content">
                        <h3 class="tracking-consent-banner__title">Uso de cookies de seguimiento</h3>
                        <p class="tracking-consent-banner__description">
                            Utilizamos Microsoft Clarity para analizar el uso de nuestro sitio y mejorar su experiencia.
                            Al aceptar, permite que recopilemos datos estadísticos de forma anónima.
                        </p>
                    </div>
                    <div class="tracking-consent-banner__buttons">
                        <button type="button" class="btn btn--primary tracking-consent-banner__accept" id="tracking-consent-accept">
                            Aceptar
                        </button>
                        <button type="button" class="btn btn--neutral tracking-consent-banner__reject" id="tracking-consent-reject">
                            Rechazar
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', bannerHTML);

        consentBanner = document.getElementById('tracking-consent-banner');

        // Add event listeners
        document.getElementById('tracking-consent-accept').addEventListener('click', handleAccept);
        document.getElementById('tracking-consent-reject').addEventListener('click', handleReject);
    }

    // Global function to show banner (accessible from footer link)
    window.showTrackingConsentBanner = function() {
        showBanner();
    };

    // Initialize on page load
    function init() {
        const consent = checkConsent();

        if (consent === 'accepted') {
            loadClarityScript();
        } else if (consent === null) {
            // No consent given yet, show banner
            showBanner();
        }
        // If consent is 'rejected', do nothing (no banner, no tracking)
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();