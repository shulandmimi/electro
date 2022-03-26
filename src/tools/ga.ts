import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

// @ts-ignore
if (typeof gtag !== 'function') gtag = () => void 0;

// @ts-ignore
function sendToGoogleAnalytics({ name, delta, id }) {
    // Assumes the global `gtag()` function exists, see:
    // https://developers.google.com/analytics/devguides/collection/gtagjs

    // @ts-ignore
    gtag('event', name, {
        event_category: 'Web Vitals',
        // The `id` value will be unique to the current page load. When sending
        // multiple values from the same page (e.g. for CLS), Google Analytics can
        // compute a total by grouping on this ID (note: requires `eventLabel` to
        // be a dimension in your report).
        event_label: id,
        // Google Analytics metrics must be integers, so the value is rounded.
        // For CLS the value is first multiplied by 1000 for greater precision
        // (note: increase the multiplier for greater precision if needed).
        value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        // Use a non-interaction event to avoid affecting bounce rate.
        non_interaction: true,

        // OPTIONAL: any additional params or debug info here.
        // See: https://web.dev/debug-web-vitals-in-the-field/
        // metric_rating: 'good' | 'ni' | 'poor',
        // debug_info: '...',
        // ...
    });
}

getCLS(sendToGoogleAnalytics);
getFID(sendToGoogleAnalytics);
getLCP(sendToGoogleAnalytics);
getFCP(sendToGoogleAnalytics);
getTTFB(sendToGoogleAnalytics);
