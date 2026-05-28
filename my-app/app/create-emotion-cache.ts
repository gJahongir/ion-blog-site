import createCache from "@emotion/cache";

const isBrowser = typeof window !== 'undefined';


export default function createEmotionCache() {
    let insertionPoint: HTMLElement | undefined;

    if (isBrowser) {
        const emotionInsertionPoint = document.getElementById('mui-insertion-point')

        insertionPoint = (emotionInsertionPoint as HTMLElement) ?? undefined
    }

    return createCache({ key: 'mui', insertionPoint })
}