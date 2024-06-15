## How to setup a new Typescript + Express Project

```
npm init -y
```
```
npm i -D typescript
```
```
npx tsc --init -> creates tsconfig.json
```
```
npm i concurrently
```
```
Add the following to package.json:
 "scripts": {
    "build": "npx tsc",
    "watch": "npx tsc -w",
    "prestart": "npm run build",
    "start": "npx nodemon dist",
    "dev": "npx concurrently --kill-others \"npm run watch\" \"npm start\""
  }
```
```
npm run dev
```