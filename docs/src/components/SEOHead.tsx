import { useEffect } from 'react';

interface SEOHeadProps {
    title: string;
    description: string;
    path?: string;
    type?: string;
}

export function SEOHead({ title, description, path = '', type = 'website' }: SEOHeadProps) {
    const baseUrl = 'https://nishal21.github.io/carbonlint';
    const fullUrl = `${baseUrl}${path}`;
    const fullTitle = path === '' || path === '/'
        ? 'CarbonLint — Real-Time Carbon Footprint Monitoring for Developers'
        : `${title} | CarbonLint`;

    useEffect(() => {
        // Update document title
        document.title = fullTitle;

        // Update/create meta tags
        const metaTags: Record<string, string> = {
            'description': description,
            'og:title': fullTitle,
            'og:description': description,
            'og:url': fullUrl,
            'og:type': type,
            'twitter:title': fullTitle,
            'twitter:description': description,
            'twitter:url': fullUrl,
        };

        Object.entries(metaTags).forEach(([key, value]) => {
            const isOg = key.startsWith('og:') || key.startsWith('twitter:');
            const attr = isOg ? 'property' : 'name';

            let tag = document.querySelector(`meta[${attr}="${key}"]`);
            if (!tag) {
                tag = document.createElement('meta');
                tag.setAttribute(attr, key);
                document.head.appendChild(tag);
            }
            tag.setAttribute('content', value);
        });

        // Update canonical
        let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.setAttribute('rel', 'canonical');
            document.head.appendChild(canonical);
        }
        canonical.setAttribute('href', fullUrl);

        return () => {
            // Reset title on unmount
            document.title = 'CarbonLint — Real-Time Carbon Footprint Monitoring for Developers';
        };
    }, [fullTitle, description, fullUrl, type]);

    return null;
}
