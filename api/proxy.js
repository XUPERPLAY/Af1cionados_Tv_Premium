// api/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware';

export default createProxyMiddleware({
  target: 'https://dlhd.dad',
  changeOrigin: true,
  pathRewrite: {
    '^/api/proxy': '/stream',
  },
  onProxyRes: (proxyRes) => {
    delete proxyRes.headers['x-frame-options'];
    delete proxyRes.headers['content-security-policy'];
    delete proxyRes.headers['frame-options'];
  },
});

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
