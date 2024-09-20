const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado' });
  }

  try {
    const verified = jwt.verify(token, 'tu_clave_secreta');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ error: 'Token no válido' });
  }
};

module.exports = authMiddleware;
