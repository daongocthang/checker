# Let's set up TypeScript with Node.js and Express

### Prerequisites

1. Initialzie a project

```sh
npm init -y
```

2. Installing TypeScript
   
```sh
npm i -D typescript @types/express @types/node
```

After installed these packages, featuring version details for each packages, as shown below:

```json
{
    "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.14.9",
        "typescript": "^5.5.3"
    }
}
```

3. Generating tsconfig.json

```sh
npx tsc --init
```

By default, the value of this option is set to the root directory. Change it to `dist`, as shown below:

```json
{
    "compilerOptions": {
        "outDir": "./dist"
    }
}
```

4. Create an Express server with a .ts extionsion

The `.ts` extension indicates a TypeScript file, and it will be compiled into JavaScript when we build the appliaction later.

5. Running TypeScript in Node with ts-node

Let's first use `npx ts-node` without installing it as a dependency.

```sh
npx ts-node src/index.ts
```

6. Watching file changes

Execute the following command to integrate `nodemon` and `ts-node` as development dependencies

```sh
npm i -D nodemon ts-node
```

After installing these dev dependencies, update the `scripts` in the `package.json` file as follows:

```json
{
    "scripts": {
        "build": "npx tsc",
        "start": "node dist/index.js",
        "dev": "nodemon src/index.ts"
    }
}
```
