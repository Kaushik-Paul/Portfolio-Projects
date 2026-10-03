(function () {
    var redirectDelayMs = 3000;

    function showTargetHost(redirectUrl) {
        var targetLabel = document.querySelector('[data-redirect-host]');

        if (!targetLabel) {
            return;
        }

        try {
            targetLabel.querySelector('span').textContent = new URL(redirectUrl, window.location.href).hostname;
            targetLabel.hidden = false;
        } catch (error) {
            // Leave the label hidden when the URL cannot be parsed.
        }
    }

    function startCountdown() {
        var countdown = document.querySelector('[data-countdown]');
        var startedAt = Date.now();

        if (!countdown) {
            return;
        }

        function tick() {
            var remainingMs = Math.max(0, redirectDelayMs - (Date.now() - startedAt));
            countdown.textContent = String(Math.ceil(remainingMs / 1000));

            if (remainingMs > 0) {
                window.setTimeout(tick, 200);
            }
        }

        tick();
    }

    function startRedirect() {
        var primaryLink = document.querySelector('.redirect-button.primary');

        if (!primaryLink) {
            return;
        }

        var redirectUrl = primaryLink.getAttribute('href');

        if (!redirectUrl) {
            return;
        }

        showTargetHost(redirectUrl);
        startCountdown();

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
