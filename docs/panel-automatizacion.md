[← Volver al índice](../README.md)

# Panel de automatización

`testing/run.bat` (pide permisos de administrador solo):

1. Subir cambios a GitHub (commit, pull --rebase y push)
2. Comprobar que https://branbp.com responde
3. Abrir la web en el navegador
4. Completo: subir, esperar al Action, comprobar y abrir
5. Servidor local de desarrollo (`npm start`)

La carpeta `testing/` está en `.gitignore` y no se sube a GitHub. El token de GitHub se configura en `testing/python_embed/modules/config.py`.
