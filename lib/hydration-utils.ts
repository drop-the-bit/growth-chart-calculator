export function cleanupBrowserExtensions() {
  if (typeof window === 'undefined') return;

  const html = document.documentElement;
  if (html.hasAttribute('nighteye')) {
    html.removeAttribute('nighteye');
  }

  const commonExtensionAttrs = [
    'data-darkreader-inline-bgcolor',
    'data-darkreader-inline-color',
    'data-darkreader-mode',
    'data-darkreader-scheme',
  ];

  commonExtensionAttrs.forEach(attr => {
    if (html.hasAttribute(attr)) {
      html.removeAttribute(attr);
    }
  });
} 