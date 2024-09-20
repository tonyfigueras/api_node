//const { Client, PrivateKey, TokenCreateTransaction } = require('@hashgraph/sdk');
const postgre = require('../database'); // Conexión a la base de datos


//const client = Client.forTestnet().setOperator('0.0.4866131', '302e020100300506032b657004220420a5b84480a6aabb251319dce9008fc6ee568f238ee9544c97525983c6767bc495');

const hederaController = {
createToken: async (req, res) => {
  try {
    const { name, price } = req.body

    const sql = 'INSERT INTO books(name, price) VALUES($1, $2) RETURNING *'

    const { rows } = await postgre.query(sql, [name, price])

    res.json({msg: "OK", data: rows[0]})

} catch (error) {
    res.json({msg: error.msg})
}
},

listTokens: async (req, res) => {
  const userId = req.user.id;  // Obtener el user_id del token JWT

  try {
    // Consultar tokens desde la base de datos filtrando por user_id
    const sql = 'SELECT * FROM tokens WHERE user_id = $1';
    const { rows } = await postgre.query(sql, [userId]);

    res.json({ tokens: rows });
  } catch (error) {
    console.error('Error al listar tokens:', error);
    res.status(500).json({ error: 'Error al listar tokens' });
  }
}
};
module.exports = hederaController;

