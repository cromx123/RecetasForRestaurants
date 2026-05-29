function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'Administrador') {
    return res.status(403).json({ error: 'Acceso restringido a administradores' });
  }
  next();
}

module.exports = { requireAdmin };
