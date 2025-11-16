# Bolsi Landing V2

Landing estática construida con HTML/CSS/JS puro y desplegada en el mismo sitio de Firebase Hosting que la versión anterior.

## Estructura
- `index.html`: landing principal multi-idioma.
- `privacy-policy.html` y `delete-account.html`: páginas legales.
- `assets/`: estilos, scripts, imágenes y videos optimizados.
- `robots.txt` y `sitemap.xml`: archivos SEO listos para publicar.
- `firebase.json`: configuración de Hosting (rewrites y headers) idéntica a la versión clásica.

## Despliegues
### GitHub Actions (recomendado)
El workflow `/.github/workflows/firebase-deploy.yml` hace deploy automático al **proyecto `gastos-mensuales-594f0`** cuando se hace push a `main` dentro del repositorio [`altriontech/bolsi-web`](https://github.com/altriontech/bolsi-web).

Requisitos en el repositorio remoto:
1. Configurar Workload Identity Federation en GCP.
2. Añadir los secretos:
   - `WIF_PROVIDER`: nombre completo del Workload Identity Provider.
   - `WIF_SERVICE_ACCOUNT`: email del service account con permisos de Hosting Admin.

### Deploy manual
1. Instala Firebase CLI: `npm install -g firebase-tools`.
2. Autentícate: `firebase login`.
3. Desde la raíz de `landingV2/`, ejecuta:

```bash
firebase deploy --only hosting --project gastos-mensuales-594f0
```

## Notas
- El mismo sitio aloja tanto la landing como las páginas legales, por lo que cualquier nuevo HTML debe declararse en `firebase.json` si requiere ruta dedicada.
- Si se agregan recursos especiales (p. ej. `app-ads.txt` o `.well-known/assetlinks.json`), solo hay que colocarlos en la raíz y Firebase los servirá con los headers definidos.
