# Authentication Types Documentation

## Overview

Diese Dokumentation beschreibt die typsichere Implementierung der Azure AD Authentifizierung für Frontend und Backend.

## Frontend Types

### User (`src/types/user.ts`)

```typescript
interface User {
  id: string; // Interne User-ID
  keycloakId: string; // Keycloak Subject-ID
  name: string; // Display name
  email: string; // Email or UPN
}
```

### MsalIdTokenClaims (`src/types/auth.ts`)

Standard Azure AD ID Token Claims gemäß [Microsoft Dokumentation](https://learn.microsoft.com/en-us/entra/identity-platform/id-token-claims-reference).

**Wichtige Claims:**

- `sub` / `keycloakId`: eindeutiger User-Identifier aus Keycloak
- `name`: Anzeigename des Users
- `email`: Email-Adresse (optional)
- `preferred_username`: UPN oder Email für Login
- `aud`: Audience - Ziel-App
- `iss`: Issuer - Token-Aussteller
- `iat`: Issued at - Erstellungszeit
- `exp`: Expiration - Ablaufzeit

## Backend Types

### User (`src/types/user.types.ts`)

Identisch zum Frontend für konsistente Datenstruktur.

### AzureAdTokenClaims

Azure AD Token Claims für Backend-Validierung.

### JwtPayload

Vollständiges JWT Payload mit allen Claims.

### AuthenticatedRequest

Erweitert Express Request mit:

- `user?: User` - Extrahierte User-Daten
- `token?: JwtPayload` - Vollständiges Token

## Usage

### Frontend

**useCurrentUser Hook:**

```typescript
import { useCurrentUser } from '@/hooks/useCurrentUser';

function MyComponent() {
  const user = useCurrentUser();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <div>Hello {user.name}</div>;
}
```

### Backend

**Controller mit Authentication:**

```typescript
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AzureAdAuthGuard } from '../auth/auth.guard';
import { CurrentUser } from '../decorators';
import type { User } from '../types';

@Controller('api')
export class MyController {
  @Get('profile')
  @UseGuards(AzureAdAuthGuard)
  getProfile(@CurrentUser() user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
```

**Mit Token-Informationen:**

```typescript
import { CurrentToken } from '../decorators';
import type { JwtPayload } from '../types';

@Get('token-info')
@UseGuards(AzureAdAuthGuard)
getTokenInfo(
  @CurrentUser() user: User,
  @CurrentToken() token: JwtPayload,
) {
  return {
    user,
    tokenExpires: new Date(token.exp * 1000),
  };
}
```

## Type Safety

Alle Types sind vollständig typisiert:

- ✅ Keine `any` Types
- ✅ Null-Checks mit Optional Chaining
- ✅ JSDoc-Kommentare für IntelliSense
- ✅ Konsistente Struktur zwischen Frontend und Backend
- ✅ Microsoft-konforme Claim-Namen

## Decorators

### @CurrentUser()

Extrahiert User-Daten aus dem Request. Muss mit `@UseGuards(AzureAdAuthGuard)` verwendet werden.

### @CurrentToken()

Extrahiert das vollständige JWT Payload. Muss mit `@UseGuards(AzureAdAuthGuard)` verwendet werden.

## Best Practices

1. **Immer Guard verwenden**: Decorators funktionieren nur mit `@UseGuards(AzureAdAuthGuard)`
2. **Null-Checks**: User kann `undefined` sein, auch wenn Guard aktiv ist
3. **Email Fallback**: Email kann leer sein, preferred_username als Fallback
4. **Token Expiration**: Immer `exp` Claim prüfen für Session-Management
