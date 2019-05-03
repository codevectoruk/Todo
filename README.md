# Todo

This project was spawned from the requirement for a to do list application that did not connect to any external services and upload the contents of the list. By utilising the browsers local storage to store the list in a json format that javascript code has access to it feels like a 'online' application. Inspiration for the theming of the application is taken from Trello.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Access Live Version

If you just want to use the application the easiest way is to go to the github pages link to this repository.

[https://ed-wright.github.io/Todo/](https://ed-wright.github.io/Todo/)

### Building the Application Yourself

This application is currently built using the following:

- Windows 10 PC (10.0.17134)
- Atom
- Prepros

The only requirement is that Prepros is installed. The Prepros config file is included in the repository when you clone. There are two folder that are important.

- /dist
- /src

Files that Prepros interacts with are located in the /src directory, any other files are located in the /dist folder. An example is index.html, this lives in /dist as Prepros does not compile it. For styling edit the files contained within /src/scss/. For script changes edit the files contained within /src/js/.

## Deployment

The /dist folder contains everything that you require for deployment. Just put the files onto a web server or just a folder and run index.html.

## Built With

- [Atom (1.36.0)](https://atom.io/) - IDE
- [Prepros (6.3.0)](https://prepros.io/) - Used to compile SCSS and JS
- [jQuery (3.4.0)](https://jquery.com/) - JS Library
- [Autosize (4.0.2)](http://www.jacklmoore.com/autosize/) - Textarea resize JS library
- [Font Awesome (5.8.1)](https://fontawesome.com/) - Icon Library
- [tail.DateTime (0.4.9)](https://github.com/pytesNET/tail.DateTime) - Date Picker JS Library
- [Marked (0.6.2)](https://github.com/markedjs/marked/) - Markdown to HTML Converter

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Versioning

We use [SemVer](http://semver.org/) for versioning.
