(() => {
    const intro = document.getElementById('site-intro');
    const skipButton = document.getElementById('intro-skip');

    if (!intro || !skipButton) {
        console.warn('Intro not shown: check the intro HTML IDs.');
        return;
    }

    const storageKey = 'voltgenicsMetalIntroSeen';

    const reducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    let alreadyShown = false;

    try {
        alreadyShown = sessionStorage.getItem(storageKey) === 'true';
    } catch {
        // Continue if session storage is unavailable.
    }

    if (reducedMotion || alreadyShown) return;

    try {
        sessionStorage.setItem(storageKey, 'true');
    } catch {
        // The intro can still play if storage is unavailable.
    }

    intro.hidden = false;

    let finished = false;

    function finishIntro() {
        if (finished) return;
        finished = true;
        intro.hidden = true;
    }

    skipButton.addEventListener('click', finishIntro);
    window.setTimeout(finishIntro, 3200);
})();