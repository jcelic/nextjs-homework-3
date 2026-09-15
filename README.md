# Task App

Jednostavna Next.js Todo aplikacija.

## Tehnologije

- Next.js
- TypeScript
- Tailwind CSS
- TanStack Query
- Zustand
- MockAPI

## Funkcionalnosti

- dohvat zadataka s API-ja
- dodavanje i uređivanje zadataka
- označavanje zadataka kao dovršenih
- optimistic update za dodavanje zadataka
- light/dark tema pomoću Zustanda

## Profiler

Pri usporedbi rezultata u React Profileru nije zabilježena značajna razlika prije i poslije ručne memoizacije. Profiler je pokazao da je `TaskItem` već automatski memoiziran pomoću React Compilera (`This component has been auto-memoized by the React Compiler`).

Zbog toga je React već prije dodavanja React.memo izbjegavao nepotrebna renderiranja, pa ručna memoizacija nije donijela značajnu dodatnu promjenu.
