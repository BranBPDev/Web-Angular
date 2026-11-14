[Volver al índice](../README.md)

---

# Panel de automatización

Herramienta local para subir cambios y comprobar la web. Vive en `testing/` y no se sube a GitHub.

---

## Opciones

`testing/run.bat` se ejecuta como administrador de forma automática.

| Opción | Acción |
|---|---|
| 1 | Subir cambios a GitHub (commit, pull con rebase y push) |
| 2 | Comprobar que `https://branbp.com` responde |
| 3 | Abrir la web en el navegador |
| 4 | Flujo completo: subir, esperar al Action, comprobar y abrir |
| 5 | Servidor local de desarrollo (`npm start`) |

---

## Configuración

El usuario y el token de GitHub se configuran en `testing/python_embed/modules/config.py`.
Con token válido no se solicita nada al subir cambios.
