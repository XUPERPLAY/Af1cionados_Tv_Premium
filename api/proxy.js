// api/proxy.js
export const config = { api: { bodyParser: false } };

import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://dlhd.dad',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '',
  },
  onProxyRes: (proxyRes, req, res) => {
    // Eliminamos headers que causan problemas
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['frame-options'];
  },
});
