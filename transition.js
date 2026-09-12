document.addEventListener("click", event => {
    const link = event.target.closest("a");

    if (!link) {
        return;
    }

    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin) {
        return;
    }

    if (
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.metaKey ||
        link.target === "_blank"
    ) {
        return;
    }

    if (url.href === window.location.href) {
        return;
    }

    if (!document.startViewTransition) {
        return;
    }

    event.preventDefault();

    document.documentElement.classList.add("page-transition");

    setTimeout(() => {
        window.location.href = url.href;
    }, 600);
});
