# ember-cli-microsoft-speech-shim

Integrate Speech-to-Text in your Ember application using Microsoft Speech API from Cognitive Services.

[Microsoft Cognitive Services](https://azure.microsoft.com/en-us/services/cognitive-services/)
Microsoft Cognitive Services let you build apps with powerful algorithms to see, hear, speak, understand and interpret our needs using natural methods of communication, with just a few lines of code

This particular addon uses the [Bing Speech API](https://azure.microsoft.com/en-us/services/cognitive-services/speech/)

It simply acts a shim to make their npm package `microsoft-speech-browser-sdk` available in your ember app as `Speech.Browser.Sdk`

Usage:
```
import * as speechSdk from 'Speech.Browser.Sdk'
```

See the dummy application for more details.

This README outlines the details of collaborating on this Ember addon.

## Installation

* `git clone <repository-url>` this repository
* `cd ember-cli-microsoft-speech-shim`
* `npm install`

## Running

* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

## Running Tests

* `npm test` (Runs `ember try:each` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).
