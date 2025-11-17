// api/proxy.js
module.exports = async (req, res) => {
  const { stream } = req.query;

  if (!stream) {
    return res.status(400).json({ error: 'Falta el parámetro stream' });
  }

  const url = `https://dlhd.dad/stream/stream-${stream}.php`;

  try {
    const response = await fetch(url);
    const html = await response.text();

    // Limpiamos el HTML para eliminar anuncios y scripts que causan parones
    let cleanHtml = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/onload="[^"]*"/gi, '')
      .replace(/onerror="[^"]*"/gi, '')
      .replace(/popup/gi, '')
      .replace(/ads/g, '');

    res.setHeader('Content-Type', 'text/html');
    res.send(cleanHtml);
  } catch (error) {
    res.status(500).send('Error al cargar el canal');
  }
};
