export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { amount, plan } = req.body;

  try {

    const response = await fetch("https://api.paysuite.com/v1/payment-links", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PAYSUITE_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount,
        currency: "BRL",
        description: `Plano ${plan} - StreamMax`
      })
    });

    const data = await response.json();

    return res.status(200).json({
      link: data.payment_url
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
}
