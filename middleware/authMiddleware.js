const jwt = require('jsonwebtoken');

function authFunction(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Zugriff verweigert' });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return res.status(403).json({ message: 'Ihre Anmeldung ist abgelaufen' });

    req.user = user;
    next();
  });
}

module.exports = authFunction;
