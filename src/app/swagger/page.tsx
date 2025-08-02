'use client';

import { useEffect } from 'react';

declare global {
    interface SwaggerUIStatic {
        (options: Record<string, unknown>): void;
        presets: {
            apis: unknown;
            [key: string]: unknown;
        };
    }

    interface Window {
        SwaggerUIBundle: SwaggerUIStatic;
        SwaggerUIStandalonePreset: unknown;
    }
}

export default function SwaggerPage() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js';
        script.onload = () => {
            if (typeof window.SwaggerUIBundle === 'function') {
                window.SwaggerUIBundle({
                    url: '/api/docs',
                    dom_id: '#swagger-ui',
                    presets: [window.SwaggerUIBundle.presets.apis],
                    layout: 'BaseLayout',
                });
            } else {
                console.error('SwaggerUIBundle is not loaded');
            }
        };
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <link
                rel="stylesheet"
                href="https://unpkg.com/swagger-ui-dist/swagger-ui.css"
            />
            <style>{`
        body {
          background-color: white !important;
        }

        .swagger-ui {
          font-family: 'Segoe UI', sans-serif;
          background-color: #f9f9f9;
          color: #222;
        }

        .swagger-ui .topbar {
          background-color: #007acc;
        }

        .swagger-ui .topbar-wrapper span {
          color: #fff;
        }

        .swagger-ui .opblock.opblock-get {
          border-color: #007acc;
        }

        .swagger-ui .opblock.opblock-get .opblock-summary-method {
          background: #007acc;
        }

        .swagger-ui .opblock.opblock-post {
          border-color: #28a745;
        }

        .swagger-ui .opblock.opblock-post .opblock-summary-method {
          background: #28a745;
        }
      `}</style>
            <div id="swagger-ui" />
        </>
    );
}
