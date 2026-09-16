# Ejemplo de Repositorio con API REST

Esta carpeta contiene implementaciones alternativas de repositorios usando API REST en lugar de IndexedDB.

## 🔄 Cómo cambiar de IndexedDB a API

### 1. Asegúrate de tener un backend corriendo
```bash
# Por ejemplo, un servidor Node.js/Express en http://localhost:3000
```

### 2. Configura la URL de la API
```bash
# Crea un archivo .env en la raíz
VITE_API_URL=http://localhost:3000/api
```

### 3. Actualiza el Container
```typescript
// En src/config/container.ts

// Importa la implementación de API
import { PostRepositoryAPI } from '../repositories/api/PostRepositoryAPI';

// En el método initialize(), cambia:
// this._postRepository = new PostRepository(); // IndexedDB
this._postRepository = new PostRepositoryAPI(); // API REST

// ¡Eso es todo! El resto del código sigue igual.
```

## 📝 Formato esperado del API

### GET /api/posts
```json
[
  {
    "id": "1",
    "userId": "user1",
    "author": "Juan Pérez",
    "content": "Contenido del post",
    "likes": 15,
    "timestamp": "2024-11-25T10:00:00Z"
  }
]
```

### POST /api/posts
Request:
```json
{
  "userId": "user1",
  "author": "Juan Pérez",
  "content": "Nuevo post"
}
```

Response: El post creado con su ID

### GET /api/posts/:id
Response: Un solo post

### PUT /api/posts/:id
Request: Campos a actualizar
Response: Post actualizado

### DELETE /api/posts/:id
Response: 204 No Content

### POST /api/posts/:id/like
Response: Post actualizado con likes incrementados

## ✅ Ventajas

1. **Sin cambios en el código de negocio**: Los controladores y hooks siguen igual
2. **Fácil de testear**: Puedes crear mocks del ApiClient
3. **Flexible**: Puedes tener IndexedDB para offline y API para online
4. **Type-safe**: TypeScript valida todo
