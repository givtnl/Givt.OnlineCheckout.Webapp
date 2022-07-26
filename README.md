# GivtOnlineCheckout

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5.

## Building docker image
The docker image runs on top of nginx, which comes with a config file in `/docker/default.conf`. One particular rule rewrites [url]/result to [url]/#/result so that Stripe can work with the retun url (doesn't work for development server).

1. First build the angular project: `ng build`
2. Then build the dockerfile: `docker build -t onlinecheckout-webapp .`
3. Run it: `docker run -p 80:80 onlinecheckout-webapp`
4. Access via: `http://localhost:4200/#/?code=[some_existing_code]`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/#/?code=[some_existing_code]`. The app will automatically reload if you change any of the source files. This will take the `/src/environments/environment.local.ts` config file. Running the local setup will not allow you to test the Stripe return url, because of the hashtag that stripe interprets as page location.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
