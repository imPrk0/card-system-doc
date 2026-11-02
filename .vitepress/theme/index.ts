// https://vitepress.dev/guide/custom-theme
import { h, watch, nextTick, onMounted } from 'vue';
import { useRoute, type Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';

import googleAnalytics from 'vitepress-plugin-google-analytics';

import './style.scss';
import '@catppuccin/vitepress/theme/mocha/blue.css';

import { setupMediumZoom } from './utils/medium-zoom';

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            // https://vitepress.dev/guide/extending-default-theme#layout-slots
        })
    },
    enhanceApp({ app, router, siteData }) {
        googleAnalytics({
            id: 'G-DQHFZHE4GN'
        })
    },
    setup: () => {
        const route = useRoute();

        onMounted((): void => {
            setupMediumZoom();
        });

        watch((): string => route.path, (): void => setupMediumZoom());
    }
} satisfies Theme;
