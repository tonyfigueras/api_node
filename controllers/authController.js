const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const postgre = require('./db'); 


const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = 'INSERT INTO users(username, password) VALUES($1, $2) RETURNING *';
    const { rows } = await postgre.query(sql, [username, hashedPassword]);
    const token = jwt.sign({ username: rows[0].username }, 'tu_clave_secreta', { expiresIn: '1h' });
    res.json({ msg: 'Registro exitoso', token });
  } catch (error) {
    console.error('Error en el registro:', error);
    res.status(500).json({ msg: 'Error en el registro', error: error.message });
  }
};


const login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales incorrectas' });
  }

  const token = jwt.sign({ username }, 'tu_clave_secreta', { expiresIn: '1h' });
  res.json({ token });
};

const logout = (req, res) => {
  res.json({ message: 'Sesión finalizada' });
};

module.exports = { login, register, logout };
