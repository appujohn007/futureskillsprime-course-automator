(async function autoMarkComplete() {
    function getButtonsWithFalse() {
        return Array.from(document.querySelectorAll('button.getStarted'))
            .filter(btn => btn.getAttribute('onclick')?.includes("'false'"));
    }

    async function processNextButton() {
        const buttons = getButtonsWithFalse();
        if (buttons.length === 0) {
            console.log("✅ All buttons processed.");
            return;
        }

        const btn = buttons[0];
        const onclick = btn.getAttribute('onclick');
        const match = onclick.match(/getSubProduct\('(\d+)'/);
        if (match) {
            const productId = match[1];
            console.log("➡️ Processing product ID:", productId);
            try {
                mark_as_complete_hub_product(productId);
            } catch (e) {
                console.error("❌ Error marking complete for", productId, e);
            }
        }

        setTimeout(processNextButton, 2000);
    }

    processNextButton();
})();
