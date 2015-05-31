SAILS-SEED [![Build Status](https://travis-ci.org/frostme/sails-seed.svg?branch=master)](https://travis-ci.org/frostme/sails-seed)[![Coverage Status](https://coveralls.io/repos/frostme/sails-seed/badge.svg?branch=master)](https://coveralls.io/r/frostme/sails-seed?branch=master)
==========


* * *

## Installation

```
npm install sails-seed
```
Depending on you version of sails, sails-seed is treated differently
On install, a config/seed.js is created. Here you will put your seeding data.

## Sails 0.11
For Sails 0.11 and greater there is nothing further to do. Sails-seed runs as an installable hook.

## Sails 0.10
For Sails 0.10 and previous, a file of api/hook/seed/index.js is created on installation. 
No further configuration is required, but this file is necessary for the data to seed.

## Usage
Place your seeding data in the config/seed.js file.
For exampe, for a Person model, your config/seed.js file might look like

```js
module.exports.seed = {
  person: [
    {
      firstName: 'Luke',
      lastName:  'Skywalker'
    },
    {
      firstName: 'Darth',
      lastName:  'Vader'
    }
  ]
}
```
## Configuration
### Overwrite
By default, sails-seed will overwrite the data which is present. If you would not like your
seed to overwrite, your new config/seed.js file might look like

```js
module.exports.seed = {
  person: {
    data: [
      {
        firstName: 'Luke',
        lastName:  'Skywalker'
      },
      {
        firstName: 'Darth',
        lastName:  'Vader'
      }
    ],
    overwrite: false
  }
}
```
### Unique
If you would like to seed only data that is not presetnt, you can use a unique field(s), like so

```js

module.exports.seed = {
  person: {
    data: [
      {
        firstName: 'Luke',
        lastName:  'Skywalker'
      },
      {
        firstName: 'Darth',
        lastName:  'Vader'
      }
    ],
    unique: ['lastName', 'firstName']
  }
}
```
This will only create objects that do not have the unique firstName and lastName combinations

## Author

M. Elliot Frost, CEO of [Frostware](http://www.frostwaresolutions.net)
