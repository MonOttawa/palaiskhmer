/*! Script consentement cookies UPDATED 2024-10-17 selon règles de redemander consentement après 24 heures si accepte cookies et sinon redemander à chaque loading si refuse cookies -->
* Instructions : 
*			Redemander le consentement en cas de refus : 
*				Si l'utilisateur choisit "Tout refuser", les informations de consentement sont retirées de localStorage. Ainsi, à chaque nouvelle visite ou rechargement du site, le consentement sera redemandé.
*			Vérification du consentement : 
*				La fonction checkConsent() vérifie si le consentement est présent dans localStorage et s'il n'a pas expiré. Si le consentement est absent ou expiré, la bannière de consentement est affichée.
*			Mise à jour du consentement : 
*				La fonction setConsent() gère la mise à jour des préférences de consentement et assure que les informations sont stockées ou retirées de localStorage en fonction du choix de l'utilisateur. 
*
*Ce script assure que le consentement est revérifié toutes les 24 heures si l'utilisateur a accepté les cookies ou uniquement les cookies essentiels. Si l'utilisateur refuse tous les cookies, le consentement sera *redemandé à chaque visite ou rechargement de la page. Cela devrait être conforme aux exigences de la loi 25 au Québec. N'oubliez pas de tester le script sur plusieurs navigateurs pour assurer qu'il fonctionne *correctement.
 */
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptAllCookies = document.getElementById('acceptAllCookies');
    const acceptEssentialCookies = document.getElementById('acceptEssentialCookies');
    const declineCookies = document.getElementById('declineCookies');

    const consentDuration = 24 * 60 * 60 * 1000; // 24 heures en millisecondes

    function hasConsentExpired() {
        const lastConsentTime = localStorage.getItem('lastConsentTime');
        if (!lastConsentTime) return true;
        const now = new Date().getTime();
        return (now - lastConsentTime) > consentDuration;
    }

    function showCookieConsent() {
        cookieConsent.style.display = 'block';
    }

    function hideCookieConsent() {
        cookieConsent.style.display = 'none';
    }

    function setConsent(consentType) {
        if (consentType === 'none') {
            // Pour refuser tous les cookies, on ne stocke rien dans localStorage
            localStorage.removeItem('cookiesConsent');
            localStorage.removeItem('lastConsentTime');
        } else {
            // On stocke le type de consentement et l'heure actuelle dans localStorage
            localStorage.setItem('cookiesConsent', consentType);
            localStorage.setItem('lastConsentTime', new Date().getTime());
        }
        hideCookieConsent();
    }

    function checkConsent() {
        const consent = localStorage.getItem('cookiesConsent');
        if (!consent || hasConsentExpired()) {
            showCookieConsent();
        } else {
            hideCookieConsent();
        }
    }

    acceptAllCookies.addEventListener('click', function() {
        setConsent('all');
        enableAllCookies();
    });

    acceptEssentialCookies.addEventListener('click', function() {
        setConsent('essential');
        enableEssentialCookies();
    });

    declineCookies.addEventListener('click', function() {
        setConsent('none');
        disableAllCookies();
    });

    function enableAllCookies() {
        // Logique pour activer tous les cookies
        console.log("Tous les cookies sont activés.");
    }

    function enableEssentialCookies() {
        // Logique pour activer uniquement les cookies essentiels
        console.log("Seuls les cookies essentiels sont activés.");
    }

    function disableAllCookies() {
        // Logique pour désactiver tous les cookies non essentiels
        console.log("Tous les cookies non essentiels sont désactivés.");
    }

    // Vérification du consentement à chaque chargement de page
    checkConsent();
});
