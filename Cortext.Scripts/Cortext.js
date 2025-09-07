const cortext_section = document.querySelector('.cortext-section');
const cortext_textarea = document.querySelector('.cortext-textarea');
const cortext_input = document.querySelectorAll('.cortext-input');
const cortext_input_container = document.querySelectorAll('.cortext-input-container');
const audio_record = document.querySelector('.audio-record');
const imported_file = document.querySelectorAll('.imported-file');
const analyse_button = document.querySelector('.analyse-button');
const clear_button = document.querySelector('.clear-button');
const analyse_button_span = document.querySelector('.analyse-button-span');
const magic_stick = document.querySelector('.magic-stick');
const record_image = document.querySelector('.record-image');
const blocked_input = document.querySelectorAll('.blocked-input');
const header_phrases = document.querySelector('.header-phrases');
const yellow_dot = document.querySelector('.yellow-dot');

const responsive_ratio = 0.43; 
const responsive_y_ratio = 1; 
const responsive_x_ratio = 3; 


const random_texts = [
    ["Had such high hopes, but this just wasn't what I expected.", "disappointment", 88, 188],
    ["This absolutely made my day! Perfect in every way possible!", "joy", 355, 185],
    ["Finally found exactly what I've been searching for!", "relief", 340, 488],
    ["What a pleasant surprise! Exceeded all expectations!", "surprise", 222, 530],
    ["The moment I tried it, I knew this was exactly what I needed!", "joy", 355, 185],
    ["I might fail the exam.", "nervousness", 410, 275],
    ["Wanted to love it, but it fell short of expectations.", "disappointment", 85, 188],
    ["Such a weight off my shoulders - perfect solution.", "relief", 340, 488],
    ["Wasn't expecting much, but wow - I'm completely blown away!", "surprise", 222, 530],
    ["If I fail the exam, I'll be kicked out of university", "fear", 258, 138],
];

GeneratePlaceHolders();
CreateRandomTexts();
CapitalizeInput();
window.onload = ListenToWindowSize;

function CreateRandomTexts() {
    random_texts.forEach(text => {
        const new_random_text_span = document.createElement('span');
        new_random_text_span.innerHTML = text[0];
        new_random_text_span.classList.add('random-text-span');
        header_phrases.appendChild(new_random_text_span);
    });
}
 
function CreateAnimation(responsive_ratio, responsive_y_ratio, responsive_x_ratio) {
    const random_text_spans = document.querySelectorAll('.random-text-span');
    let index = 0;
    
    setInterval(() => {
        random_text_spans.forEach(span => {span.style.color = 'rgb(100, 100, 100)';});
        random_text_spans[index].style.color = 'white';
        yellow_dot.style.top = (random_texts[index][2] * responsive_ratio + responsive_y_ratio) + 'px';
        yellow_dot.style.left = (random_texts[index][3] * responsive_ratio + responsive_x_ratio) + 'px';

        index = (index + 1) % random_texts.length;
    }, 1500);
}

function ListenToWindowSize() {
    if (window.innerWidth < 700) {
        CreateAnimation(responsive_ratio, responsive_y_ratio, responsive_x_ratio);
    }

    else {
        CreateAnimation(1, 0, 20);
    }
}

function GeneratePlaceHolders() {
    var text_index = 1;
    SlowTyping(random_texts[0][0].split(""))
    setInterval(() => {
        var random_text_letters = random_texts[text_index][0].split("");
        cortext_textarea.placeholder = "";
        SlowTyping(random_text_letters);
        text_index == random_texts.length - 1 ? text_index = 0 : text_index++;
    }, 5000);
}

function SlowTyping(random_text_letters) {
    for (var i = 0; i < random_text_letters.length; i++) {
        (function(index) {
            setTimeout(() => { cortext_textarea.placeholder += random_text_letters[index]; }, 30 * index);
        })(i);
    }
}

function CapitalizeInput() {
    cortext_textarea.oninput = function() {
        if (this.value != '') {
            cortext_input_container.forEach(container => {
                cortext_input_container.forEach
            });
        }
        this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
    };
}

function BlockUser() {
    blocked_input.forEach((input, index) => {
        input.onclick = function() {
            if (index == 0) {
                alert('This service is under maintaince, will be available shortly!');
                return;
            }
            alert('This service is not available now! Check later');
        }
    });
}

function ResetUI() {
    analyse_button_span.innerHTML = 'Analyze';
    magic_stick.classList.remove('magic-stick-active');
    analyse_button.disabled = false;
    clear_button.disabled = false;
}

function GenerateResponse(emotion, confidenceObj) {
    const emotionMap = ['Sadness', 'Joy', 'Love', 'Anger', 'Fear'];
    const emotion_reponse_container = document.createElement('div');
    const chart_container = document.createElement('div');
    const canvas = document.createElement('canvas');
    const answer_container = document.createElement('div');
    const emotion_answer_container = document.createElement('div');
    const confidence_answer_container = document.createElement('div');
    const emotion_span = document.createElement('span');
    const confidence_span = document.createElement('span');
    const emotion_answer_span = document.createElement('span');
    const confidence_answer_span = document.createElement('span');
    const confidence = Object.values(confidenceObj);

    CreateChart(confidence, canvas);

    emotion_reponse_container.classList.add('emotion-reponse-container');
    chart_container.classList.add('chart-container');
    canvas.classList.add('emotion-chart');
    answer_container.classList.add('answer-container');
    emotion_answer_container.classList.add('emotion-answer-container');
    confidence_answer_container.classList.add('confidence-answer-container');

    emotion_span.classList.add('emotion-span');
    confidence_span.classList.add('confidence-span');
    emotion_answer_span.classList.add('emotion-answer-span');
    confidence_answer_span.classList.add('confidence-answer-span');

    emotion_span.innerHTML = 'Emotion: ';
    confidence_span.innerHTML = 'Confidence: ';

    // map numeric emotion to string
    const emotionName = emotionMap[emotion] || 'Unknown';
    emotion_answer_span.innerHTML = emotionName;
    confidence_answer_span.innerHTML = `${(Math.max(...confidence) * 100).toFixed(2)}%`;

    emotion_answer_container.appendChild(emotion_span);
    emotion_answer_container.appendChild(emotion_answer_span);
    confidence_answer_container.appendChild(confidence_span);
    confidence_answer_container.appendChild(confidence_answer_span);

    answer_container.appendChild(emotion_answer_container);
    answer_container.appendChild(confidence_answer_container);
    chart_container.appendChild(canvas);

    emotion_reponse_container.appendChild(answer_container);
    emotion_reponse_container.appendChild(chart_container);

    cortext_section.appendChild(emotion_reponse_container);

    analyse_button_span.innerHTML = 'Analyze';
    magic_stick.classList.remove('magic-stick-active');
    analyse_button.disabled = false;
    clear_button.disabled = false;

    emotion_reponse_container.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
    emotion_response_index++;
}

function CreateChart(confidence, canvas) {
    const ctx = canvas.getContext('2d');
    const emotions_labels = ['Sadness', 'Joy', 'Love', 'Anger', 'Fear'];
    const confidence_values = confidence;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: emotions_labels,
            datasets: [{
                label: 'Confidence',
                data: confidence_values,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function UserState(state) {
    cortext_textarea.disabled = state;
    cortext_input.forEach(input => {
        input.disabled = state;
    });
}

function LiveRecord(state) {
    if (state == 'start') {
        record_image.src = 'Cortext.Media/Cortext.Media/live_record.png';
        record_image.classList.add('live-record');
    }
    else {
        record_image.src = 'Cortext.Media/Cortext.Media/record.png';
        record_image.classList.remove('live-record');
    }
}

function FilterText(text) {
    text = text.replace(/[^\w\s]/g, '');
    text = text.replace(/\d+/g, '');
    text = text.replace(/\s+/g, ' ').trim();
    text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return text;
}


function ClearInput() {
    cortext_textarea.value = '';
    cortext_input.forEach((input, index) => {
        input.value = '';
        imported_file[index].innerHTML = '';
    });   
}

function DragOverHandler(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function DropHandler(event, label) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    HandleFiles(files, label);
}

function OpenFileInput(input) {
    input.click();
}

function HandleFiles(files, label) {
    label.innerHTML = '';
    for (let i = 0; i < files.length; i++) {
        console.log("Selected file: " + files[i].name);
        label.innerHTML += 'Selected file: ' + files[i].name + '<br>';
    }
}

function HandleFileInputs() {
    cortext_input_container.forEach((container, index) => {
        container.ondragover = (event) => DragOverHandler(event);
        container.ondrop = (event) => DropHandler(event, imported_file[index]);
        cortext_input[index].onchange = () => HandleFiles(cortext_input[index].files, imported_file[index]);
    });
}