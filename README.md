# Editor

This is an experimental basic WYSIWYG editor
web application and api service built with SolidJS and Hono.

> NOTE!
>
> This is a monorepo project orchastrated with `pnpm`.

This project is organized into the following directories:
- `apps`: This folder containing the web application and api service.
- `packages`: This folder containing the shared packages.

## Requirements

| | Version |
|---|---|
| Node | `>= 22.*` |
| pnpm | `>= 10.*` |

## Setup

1. `pnpm install` : Install all dependencies. (This will also generate necessary ORM types)
2. `pnpm db:push` : Push the database schema to the database.

## Development

- `pnpm dev:web` : Start the web application development server.
- `pnpm dev:api` : Start the api service development server.

## Philosophy

This project heavily relies on `eslint` as a **linter** and also as a **formatter**.

It might seems tedious without `prettier` at first but formatting with `eslint`
will ensure that the code is consistent and readable.

No more unnecessary force formatting just because the code is
over 80 characters limit from `prettier`.

This is achieved by relying on `@antfu/eslint-config` which provides a set of rules
and configurations with stylistics enabled.
