(function () {
    // The initial theme is applied by the inline bootstrap snippet at the top of
    // every page's <head> so the first paint already uses the right colors.
    // This file keeps the theme in sync afterwards (buttons, system changes,
    // other tabs and back/forward cache restores).
    var storageKey = 'kp-theme-preference';
    var root = document.documentElement;
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    var validThemes = ['light', 'dark', 'system'];
    var transitionTimer = null;

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

    // Swap every color at once instead of letting each element fade on its own.
    function suppressTransitions() {
        root.classList.add('theme-switching');
        window.clearTimeout(transitionTimer);
        transitionTimer = window.setTimeout(function () {
            root.classList.remove('theme-switching');
        }, 60);
    }

    function applyTheme(themeSource, shouldPersist) {
        var normalizedSource = validThemes.indexOf(themeSource) >= 0 ? themeSource : 'system';
        var resolvedTheme = resolveTheme(normalizedSource);

        if (root.dataset.theme !== resolvedTheme) {
            suppressTransitions();
        }

        root.dataset.themeSource = normalizedSource;
        root.dataset.theme = resolvedTheme;
        root.style.colorScheme = resolvedTheme;
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

    function onSystemThemeChange() {
        if ((root.dataset.themeSource || 'system') === 'system') {
            applyTheme('system', false);
        }
    }

    function bindButtons() {
        document.querySelectorAll('[data-theme-option]').forEach(function (button) {
            button.addEventListener('click', function () {
                applyTheme(button.getAttribute('data-theme-option') || 'system', true);
            });
        });

        updateButtons(root.dataset.themeSource || getStoredPreference());
    }

    applyTheme(getStoredPreference(), false);

    if (typeof mediaQuery.addEventListener === 'function') {
        mediaQuery.addEventListener('change', onSystemThemeChange);
    } else if (typeof mediaQuery.addListener === 'function') {
        mediaQuery.addListener(onSystemThemeChange);
    }

    // Keep other open tabs in sync when the preference changes.
    window.addEventListener('storage', function (event) {
        if (event.key === storageKey) {
            applyTheme(getStoredPreference(), false);
        }
    });

    // Pages restored from the back/forward cache skip the bootstrap snippet.
    window.addEventListener('pageshow', function (event) {
        if (event.persisted) {
            applyTheme(getStoredPreference(), false);
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bindButtons, { once: true });
    } else {
        bindButtons();
    }
})();
