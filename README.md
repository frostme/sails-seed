SAILS-SEED [![Build Status](https://travis-ci.org/frostme/sails-seed.svg?branch=master)](https://travis-ci.org/frostme/sails-seed)[![Coverage Status](https://coveralls.io/repos/frostme/sails-seed/badge.svg?branch=master)](https://coveralls.io/r/frostme/sails-seed?branch=master)
==========


* * *

## Installation

```
npm install sails-seed
```
Depending on you version of sails, sails-seed is treated differently
On install, a config/seeds.js is created. Here you will put your seeding data.

## Sails 0.11
For Sails 0.11 and greater there is nothing further to do. Sails-seed runs as an installable hook.

## Sails 0.10
For Sails 0.10 and previous, a file of api/hook/seed/index.js is created on installation.
No further configuration is required, but this file is necessary for the data to seed.

## Usage
Place your seeding data in the config/seeds.js file.
For exampe, for a Person model, your config/seeds.js file might look like

```js
module.exports.seeds = {
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
By default, sails-seed will not overwrite the data which is present. If you would not like your
seed to overwrite, your new config/seeds.js file might look like

```js
module.exports.seeds = {
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

module.exports.seeds = {
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
Given an overwrite true option, sails-seed will only overwrite items which match the unique 
requirements.

### Disable

If you would like disable the seed hook (say for testing purposes)  simply add the following config option
```js

module.exports.seeds = {
  disable: true,
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


### Active

If you would like to disable per model, you can add an active option. Like so will disable the person seeding
```js

module.exports.seeds = {
  person: {
    active: false,
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

### Configuration

You may also set configurations (say for testing) via the sails pipeline. Just make sure that
you have set the configurations you wish you have before the _hook:moduleloader:loaded_ event.
This way you wouldn't have to change your configuration for testing in the code, and could
have the test configuration.
## Author

M. Elliot Frost, CEO of [Frostware](http://www.frostwaresolutions.net)
