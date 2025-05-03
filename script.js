document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('textInput');
    const voiceSelect = document.getElementById('voiceSelect');
    const rateSlider = document.getElementById('rateSlider');
    const rateValue = document.getElementById('rateValue');
    const pitchSlider = document.getElementById('pitchSlider');
    const pitchValue = document.getElementById('pitchValue');
    const speakButton = document.getElementById('speakButton');
    const stopButton = document.getElementById('stopButton');

    let speech = new SpeechSynthesisUtterance();
    let voices = [];

    function populateVoiceList() {
        voices = window.speechSynthesis.getVoices();
        voiceSelect.innerHTML = '';
        voices.forEach(voice => {
            const option = document.createElement('option');
            option.textContent = `${voice.name} (${voice.lang})`;
            option.value = voice.name;
            voiceSelect.appendChild(option);
        });
    }

    
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    populateVoiceList(); // Initial population

    speakButton.addEventListener('click', () => {
        if (speechSynthesis.speaking) {
            return; 
        }
        speech.text = textInput.value;
        speech.rate = parseFloat(rateSlider.value);
        speech.pitch = parseFloat(pitchSlider.value);
        const selectedVoice = voices.find(voice => voice.name === voiceSelect.value);
        if (selectedVoice) {
            speech.voice = selectedVoice;
        }
        speechSynthesis.speak(speech);
    });

    stopButton.addEventListener('click', () => {
        speechSynthesis.cancel();
    });

    rateSlider.addEventListener('input', () => {
        rateValue.textContent = parseFloat(rateSlider.value).toFixed(1) + 'x';
    });

    pitchSlider.addEventListener('input', () => {
        pitchValue.textContent = parseFloat(pitchSlider.value).toFixed(1);
    });
});