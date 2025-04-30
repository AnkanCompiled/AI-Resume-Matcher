import { useEffect } from 'react';
export default function HeadComponent({ title, description, keywords, ogTitle, ogDescription, ogImage }) {
    useEffect(() => {
        if (title) document.title = title;

        const setMeta = (name, content) => {
            const meta = document.querySelector(`meta[name="${name}"]`) || document.querySelector(`meta[property="${name}"]`);
            if (meta && content) meta.setAttribute('content', content);
        };

        setMeta('description', description);
        setMeta('keywords', keywords);
        setMeta('og:title', ogTitle);
        setMeta('og:description', ogDescription);
        setMeta('og:image', ogImage);

    }, [title, description, keywords, ogTitle, ogDescription, ogImage]);

    return null;
}
;

