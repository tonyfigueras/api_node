const { Client, PrivateKey, TokenCreateTransaction, Hbar } = require('@hashgraph/sdk');

const client = Client.forTestnet().setOperator('0.0.4866131', '302e020100300506032b657004220420a5b84480a6aabb251319dce9008fc6ee568f238ee9544c97525983c6767bc495');

const createToken = async (req, res) => {
  const { name, symbol, initialSupply } = req.body;

  try {
    const transaction = await new TokenCreateTransaction()
      .setTokenName(name)
      .setTokenSymbol(symbol)
      .setInitialSupply(initialSupply)
      .setTreasuryAccountId(client.operatorAccountId)
      .setAdminKey(PrivateKey.fromString(client.operatorPrivateKey))
      .setFreezeDefault(false)
      .execute(client);

    const receipt = await transaction.getReceipt(client);
    const tokenId = receipt.tokenId;

    res.json({ tokenId });
  } catch (error) {
    res.status(500).json({ error: 'Error creando token en Hedera' });
  }
};


const listTokens = async (req, res) => {
    try {
      const accountId = client.operatorAccountId;
      const balance = await new AccountBalanceQuery()
        .setAccountId(accountId)
        .execute(client);
  
      const tokens = balance.tokens._map;
  
      const tokenList = Object.keys(tokens).map(tokenId => ({
        tokenId,
        balance: tokens[tokenId].toString()
      }));
  
      res.json({ tokens: tokenList });
    } catch (error) {
      res.status(500).json({ error: 'Error al listar tokens en Hedera' });
    }
  };
  
  module.exports = { createToken, listTokens };
