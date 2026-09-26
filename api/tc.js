// /api/tc — Tipo de cambio oficial desde el SIE de Banco de México
// Series: SF43718 = FIX (el que se publica al día hábil siguiente en el DOF)
//         SF60653 = para solventar obligaciones / fecha de liquidación (pagos)
// El token NUNCA va en el código: se lee de la variable de entorno BMX_TOKEN.

const SERIES = "SF43718,SF60653";
const URL = `https://www.banxico.org.mx/SieAPIRest/service/v1/series/${SERIES}/datos/oportuno`;

export default async function handler(req, res) {
  const token = process.env.BMX_TOKEN;
  if (!token) {
    return res.status(500).json({
      error: "falta_token",
      mensaje: "Configura la variable de entorno BMX_TOKEN en Vercel (Settings → Environment Variables)."
    });
  }

  try {
    const r = await fetch(URL, {
      headers: { "Bmx-Token": token, Accept: "application/json" }
    });
    if (!r.ok) {
      return res.status(502).json({ error: "banxico_error", status: r.status });
    }
    const j = await r.json();
    const series = (j && j.bmx && j.bmx.series) || [];
    const pick = (id) => {
      const s = series.find((x) => x.idSerie === id);
      const d = s && s.datos && s.datos[0];
      if (!d || !d.dato || d.dato === "N/E") return null;
      return { valor: parseFloat(String(d.dato).replace(/,/g, "")), fecha: d.fecha };
    };

    const fix = pick("SF43718");
    const pagos = pick("SF60653");
    if (!fix && !pagos) {
      return res.status(502).json({ error: "sin_datos" });
    }

    // Cache en el borde: 30 min, y sirve el valor viejo mientras revalida
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    return res.status(200).json({
      fix,               // FIX / publicación DOF
      pagos,             // para solventar obligaciones (liquidación)
      fuente: "Banco de México · SIE (SF43718 / SF60653)",
      consultado: new Date().toISOString()
    });
  } catch (e) {
    return res.status(500).json({ error: "excepcion", mensaje: String(e) });
  }
}
