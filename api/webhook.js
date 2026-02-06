export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    console.log("Webhook recebido:", req.body);
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ error: "Erro no webhook" });
  }
}
