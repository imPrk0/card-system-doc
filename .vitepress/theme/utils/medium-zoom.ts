import mediumZoom from 'medium-zoom';

export const setupMediumZoom = (): void => {
    mediumZoom('.main img', {
        background: 'var(--vp-c-bg)'
    });
};
