let emotion_response_index = 0;

audio_record.onclick = RecordAudio;
analyse_button.onclick = AnalyseInput;
clear_button.onclick = ClearInput;
HandleFileInputs();
BlockUser();

const randomConfidence = Array.from({ length: 5 }, () => Math.floor(Math.random() * 101));

GenerateResponse('joy', randomConfidence)

function AnalyseInput() {
    const textInput = cortext_textarea.value.trim();
    const textFile = cortext_input[0].files.length > 0 ? cortext_input[0].files[0] : null;

    const inputsProvided = [!!textInput, !!textFile].filter(Boolean);
    if (inputsProvided.length > 1) {
        alert('Only one input type is allowed at a time. Please clear other inputs and try again.');
        return;
    }

    if (textInput) {
        let text = textInput.toLowerCase();
        text = FilterText(text);

        if (text === '') {
            alert('Text is invalid! Please try inserting valid text.');
            return;
        }

        analyse_button_span.innerHTML = 'Analyzing...';
        magic_stick.classList.add('magic-stick-active');
        analyse_button.disabled = true;
        clear_button.disabled = true;

        SendPrompt(text);
    }

    else if (textFile) {
        const reader = new FileReader();
        reader.onload = function (event) {
            let text = event.target.result.toLowerCase();
            text = FilterText(text);

            if (text === '') {
                alert('The text file is invalid or empty. Please upload a valid file.');
                return;
            }

            console.log(text);
            analyse_button_span.innerHTML = 'Analyzing...';
            magic_stick.classList.add('magic-stick-active');
            analyse_button.disabled = true;
            clear_button.disabled = true;

            SendPrompt(text);
        };
        reader.readAsText(textFile);
    }

    else {
        alert('No input provided. Please enter text, record audio, or upload a file to analyze.');
    }
}

function SendPrompt(text) {
    fetch('http://localhost:3000', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify({ text }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('emotion is:' + data.emotion);
            GenerateResponse(data.emotion, data.confidence);
        }

        else {
            console.error('Error:', error);
            alert('There was an error processing your text! Please try again.');
            ResetUI();
        }
    })
    .catch(err => {
        console.error('Error:', err);
        alert('There was an error with the server! Please try again.');
        ResetUI();
    });
}

function RecordAudio() {
    if (cortext_textarea.value != '' || cortext_input[0].files.length != 0) {
        alert('Remove other inputs if you want to start recording!');
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true })
    .then((userStream) => {
        stream = userStream;
        console.log("Microphone access granted");

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            UserState(true);
            LiveRecord('start');
            recognition = new SpeechRecognition();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;

            recognition.start();

            recognition.onresult = (event) => {
                const text = event.results[event.resultIndex][0].transcript.toLowerCase();
                FilterText(text);
                SendPrompt(text);
                UserState(false);
                LiveRecord('end');
                cortext_textarea.value = text;

                recognition.stop();
                stream.getTracks().forEach(track => track.stop());
            };

            recognition.onerror = (event) => {
                console.error("Speech Recognition Error:", event.error);
                UserState(false);
                LiveRecord('end');
            };

            recognition.onend = () => {
                UserState(false);
                LiveRecord('end');
            };

        } else {
            console.log("Speech Recognition is not supported in this browser.");
        }

    })
    .catch((error) => {
        if (error == 'NotAllowedError: Permission denied' || error == 'Recognition Error: not-allowed') {
            AlertUser(error);
            return;
        }
        console.error("Error accessing the microphone:", error);
    });
}