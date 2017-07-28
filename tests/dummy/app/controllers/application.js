import Ember from 'ember';
import * as speechSdk from 'Speech.Browser.Sdk'

const {
    computed
} = Ember

export default Ember.Controller.extend({
    subscriptionKey: '',
    hypothesis: '',
    status: '',
    phrase: '',
    recognizer: null,

    isRecording: false,
    isNotRecording: computed('isRecording', function () {
        return !this.get('isRecording')
    }),

    init() {
        this._super()

        this.set('status', 'SDK Recognizer status will appear here');
        this.set('phrase', 'Translated text will appear here');
        this.set('hypothesis', 'Hypothesis');
        this.set('response', 'Response from Cognitive Service API will return here');
        
    },

    setupRecognizer(SDK, recognitionMode, language, format, subscriptionKey) {
        var recognizerConfig = new SDK.RecognizerConfig(
            new SDK.SpeechConfig(
                new SDK.Context(
                    new SDK.OS(navigator.userAgent, "Browser", null),
                    new SDK.Device("SpeechSample", "SpeechSample", "1.0.00000"))),
            recognitionMode,    // SDK.RecognitionMode.Interactive  (Options - Interactive/Conversation/Dictation>)
            language,           // Supported laguages are specific to each recognition mode. Refer to docs.
            format);            // SDK.SpeechResultFormat.Simple (Options - Simple/Detailed)

        // Alternatively use SDK.CognitiveTokenAuthentication(fetchCallback, fetchOnExpiryCallback) for token auth
        var authentication = new SDK.CognitiveSubscriptionKeyAuthentication(subscriptionKey);

        return SDK.CreateRecognizer(recognizerConfig, authentication);
    },

    updateStatus(status) {
        this.set('status', status)
    },

    updateRecognizedHypothesis(hypothesis) {
        this.set('hypothesis', hypothesis)
    },

    updateRecognizedPhrase(phrase) {
        this.set('phrase', phrase)
    },

    onSpeechEndDetected() {
        this.set('isRecording', false)
    },

    onComplete() {
        this.set('isRecording', false)
    },

    actions: {
        submit() {
            console.log('submit')
        },

        startRecording() {
            console.log('start recording')
            const recognizer = this.setupRecognizer(speechSdk, speechSdk.RecognitionMode.Interactive, "en-US", speechSdk.SpeechResultFormat["Simple"], this.get('subscriptionKey'))
            this.set('recognizer', recognizer)
            this.set('isRecording', true)
            recognizer.Recognize((event) => {
                /*
                 Alternative syntax for typescript devs.
                 if (event instanceof SDK.RecognitionTriggeredEvent)
                */
                switch (event.Name) {
                    case "RecognitionTriggeredEvent" :
                        this.updateStatus("Initializing");
                        break;
                    case "ListeningStartedEvent" :
                        this.updateStatus("Listening");
                        break;
                    case "RecognitionStartedEvent" :
                        this.updateStatus("Listening_Recognizing");
                        break;
                    case "SpeechStartDetectedEvent" :
                        this.updateStatus("Listening_DetectedSpeech_Recognizing");
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechHypothesisEvent" :
                        this.updateRecognizedHypothesis(event.Result.Text);
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechEndDetectedEvent" :
                        this.onSpeechEndDetected();
                        this.updateStatus("Processing_Adding_Final_Touches");
                        console.log(JSON.stringify(event.Result)); // check console for other information in result
                        break;
                    case "SpeechSimplePhraseEvent" :
                        this.updateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                        break;
                    case "SpeechDetailedPhraseEvent" :
                        this.updateRecognizedPhrase(JSON.stringify(event.Result, null, 3));
                        break;
                    case "RecognitionEndedEvent" :
                        this.updateStatus("Idle");
                        this.onComplete();
                        console.log(JSON.stringify(event)); // Debug information
                        break;
                }
            })
            .On(() => {
                // The request succeeded. Nothing to do here.
            },
            (error) => {
                console.error(error);
            });
        },
        

        stopRecording() {
            const recognizer = this.get('recognizer')
            recognizer.AudioSource.TurnOff();
            this.onComplete();
        }
    }
});
