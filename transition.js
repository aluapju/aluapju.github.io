document.addEventListener("DOMContentLoaded", () => {

    document.addEventListener("click", event => {

        const link = event.target.closest("a");

        if (!link) {
            return;
        }

        const url = new URL(link.href, window.location.href);

        /* 只處理本站連結 */
        if (url.origin !== window.location.origin) {
            return;
        }

        /* 新分頁或特殊按鍵不處理 */
        if (
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey ||
            event.metaKey ||
            link.target === "_blank"
        ) {
            return;
        }

        /* 相同頁面不處理 */
        if (url.href === window.location.href) {
            return;
        }

        event.preventDefault();

        /* 開始離場動畫 */
        document.body.classList.add("page-transition");

        /* 動畫完成後才切換頁面 */
        setTimeout(() => {
            window.location.href = url.href;
        }, 600);

    });

});
