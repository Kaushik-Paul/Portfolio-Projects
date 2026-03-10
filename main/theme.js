(function () {
    var storageKey = 'kp-theme-preference';
    var root = document.documentElement;
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var validThemes = ['light', 'dark', 'system'];

    function getStoredPreference() {
        try {
            var storedValue = window.localStorage.getItem(storageKey);
            return validThemes.indexOf(storedValue) >= 0 ? storedValue : 'system';
        } catch (error) {
            return 'system';
        }
    }

    function resolveTheme(themeSource) {
        if (themeSource === 'system') {
            return mediaQuery.matches ? 'dark' : 'light';
        }

        return themeSource;
    }

    function updateButtons(themeSource) {
        var buttons = document.querySelectorAll('[data-theme-option]');

        buttons.forEach(function (button) {
            var isActive = button.getAttribute('data-theme-option') === themeSource;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function applyTheme(themeSource, shouldPersist) {
        var normalizedSource = validThemes.indexOf(themeSource) >= 0 ? themeSource : 'system';
        root.dataset.themeSource = normalizedSource;
        root.dataset.theme = resolveTheme(normalizedSource);
        updateButtons(normalizedSource);

        if (!shouldPersist) {
            return;
        }

        try {
            window.localStorage.setItem(storageKey, normalizedSource);
        } catch (error) {
            // Ignore storage errors.
        }
    }

    function bindButtons() {
        var buttons = document.querySelectorAll('[data-theme-option]');
        var currentThemeSource = getStoredPreference();

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                currentThemeSource = button.getAttribute('data-theme-option') || 'system';
                applyTheme(currentThemeSource, true);
            });
        });

        applyTheme(currentThemeSource, false);

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', function () {
                if ((root.dataset.themeSource || 'system') === 'system') {
                    applyTheme('system', false);
                }
            });
        } else if (typeof mediaQuery.addListener === 'function') {
            mediaQuery.addListener(function () {
                if ((root.dataset.themeSource || 'system') === 'system') {
                    applyTheme('system', false);
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindButtons, { once: true });
    } else {
        bindButtons();
    }
})();
