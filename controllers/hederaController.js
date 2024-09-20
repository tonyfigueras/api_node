const { Client, PrivateKey, TokenCreateTransaction } = require('@hashgraph/sdk');
const postgre = require('../database'); // Conexión a la base de datos


const client = Client.forTestnet().setOperator('0.0.4866131', '302e020100300506032b657004220420a5b84480a6aabb251319dce9008fc6ee568f238ee9544c97525983c6767bc495');

const hederaController = {
createToken: async (req, res) => {
  const { name, symbol, initialSupply } = req.body;
  const userId = req.user.id;  // Obtener el user_id del token JWT

  try {
    // Crear el token en Hedera
    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(client.operatorAccountId)
      .setAdminKey(PrivateKey.fromString(client.operatorPrivateKey))
      .setFreezeDefault(false)
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    const tokenId = receipt.tokenId.toString();

    // Guardar el token en la base de datos asociado al usuario
    const sql = 'INSERT INTO tokens(token_id, name, symbol, initial_supply, user_id) VALUES($1, $2, $3, $4, $5) RETURNING *';
    const { rows } = await postgre.query(sql, [tokenId, name, symbol, initialSupply, userId]);

    res.json({ msg: 'Token creado exitosamente', token: rows[0] });
  } catch (error) {
    console.error('Error creando token:', error);
    res.status(500).json({ error: 'Error creando token en Hedera' });
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

