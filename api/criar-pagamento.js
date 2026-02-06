export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { amount, plan } = req.body;

  try {

    const response = await fetch("https://paysuite.tech/api/v1/payments", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.PAYSUITE_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        amount: Number(amount),
        reference: `PLAN_${plan}_${Date.now()}`,
        description: `Plano ${plan} - StreamMax`,
        return_url: "https://stremax-paysuite.vercel.app",
        callback_url: "https://stremax-paysuite.vercel.app"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json({
      link: data.data.checkout_url
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao gerar pagamento" });
  }
}
