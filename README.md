A starter project for ractive-based projects, including cordova (phonegap) support.

## To Install

Quick start

```sh
> git clone https://github.com/martypdx/ractive-project.git
> cd ractive-project
> npm install
> gobble
```

Go to `localhost:4567`

There's no special utility (yet) for auto-creating new projects. Just clone (or `cp -R`), rename, and re-init git. Don't forget to update your npm `package.json`

```sh
> git clone https://github.com/martypdx/ractive-project.git
> mv ractive-project your-project-name
> cd your-project-name
> rm -rf .git
> git init
> npm install
> gobble
```

## Still to do

* stylus instead of sass
* adding cordova
* incorporate ractive plugins
* inheriting components
* css preprocessor include folder
