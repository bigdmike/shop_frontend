export function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.setAttribute('src', src);
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}
