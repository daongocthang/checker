# Let's set up an Express.js app with ES6

### Prerequisites

1. Initialzie a project

```sh
npm init -y
```

2. Append the below content into `package.json` , then `npm install`

```json
    "devDependencies": {
        "@babel/cli": "^7.24.7",
        "@babel/core": "^7.24.7",
        "@babel/node": "^7.24.7",
        "@babel/preset-env": "^7.24.7",
        "node-sass": "^9.0.0",
        "node-windows": "^1.0.0-beta.8",
        "nodemon": "^3.0.1"
    },
    "dependencies": {
        "babel-plugin-module-resolver": "^5.0.2",
        "cors": "^2.8.5",
        "express": "^4.19.2"
    }
```

3. Create the `.babelrc` file with the below content in the root directory

```json
{
    "presets": ["@babel/preset-env"],
    "plugins": [
        [
            "module-resolver",
            {
                "alias": {
                    "~": "./src"
                }
            }
        ]
    ],
    "ignore": ["**/public/static"]
}
```
