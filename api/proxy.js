// api/proxy.js
export default async function handler(req, res) {
  // Obtiene la URL que queremos cargar
  const { url } = req.query;
  
  // Si no hay URL, devuelve error
  if (!url) {
    return res.status(400).send('URL no proporcionada');
  }

  try {
    // Combina la URL base con los parámetros
    const fullUrl = `https://${url}`;
    
    // Hace la petición al servidor externo (dlhd.dad)
    const response = await fetch(fullUrl);
    
    // Copia los headers importantes
    const contentType = response.headers.get('content-type') || 'application/vnd.apple.mpegurl';
    
    // Configura los headers de respuesta
    res.setHeader('Content-Type', contentType);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    
    // Devuelve el contenido
    const data = await response.text();
    res.status(200).send(data);
    
  } catch (error) {
    console.error('Error en proxy:', error);
    res.status(500).send('Error al cargar el stream');
  }
}
