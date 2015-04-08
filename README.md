A starter project for ractive-based projects, including cordova (phonegap) support.

## To Install

Quick start

```sh
> git clone https://github.com/martypdx/ractive-starter-project.git
> cd ractive-starter-project
> npm install
> gobble
```

Go to `localhost:4567` and the index.html page will be served. Go get the [LiveReload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) plugin for Chrome if you don't already have it installed. This will enable auto-refresh whenever you change
a file within the project.

There's no special utility (yet) for auto-creating new projects. Just clone (or `cp -R`), rename, and re-init git. Don't forget to update your npm `package.json`

```sh
> git clone https://github.com/martypdx/ractive-project.git
> mv ractive-starter-project your-project-name
> cd your-project-name
> rm -rf .git
> git init
> npm install
> gobble
```

## About the Build Setup

Below is a description of the build process included in this project.

If you're just interesting in using ractive with cordova and have your own build process, [just go here](#user-content-cordova).

The current build system is using [gobble](https://github.com/gobblejs/gobble) from our good friend [@Rich_Harris](https://twitter.com/Rich_Harris) ([Rich_Harris on github](github.com/Rich-Harris)).
Some of the pieces I used already have newer, shinier versions or equivalents, but the output of the process would still be the same.

### General

Everything you work on is under the `assets` directory. Currently setup for ES6.

### Ractive components

The project is set up to use Ractive components exclusively, and they're spread into separate `.html`, `.js`, and `.scss` files rather than a single file format. I've done this for two reasons:

1. I like them in separate files so you can arrange in your editor and deal with them separately. And I've found that if your components get
meaty you end up back in scroll hell.
2. You can use Sass on the component css

The combining step occurs in the `gobble/make-components.js` build step if you prefer the single file format. A file called `components.js`
is also created that allows easy globally registered by importing the file. See `js/index.js`.

The build is setup to allow you to directly import from the `js` directory. See `widget.js` and the import of `./upper-caser`.
You can also directly import npm modules, see the `fade` example also in `widget.js`.

### Entry points

`index.html` is exactly what you would think. `js/index.js` is the bundle entry point for `browserify`. In the example
file, I could have done `new Ractive.components.app()`, but for me importing it directly reads cleaner. Notice there's also
an example of globally registering a plugin, in this case the very helpful `tap` plugin (use in lieu of `on-click`).

### Sass

Under `scss` is a `main.scss` which will be compiled to `min.css`. The files in `include` are available both to `main` and to the component
`.scss` files. See `widget.scss` for an example.

### javascript

Files under `js` will get ES6 transpiled. Except for the `passthru` directory and the `vendor` directory. `vendor` files get included by being imported and then via browserify. `passthru` files end up directly under `js`.

### misc

`images` end up under `images`.

## cordova

Using ractive with cordova is extremely simple. ~~Most~~ All of what's listed here
is just general tips on how to integrate a web development project with the cordova setup.

Realize that the cycle-time to too long to do most of your development directly against the
app running on the device or an emulator, and that you will largely be using the [device emulator in chrome](https://developer.chrome.com/devtools/docs/device-mode). Thus `>gobble` live reload is your best friend.

But when you do want to run it on a device, here's how it works: when you ran `npm install`, assuming you used the default `package.json` that came with this
project, it installed the cordova cli tool. Online documentation is available [here](http://cordova.apache.org/docs/en/4.0.0//guide_cli_index.md.html#The%20Command-Line%20Interface).

The cordova command line tool is a directory hog and will delete everything else when you create the project,
so the trick is to run it from inside the project into an `app` directory that will be created _within_ this project. (It doesn't have to be `app`, it just needs to be something you match with your build target. Because it's already within a project directory, I use `app` to be consistent within the build infrastructure):

```sh
your-project> cordova create app com.example.hello HelloWorld
```

Now move into the app directory and add some platforms (see cordova cli link above for details):

```sh
your-project> cd app
your-project/app> cordova platform add ios
your-project/app> cordova platform ...whatever else you want to support...
your-project/app> cd ..
```

I have consistently found that android requires installing then opening up the tools (when it doesn't work the first time, you'll get a message with what to open up) and then enabling the rest of the pieces you need to run android.

You now have an `app` folder in your project. Go ahead and have a look at the `www` folder if you want, but
honestly it will confuse you and you should just ignore it. We will be completely replacing its contents with `gobble build`.
But seriously, here are the two things to you should know:
* cordova adds an event `document.addEventListener('deviceready', this.onDeviceReady, false);`. When/if you get into cordova
 plugins to access device functionality, you may need to use this event if your access is happening at the beginning of the
 app load.
* You might take a peek at the css and the index.html headers. Some of the is useful - but I'd use the web instead to
navigate the intricacies of html/css on mobile browsers.

Now when you build using gobble (or whatever your build process is), you target the app/www folder. __Notice I'm back in the main project directory__.
You can chain that with a call to
`cordova build` (moving into the `app` directory and back):

```sh
your-project> gobble build app/www -f && cd app && cordova build && cd ..

```

The first time you build cordova with a new platform it takes quite awhile to run, subsequent update builds are quicker.

I've not had luck with running ios from the command line, so I usually just have XCode and run from there (plus you get some
additionally error handling when something happens between the web view and the device). Start XCode, and click "Open another project..."
in lower right. Navigate and select `your-project/app/platforms/ios/HellowWorld.xcodeproj`. Once you've opened the project,
XCode will remember on subsequent reopens.

Hit the big "run" button in upper left and emulator will start. You must pay your $99/year to Apple to run on your iPhone or other apple device.

Don't ever run the Android Emulator. Period. It takes 20 minutes to start up and even then is a total cluster.
Usually plugging in an Android device via USB is all you need:

```sh
your-project> cd app
your-project/app> cordova run android
```

I've had really good success with [GapDebug](https://www.genuitec.com/intro_gapdebug/) if you need to debug whilst running on your device.
