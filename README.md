# web-app
Web App to use the ticket721 plateform

## Status

| Name | Shield |
| :---: | :----: |
| Travis | [![Build Status](https://travis-ci.org/ticket721/web-app.svg?branch=develop)](https://travis-ci.org/ticket721/web-app) |
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/ticket721/web-app/badge.svg?branch=develop)](https://coveralls.io/github/ticket721/web-app?branch=develop) |

## Env

| Variable | Definition |
| :------: | :--------: |
| `T721_GOOGLE_API_KEY` | Api key used for google maps |
| `strapi_endpoint` | URL of the strapi server |

## Tasks

## Module Update Procedure

When adding or editing a module, the following files should be checked:

* `minters.json`, the I18N configuration
* `MinterSelectionForm/ignore.ts`, Ignored Modules
* `BuildArgumentForm/overrides.ts`, Build Argument Processors
* `MinterCategoriesGetter.ts`, used to retrieve ticket categories
* `MintingController.ts`, used to properly call the mint method
* `EventCreationSummary/MinterDescription.ts`, Used to pretty print a concise decription of the minting process


