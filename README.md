# Costeo FOAM Integral — Consola North Foam

Aplicación web de una sola página (HTML autónomo) para el costeo integral de insertos de foam:
costeo de placas y corte, ruta de proceso, centros de costo, costo integral, precio, panel
ejecutivo, presupuesto y punto de equilibrio, con escenarios (Base/Conservador/Estrés) y
exportación a Excel y PDF.

- **Archivo único:** `index.html` (no requiere build ni servidor).
- **Datos:** se guardan en el navegador de cada usuario (localStorage). No hay base de datos.
- **Descargas:** Excel/PDF/JSON funcionan de forma nativa al alojarse en un sitio web normal.

---

## Despliegue en Vercel con GitHub (recomendado)

### 1. Crear el repositorio en GitHub
1. Entra a https://github.com/new
2. Nombre sugerido: `costeo-foam` · visibilidad **Private** (o Public, tú decides) · **Create repository**.
3. Sube el archivo `index.html`:
   - En la página del repo: **Add file → Upload files** → arrastra `index.html` → **Commit changes**.
   - (Opcional) sube también este `README.md`.

> El `index.html` debe quedar en la **raíz** del repositorio.

### 2. Conectar el repo a Vercel
1. Entra a https://vercel.com y **Sign up / Log in with GitHub**.
2. **Add New… → Project**.
3. **Import** el repositorio `costeo-foam` (autoriza a Vercel a leer tu GitHub si te lo pide).
4. En la configuración del proyecto:
   - **Framework Preset:** `Other`
   - **Build Command:** *(vacío)*
   - **Output Directory:** *(vacío)* — Vercel sirve la raíz con `index.html`
   - **Install Command:** *(vacío)*
5. **Deploy**.

En ~20 segundos tendrás una URL tipo `https://costeo-foam.vercel.app`.

### 3. Actualizaciones automáticas
Cada vez que hagas **push** a la rama `main` (o subas un nuevo `index.html` desde GitHub),
Vercel **redespliega solo**. No hay que hacer nada más.

### 4. (Opcional) Dominio propio
En Vercel: **Project → Settings → Domains → Add** y sigue las instrucciones de DNS
(por ejemplo `costeo.northfoam.com`).

---

## Alternativa rápida sin GitHub (Vercel CLI)

```bash
npm i -g vercel
cd carpeta-donde-esta-index.html
vercel        # primer deploy (te pide login y confirmaciones)
vercel --prod # publicar a producción
```

## Alternativa más rápida (arrastrar y soltar)
En https://vercel.com → **Add New… → Project → Deploy** puedes **arrastrar la carpeta**
que contiene `index.html`. Útil para una prueba inmediata (sin auto-redespliegue).

---

## Notas
- No se necesita `package.json` ni `vercel.json`: es un sitio estático de un archivo.
- Las librerías (Chart.js, SheetJS, jsPDF) se cargan desde CDN público (cdnjs), permitido en Vercel.
- Los datos capturados viven en el navegador de cada persona; para respaldos usa el botón
  **Respaldar datos** (JSON) dentro de la app e **Importar** para restaurarlos.
- El tipo de cambio se actualiza con el botón de TC oficial y los enlaces a Banxico/DOF.
  Al estar ya en un sitio web propio, se puede habilitar la **consulta automática diaria**
  del FIX (API de Banxico) — pídelo si lo quieres y lo agrego.
