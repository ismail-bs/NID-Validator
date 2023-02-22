# NID Validator Backend

NID Validator API Server
## Getting started

### Requirements

Make sure your workstation has at least these elements before beginning:

- An up-to-date release of [`NodeJS`](https://nodejs.org/) (use the LTS version)
- [`NPM`](https://www.npmjs.com/) or [`YARN`](https://yarnpkg.com/)
- A database such as [`MongoDB`](https://www.mongodb.com/).
- [`Git`](https://git-scm.com/)

### Project configuration

Clone the repository to your local workstation to get started. Run the following command on your terminal by using that command:
``` sh
git clone https://github.com/ismail0946/NID-Validator my-project
```
The next thing will be to install all the dependencies of the project.

```sh
cd ./my-project
npm install
or 
yarn
```

After installing the dependencies, you can now configure your project by creating a new.env file with your development environment variables. Fill out your environment variables by copying the.env.example file to.env.

```
cp .env.example .env
```

### Launch and discover

You can now use the command below to launch the NestJS application.

```sh
# development mode
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

Open `http://localhost:3001/api` with your browser to see api live.

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e
```

### Connect to MongoDB

Before you can connect to MongoDB, you must first install it on your local computer. You can install MongoDB by following the steps below.

- For the Installation process in [`Windows`](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/) or you can try [`Geeksforgeeks`](https://www.geeksforgeeks.org/how-to-install-mongodb-on-windows/)
- For the Installation process in [`Ubuntu`](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/) or you can try [`Geeksforgeeks`](https://www.geeksforgeeks.org/how-to-install-and-configure-mongodb-in-ubuntu/)
- For the Installation process in [`Mac`](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/) or you can try [`Geeksforgeeks`](https://www.geeksforgeeks.org/how-to-install-mongodb-on-macos/)

MongoDB default configuration -> the hostname is **`localhost`**, and the port is **`27017`**.


### Techstack included
- [NestJS](https://nextjs.org/docs) - A progressive Node.js framework.
- [TypeScript](https://www.typescriptlang.org/docs/handbook/intro.html) - The TypeScript Handbook.