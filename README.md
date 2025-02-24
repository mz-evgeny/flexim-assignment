# flexim-assignment

Test task for Flexim

## Pre requirements

- `node.js`: `22.*`
- `yarn`: `4.6.*` [documentation](https://yarnpkg.com/getting-started/install)
- `mongoDB`: `7.*`

## Development

1. install `node`, `yarn`, `mongoDB`
2. run `yarn install`
3. run `yarn workspaces foreach -A run build`
4. run `yarn packages/be-db db:migrate up`
5. run packages:
   - `yarn packages/be-db db:start`
   - `yarn packages/be-api start`
   - `yarn packages/fe-web watch`
6. open [url](http://localhost:3000)
