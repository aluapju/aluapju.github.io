document.addEventListener("click", event => {
    const link = event.target.closest("a");

    if (!link) {
        return;
    }

    const url = new URL(link.href, window.location.href);

    // 只處理本站頁面
    if (url.origin !== window.location.origin) {
        return;
    }

    // 新分頁、特殊按鍵不要攔截
    if (
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.metaKey ||
        link.target === "_blank"
    ) {
        return;
    }

    // 沒有 View Transition API 就使用正常跳轉
    if (!document.startViewTransition) {
        return;
    }

    event.preventDefault();

    document.startViewTransition(async () => {
        window.location.href = url.href;
    });
});
