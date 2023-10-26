  <h1 align="center">GIT VISUALIZER</h1>
<p align="center">
  <img src="src/assets/icons/git.png" width="200" alt="Git Visualizer Logo Logo" />
</p>

# Git Visualizer UI 1.0

In this first version of this web application, provides a graphical representation of its own repositories, front-end and back-end.

## Description

This is a web application that provides a graphical representation of its own repository's commit history and changes over time, as well as, its API repository's commits.

## API urls

(local): http://localhost:4200/home <br />
(production): ... <br />

## 📒Dependencies

**Node.js** version 18 or above

Download and install node.js in your computer using the following page [Node official page](https://nodejs.org/en).

**Angular** version 16 or above

Install Angular CLI. Use this provided documentation [Angular Docs](https://angular.io/docs).

```
npm install -g @angular/cli
```

## 📝Running the app

**_1. Clone the repository_**

**Using HTTPS**

```
git clone https://github.com/CarlosCSZ/Git_Visualizer_ui.git
```

**Using SSH KEY**<br />
-Create and add ssh key in your computer.<br />
-Attach your public ssh key into your GitHub account and write the following command.<br />

```
git clone git@github.com:CarlosCSZ/Git_Visualizer_ui.git
```

<br />**_2. Install dependencies_**<br />

```bash
$ npm install
```

<br />**_3. Configure the environment variables_**

**From the root directory go to the following path: src/app/environments/. Then, open the environment.ts file.**
<br />The default local settings are:<br />
API_URL: 'http://localhost:3001/api'<br />
FRONT_REPO: 'Git_Visualizer_ui'<br />
BACK_REPO: 'Git_Visualizer_api'<br />

--In case you set the API to listen in a different PORT than 3001, then change the API_URL variable as needed. Adittionally, if you set the API for pulling commits from a different GitHub User you may want to change the repos variables as needed:--<br />
FRONT_REPO: as the repo's name you want to pull information from<br />
BACK_REPO: as the repo's name you want to pull information from<br />

<br />**_4. Start the APP_**

**From the root directory**

```
 $ npm run start
```

The app will be running at the following url http://localhost:4200/

## Test

```bash
# unit tests
$ npm run test
```
