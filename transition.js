(() => {
    "use strict";

    const LEAVE_DURATION = 600;

    /*
     * Page enter
     */
    document.addEventListener("DOMContentLoaded", () => {
        requestAnimationFrame(() => {
            document.documentElement.classList.add("page-ready");
        });
    });


    /*
     * Page leave
     */
    document.addEventListener("click", (event) => {

        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        /*
         * Ignore modified clicks
         */
        if (
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.metaKey
        ) {
            return;
        }

        /*
         * Ignore new-tab links
         */
        if (link.target === "_blank") {
            return;
        }

        const url = new URL(
            link.href,
            window.location.href
        );

        /*
         * Only handle same-origin links
         */
        if (url.origin !== window.location.origin) {
            return;
        }

        /*
         * Same page
         */
        if (
            url.pathname === window.location.pathname &&
            url.search === window.location.search &&
            url.hash === window.location.hash
        ) {
            return;
        }

        event.preventDefault();

        /*
         * Prevent double navigation
         */
        if (
            document.documentElement.classList.contains(
                "page-leaving"
            )
        ) {
            return;
        }

        document.documentElement.classList.add(
            "page-leaving"
        );

        /*
         * Navigate after the leave animation.
         *
         * Use the exact URL from the clicked link.
         */
        setTimeout(() => {
            window.location.assign(url.href);
        }, LEAVE_DURATION);

    });

})();
