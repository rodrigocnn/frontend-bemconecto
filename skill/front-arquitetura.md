# Front Architecture and Naming - sessio-front

## Objetivo
Este guia define a arquitetura e as convenções de nomenclatura observadas no projeto `sessio-front`, para manter consistência em novas features.

## Stack e Base
- Framework: Next.js 15 com router em `src/pages`
- UI: React 19 + TypeScript
- Estilo: TailwindCSS (preferencial), MUI para DataGrid
- Estado servidor: React Query
- Cliente HTTP central: `src/shared/api/client.ts`
- Testes: Jest + Testing Library

## Arquitetura (FSD na prática)
O projeto segue Feature-Sliced Design com separação por responsabilidade:

- `src/pages`: composição de páginas e rotas
- `src/features`: regras por domínio/feature
- `src/entities`: tipos de entidades de negócio
- `src/widgets`: blocos compostos de UI/layout
- `src/shared`: infraestrutura comum (api, libs, ui, assets)

### Estrutura padrão por feature
Cada feature tende a usar esta organização:

- `api/`: funções HTTP da feature
- `model/`: hooks, estados, query keys, casos de uso
- `ui/`: componentes da feature
- `lib/`: validações, mapeadores e utilidades locais
- `test/`: mocks e suporte de testes

Exemplos reais:
- `src/features/patients/api/index.ts`
- `src/features/patients/model/create/useCreatePatient.ts`
- `src/features/patients/model/use-case/usePatientFormUseCase.ts`
- `src/features/patients/ui/FormPatient.tsx`
- `src/features/patients/lib/mappers.ts`

## Convenções de nomenclatura

### 1) Hooks
Usar prefixo `use` com intenção clara:

- CRUD/query: `useCreateX`, `useUpdateX`, `useDeleteX`, `useFindAllX`, `useFindX`
- Form/state: `useXFormState`, `useXModalState`
- Regras de negócio: `useXUseCase`
- Datagrid: `useXColumnsDatagrid`

Exemplos:
- `useFindAllPatients`
- `usePatientFormState`
- `useSessionFormUseCase`
- `useAppointmentModalState`

### 2) Arquivos de API
Manter endpoints da feature em `api/index.ts`.
Consumidores (hooks/model) chamam funções desse módulo, nunca axios/fetch direto em componente.

Exemplos:
- `src/features/sessions/api/index.ts`
- `src/features/dashboard/api/index.ts`

### 3) Tipos
- Tipos de domínio em `src/entities/<entidade>/types.ts`
- Tipos específicos de feature em `src/features/<feature>/model/types.ts` ou `shared/types.ts`
- Tipos de contrato HTTP compartilhados em `src/shared/api/types.ts`

### 4) UI Components
Componentes de interface usam PascalCase:

- Formulários: `FormPatient.tsx`, `SessionForm.tsx`
- Tabelas/colunas: `CellsPatientsCustom.tsx`, `columns.tsx`
- Layouts: `LayoutAdmin.tsx`, `LayoutSite.tsx`, `LayoutLogin.tsx`

### 5) Testes
- Nomear como `*.test.tsx` próximo ao código de model/ui crítico
- Mocks locais em `test/mocks.ts` da própria feature quando aplicável

Exemplos:
- `useCreatePatient.test.tsx`
- `useSessionFormUseCase.test.tsx`
- `src/features/sessions/test/mocks.ts`

### 6) Rotas Next.js
- Páginas usam `default export`
- Rotas por pasta em `src/pages`
- Parâmetros dinâmicos em colchetes: `[id].tsx`

Exemplos:
- `src/pages/admin/pacientes/editar/[id].tsx`
- `src/pages/admin/pacientes/sessoes/criar/[id].tsx`

## Regras de implementação
- Não chamar `fetch/axios` em componentes
- Centralizar HTTP no client compartilhado
- Desembrulhar `ApiResponse` dentro de hooks/model
- Separar responsabilidades de hooks (estado, regra, transformação, UI behavior)
- Evitar `console.log` no código final
- Preferir named exports (exceto páginas Next)

## Checklist rápido para novas features
1. Criar pasta `src/features/<feature>` com `api`, `model`, `ui` e `lib` quando necessário.
2. Definir query keys em `model/queryKeys.ts` (ou `model/shared/queryKeys.ts`).
3. Implementar hooks de dados no `model` usando React Query.
4. Colocar tipos de domínio em `entities` e tipos locais em `feature/model`.
5. Cobrir hooks críticos com `*.test.tsx` e mocks de API.
6. Integrar em página/widget sem quebrar o boundary de camadas.

## Observações da engenharia reversa
- O projeto está consistente com FSD em `features`, `entities`, `widgets` e `shared`.
- Existe mistura de idiomas em nomes de rotas/pastas (`patients` e `pacientes`); para novos módulos, manter padrão único por domínio para evitar ambiguidade.
- Há variação entre nomes como `show` e `find-one`; em código novo, preferir um vocabulário único por feature para reduzir carga cognitiva.
