# Angular 21+ Frontend Development Standards

> Use this file as context when generating Angular code. All rules below are **mandatory**.

---

## 📁 Folder Structure — Required Files Per Feature

Every feature folder **must** contain the following files:

```
feature/
├── feature.component.ts
├── feature.component.html
├── feature.component.scss
├── feature.constants.ts
├── feature.utils.ts
├── feature.interfaces.ts
```

---

## 🧱 TypeScript Standards

### General Rules
- Use **strict type checking** — no implicit `any`
- Use `unknown` instead of `any` when type is uncertain
- Always add **access modifiers** (`private`, `protected`, `public`) to all class members
- Use **type inference** when the type is obvious
- No unnecessary `try/catch` blocks — only catch errors you can meaningfully handle
- No `console.log`, `console.warn`, or `console.error` in production code
- Before adding a new function, **check if an existing function can be extended or revised** to avoid code bloating
- Keep functions **pure and predictable**

### JSDoc — Functions
Every function must have a JSDoc in this exact format:

```typescript
/**
 * @private
 * @description Fetches the user name from the API and updates contentInfo
 * @param userId - User ID to fetch
 * @returns void
 */
private fetchUserName(userId: string): void {
  // ...
}
```

### JSDoc — Variables & Computed
Every `signal`, `computed`, and class-level variable must have an inline JSDoc:

```typescript
/** Current authenticated user data */
protected readonly user = signal<User | null>(null);

/** Full display name derived from user signal */
protected readonly displayName = computed(() => `${this.user()?.firstName} ${this.user()?.lastName}`);
```

---

## 🅰️ Angular Component Standards

```typescript
@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrl: './feature.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    // Use host object — NOT @HostBinding / @HostListener
    '(click)': 'onClick()',
    '[class.active]': 'isActive()',
  },
})
export class FeatureComponent {
  // Use inject() — NOT constructor injection
  private readonly featureService = inject(FeatureService);

  /** Signal for component loading state */
  protected readonly isLoading = signal(false);

  /** Derived label from active item */
  protected readonly activeLabel = computed(() => this.activeItem()?.label ?? '');
}
```

### Component Rules
- **Do NOT** set `standalone: true` — it is the default in Angular 21+
- **Always** set `changeDetection: ChangeDetectionStrategy.OnPush`
- Use `input()` and `output()` functions — **not** `@Input()` / `@Output()` decorators
- Use `inject()` for dependency injection — **not** constructor injection
- Use `signal()` for local state
- Use `computed()` for derived state — **not** getters with side effects
- Use `NgOptimizedImage` for all static images (does not apply to inline base64)
- Do **NOT** use `@HostBinding` or `@HostListener` — use `host: {}` in the decorator
- Do **NOT** use `mutate()` on signals — use `update()` or `set()`

---

## 🧩 Template Standards

### Control Flow — Use Native Syntax
```html
@if (isLoading()) {
  <app-spinner />
} @else {
  <app-content />
}

@for (item of items(); track item.id) {
  <app-item [data]="item" />
}

@switch (status()) {
  @case ('active') { <app-active /> }
  @case ('inactive') { <app-inactive /> }
  @default { <app-unknown /> }
}
```

### Template Rules
- Do **NOT** use `*ngIf`, `*ngFor`, `*ngSwitch` — use native control flow
- Do **NOT** use `ngClass` — use `[class]` bindings
- Do **NOT** use `ngStyle` — use `[style]` bindings
- Do **NOT** embed inline Tailwind classes in HTML — define them in SCSS using `@apply`
- Do **NOT** inline SVGs in HTML — reference them through an SVG icon component/file
- Use the `async` pipe for observables in templates
- **Loop forms** using `@for` with `FormArray` — avoid repeating form field markup manually
- Keep templates simple — **no complex logic in templates**

### Forms — Loop Pattern
```html
<form [formGroup]="form">
  @for (field of formFields; track field.key) {
    <div [class]="'form__field form__field--' + field.type">
      <label [for]="field.key" class="form__label">{{ field.label }}</label>
      <input
        [id]="field.key"
        [formControlName]="field.key"
        [type]="field.type"
        class="form__input"
      />
    </div>
  }
</form>
```

---

## 🎨 SCSS / BEM Standards

### BEM Naming Convention
```scss
// Block
.card { }

// Element
.card__title { }
.card__body { }

// Modifier
.card--featured { }
.card__title--large { }
```

### Rules
- Use **BEM** for all class naming
- Do **NOT** hardcode color values — reference Tailwind config tokens via CSS variables or `@apply`
- Do **NOT** use `::ng-deep` — scope styles properly using BEM and `:host`
- Do **NOT** write Tailwind utility classes in the HTML — use `@apply` in SCSS

### Tailwind Integration in SCSS
```scss
// ✅ Correct — apply Tailwind tokens in SCSS
.card {
  @apply rounded-lg shadow-md;

  &__title {
    @apply text-lg font-semibold text-gray-900;
  }

  &__body {
    @apply p-4 text-sm text-gray-600;
  }

  &--featured {
    @apply border-2 border-primary-500;
  }
}
```

---

## 📦 Constants File (`*.constants.ts`)

All magic strings, numbers, and static config belong here — **not** inline in components or services.

```typescript
// feature.constants.ts
export const FEATURE_LIMITS = {
  MAX_ITEMS: 100,
  PAGE_SIZE: 20,
} as const;

export const FEATURE_LABELS = {
  SUBMIT: 'Submit',
  CANCEL: 'Cancel',
} as const;
```

---

## 🔧 Utils File (`*.utils.ts`)

Pure helper functions with no side effects or Angular dependencies.

```typescript
// feature.utils.ts

/**
 * @description Formats a date string to locale display format
 * @param date - ISO date string
 * @returns Formatted date string
 */
export function formatDisplayDate(date: string): string {
  return new Date(date).toLocaleDateString();
}
```

---

## 🗂️ Interfaces File (`*.interfaces.ts`)

All interfaces and types for the feature go here — **never** inline in services or components.

```typescript
// feature.interfaces.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}
```

---

## 🌐 API Endpoints — App-Level Unified File

All route paths live in a **single app-level file** (`src/app/api-endpoints.ts`) — **never** create per-feature endpoint files and **never** hardcode paths inside services or components.

```typescript
// src/app/api-endpoints.ts
export const API_ENDPOINTS = {
  FEATURES: {
    GET_ALL: '/api/features',
    GET_BY_ID: (id: string) => `/api/features/${id}`,
    CREATE: '/api/features',
    UPDATE: (id: string) => `/api/features/${id}`,
    DELETE: (id: string) => `/api/features/${id}`,
  },
  USERS: {
    GET_ALL: '/api/users',
    GET_BY_ID: (id: string) => `/api/users/${id}`,
  },
} as const;
```

---

## ⚙️ Services Standards

```typescript
@Injectable({ providedIn: 'root' })
export class FeatureService {
  private readonly http = inject(HttpClient);

  /**
   * @public
   * @description Retrieves all features from the API
   * @returns Observable of Feature array
   */
  public getAll(): Observable<Feature[]> {
    return this.http.get<Feature[]>(API_ENDPOINTS.FEATURES.GET_ALL);
  }

  /**
   * @public
   * @description Retrieves a single feature by ID
   * @param id - Feature ID
   * @returns Observable of Feature
   */
  public getById(id: string): Observable<Feature> {
    return this.http.get<Feature>(API_ENDPOINTS.FEATURES.GET_BY_ID(id));
  }
}
```

### Service Rules
- Do **NOT** use `any` — always type with interfaces from the interfaces file
- Use `providedIn: 'root'` for singleton services
- Use `inject()` — not constructor injection
- Keep services focused on a **single responsibility**
- Do **NOT** over-complicate — no unnecessary abstractions
- Route paths must come from the **API Endpoints file**

---

## 🔒 Security Standards

### Input Sanitization
- Never bind user input directly to `[innerHTML]` without sanitization
- Use Angular's `DomSanitizer` only when rendering trusted HTML — mark the usage explicitly

```typescript
/** Sanitized HTML content for rich text display */
protected readonly safeHtml = computed(() =>
  this.sanitizer.bypassSecurityTrustHtml(this.rawContent())
);
```

### HTTP Security
- Always use **typed HTTP responses** — never use `any` in HTTP calls
- Use `HttpInterceptor` to attach auth tokens — do not manually append tokens per request
- Set `withCredentials: true` only on routes that require cookie-based auth
- Validate and sanitize all query params before sending requests

### Route Guards
- Protect all authenticated routes with `CanActivateFn` guards
- Use `CanMatchFn` to lazy-load feature modules only for authorized users

```typescript
export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated() ? true : router.createUrlTree(['/login']);
};
```

### Content Security
- Do **NOT** store sensitive data (tokens, PII) in `localStorage` — prefer `HttpOnly` cookies or in-memory signals
- Do **NOT** expose API keys or secrets in frontend constants files
- Avoid using `eval()`, `Function()`, or dynamic script injection
- Use Angular's built-in XSS protection — do not disable it

### Form Security
- Always validate forms on both **client and server side**
- Use `Validators.pattern` to restrict input formats where applicable
- Sanitize file upload inputs — validate MIME type and file size before sending

### Dependency Security
- Keep all Angular and third-party packages up to date
- Run `npm audit` regularly and resolve high/critical vulnerabilities
- Avoid importing unused packages that increase attack surface

---

## 🔐 Sensitive Data Exposure

### What Counts as Sensitive Data
Sensitive data includes: auth tokens, refresh tokens, API keys, passwords, PII (names, emails, IDs), session identifiers, and any value that could identify or impersonate a user.

### Storage Rules
- Do **NOT** store sensitive data in `localStorage` or `sessionStorage` — these are accessible by any script on the page (XSS risk)
- Do **NOT** store tokens in signals or component state beyond the immediate request lifecycle
- Prefer `HttpOnly` cookies managed server-side for session tokens — the frontend should never read them directly
- If an in-memory signal must hold auth state, store only the **minimum shape** needed (e.g. `isAuthenticated: boolean`, not the raw token)

```typescript
// ✅ Correct — store only what the UI needs, never the raw token
export interface AuthState {
  isAuthenticated: boolean;
  userId: string;
  role: UserRole;
}

/** Minimal auth state — never holds raw tokens */
private readonly authState = signal<AuthState | null>(null);
```

### Environment & API Keys
- Do **NOT** put API keys, secrets, or credentials in `*.constants.ts` or any frontend file committed to source control
- Use Angular's `environment.ts` / `environment.prod.ts` only for **non-secret** config (base URLs, feature flags)
- Secrets that must reach the frontend (e.g. public Stripe key) must be clearly marked and reviewed — treat them as exceptions, not the norm

```typescript
// ✅ Correct — only non-secret config in environment files
export const environment = {
  production: true,
  apiBaseUrl: 'https://api.example.com',
};

// ❌ Wrong — never put secrets here
export const environment = {
  stripeSecretKey: 'sk_live_...',
};
```

### Logging & Error Messages
- Do **NOT** log sensitive data — no `console.log(user)`, `console.log(token)`, `console.log(response)` with raw payloads
- Do **NOT** expose raw server error messages to the UI — map them to safe, generic user-facing messages
- Error interfaces must never include raw stack traces or internal server details

```typescript
// ✅ Correct — map to a safe UI message, never expose raw error
/**
 * @private
 * @description Maps an HTTP error to a safe user-facing message
 * @param error - HttpErrorResponse from the API
 * @returns User-safe error string
 */
private toSafeError(error: HttpErrorResponse): string {
  return error.status === 404 ? 'Resource not found.' : 'Something went wrong. Please try again.';
}
```

### Data Masking in Templates
- Mask sensitive fields in the UI by default — show only what the user needs (e.g. last 4 digits of a card)
- Use a util function to mask — do **not** inline masking logic in templates

```typescript
// feature.utils.ts
/**
 * @description Masks all but the last 4 characters of a sensitive string
 * @param value - The sensitive string to mask
 * @returns Masked string
 */
export function maskSensitive(value: string): string {
  return `••••${value.slice(-4)}`;
}
```

---

## ⚡ Code Efficiency — Anti-Bloat Rules

These rules apply to **all** `.ts` files: services, utils, components, and guards.

### Reuse Before You Add
- Before writing a new function, **scan the file and shared utils** for an existing one that can be extended
- Prefer extending a util with an optional parameter over duplicating it with a slight variation
- A file with more than ~150 lines is a signal to review for extraction or consolidation

### Services — Keep Them Thin
- A service method should be **one responsibility, one return** — no branching business logic inside HTTP calls
- Do **not** chain multiple unrelated HTTP calls in one method — split them and compose at the component level if needed
- Shared transformation logic belongs in `*.utils.ts`, not inline inside service methods

```typescript
// ✅ Correct — thin service, transformation in utils
public getAll(): Observable<FeatureSummary[]> {
  return this.http.get<Feature[]>(API_ENDPOINTS.FEATURES.GET_ALL).pipe(
    map(features => features.map(toFeatureSummary))
  );
}

// ❌ Wrong — business logic bloating the service method
public getAll(): Observable<FeatureSummary[]> {
  return this.http.get<Feature[]>(API_ENDPOINTS.FEATURES.GET_ALL).pipe(
    map(features => features
      .filter(f => f.isActive)
      .map(f => ({ id: f.id, label: `${f.name} (${f.code})`, ... }))
    )
  );
}
```

### Utils — Pure, Composable, Short
- Every util function must be **pure** — no side effects, no Angular `inject()`, no HTTP calls
- If two utils share logic, extract a private helper — do **not** copy-paste
- Utils that grow beyond a single clear purpose should be split into separate named exports

### Components — Delegate, Don't Duplicate
- Components must **not** contain business logic — delegate to services and utils
- Computed signals should reference utils for transformations rather than re-implementing them inline

```typescript
// ✅ Correct — delegate to util
/** Masked card number for display */
protected readonly maskedCard = computed(() => maskSensitive(this.cardNumber()));

// ❌ Wrong — re-implementing logic inline
protected readonly maskedCard = computed(() => `••••${this.cardNumber().slice(-4)}`);
```

### Naming — Clarity Over Brevity
- Function and variable names must clearly describe **what** they do — no single-letter variables outside of loop indices
- Avoid generic names like `data`, `result`, `response`, `item` — name them after the domain concept they represent

---

## 🚦 Rate Limiting

### General Rules
- **Never** fire API calls on every keystroke or every signal change — always debounce or throttle user-triggered requests
- **Never** poll an endpoint in a tight interval without a minimum delay — use `switchMap` with a timer or WebSocket instead when real-time updates are needed
- Respect `429 Too Many Requests` responses — do **not** silently retry without a backoff strategy

### Debouncing User Input
Use `debounceTime` in reactive streams before triggering any API call:

```typescript
/**
 * @private
 * @description Initializes debounced search from input signal changes
 * @returns void
 */
private initSearch(): void {
  toObservable(this.searchQuery)
    .pipe(debounceTime(400), distinctUntilChanged())
    .subscribe(query => this.featureService.search(query));
}
```

### HTTP Interceptor — Retry with Backoff
Handle `429` responses in the HTTP interceptor using exponential backoff — do **not** scatter retry logic across services:

```typescript
export const rateLimitInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    retry({
      count: 3,
      delay: (error, attempt) => {
        if (error.status !== 429) throw error;
        return timer(Math.pow(2, attempt) * 1000);
      },
    })
  );
};
```

### Preventing Duplicate Requests
Use `switchMap` to cancel in-flight requests when a new one is triggered — never stack concurrent calls for the same resource:

```typescript
/**
 * @private
 * @description Subscribes to route param changes and fetches the corresponding feature, cancelling prior in-flight requests
 * @returns void
 */
private initParamListener(): void {
  this.route.paramMap
    .pipe(
      map(params => params.get('id') ?? ''),
      switchMap(id => this.featureService.getById(id))
    )
    .subscribe(feature => this.feature.set(feature));
}
```

### Rules Summary
- Use `debounceTime(400)` + `distinctUntilChanged()` for search/filter inputs
- Use `switchMap` to cancel stale requests — avoid `mergeMap` for single-resource fetches
- Handle `429` responses in a **single interceptor** — not inside individual services
- Use exponential backoff for retries — do **not** retry immediately
- Avoid `setInterval`-based polling — prefer `timer()` + `switchMap` or WebSockets

---

## ✅ Quick Reference Checklist

| Rule | Status |
|------|--------|
| No `any` — use `unknown` if needed | ✅ |
| No hardcoded route paths — use app-level `api-endpoints.ts` | ✅ |
| No `@HostBinding` / `@HostListener` — use `host: {}` | ✅ |
| No `*ngIf` / `*ngFor` — use native control flow | ✅ |
| No `ngClass` / `ngStyle` — use `[class]` / `[style]` | ✅ |
| No inline Tailwind in HTML — use `@apply` in SCSS | ✅ |
| No SVG in HTML — route via SVG icon file | ✅ |
| No `::ng-deep` in SCSS | ✅ |
| No hardcoded colors in SCSS | ✅ |
| No `standalone: true` in decorator | ✅ |
| No `constructor` injection — use `inject()` | ✅ |
| No `mutate()` on signals — use `set()` / `update()` | ✅ |
| No unnecessary `try/catch` or `console.log` | ✅ |
| JSDoc on all functions (with `@private`/`@description`) | ✅ |
| JSDoc on all signals, computed, and class variables | ✅ |
| Constants in constants file | ✅ |
| Interfaces in interfaces file | ✅ |
| `OnPush` change detection on all components | ✅ |
| Forms use `ReactiveFormsModule` + looped fields | ✅ |
| Services typed with interfaces — no `any` | ✅ |
| Sensitive data not stored in `localStorage` or `sessionStorage` | ✅ |
| Auth tokens never stored in signals or component state | ✅ |
| No secrets or API keys in `constants.ts` or source-controlled files | ✅ |
| No raw server errors exposed to the UI — map to safe messages | ✅ |
| No sensitive data in `console.log` or any log output | ✅ |
| Sensitive fields masked in templates via util function | ✅ |
| Auth routes protected with guards | ✅ |
| No duplicate functions — reuse or extend existing utils/services | ✅ |
| Service methods are thin — transformations live in utils | ✅ |
| Utils are pure — no side effects, no `inject()` | ✅ |
| No generic variable names (`data`, `result`, `item`) — use domain names | ✅ |
| Debounce user-triggered API calls — no raw keystroke requests | ✅ |
| `429` handling via interceptor with exponential backoff | ✅ |
| Use `switchMap` to cancel stale in-flight requests | ✅ |
| No `setInterval` polling — use `timer()` + `switchMap` | ✅ |
