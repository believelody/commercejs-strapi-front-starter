/** Dispatch event on click outside of node */
export function clickLinkOutside(node, params) {
    const handleClick = (event, { isDraft, text }) => {
        if (node && !node.contains(event.target) && !event.defaultPrevented && isDraft) {
            if (event.target.localName === "a" || event.target.parentElement.localName === "a") {
                if (!confirm(text)) {
                    event.preventDefault();
                } else {
                    node.dispatchEvent( new CustomEvent('clicklinkoutside') );
                }
            }
        }
    }
    document.addEventListener('click', e => handleClick(e, params), true);

    return {
        update(newParams) {
            params = newParams;
            document.addEventListener('click', e => handleClick(e, params), true)
        },
        destroy() {
            document.removeEventListener('click', e => handleClick(e, false), true);
        }
    }
}