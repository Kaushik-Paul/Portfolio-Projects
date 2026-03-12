(function () {
    var redirectDelayMs = 3000;

    function startRedirect() {
        var primaryLink = document.querySelector('.redirect-button.primary');

        if (!primaryLink) {
            return;
        }

        var redirectUrl = primaryLink.getAttribute('href');

        if (!redirectUrl) {
            return;
        }

        window.setTimeout(function () {
            window.location.href = redirectUrl;
        }, redirectDelayMs);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startRedirect, { once: true });
    } else {
        startRedirect();
    }
})();
