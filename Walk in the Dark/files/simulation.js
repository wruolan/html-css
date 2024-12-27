let trafficIntro, streetAudio, leftTraffic, centerTraffic, leftAudio, centerAudio, trafficOutro;
let state = "intro";  
let spacePressed = false;
let currentTrafficTrack = "center";
let trafficInterval;
let trafficOutroPlayed = false;

function preload() {
  trafficIntro = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/traffic_intro.mp3?v=1733099589859');
  streetAudio = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/street.mp3?v=1733099616432');
  leftTraffic = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/left_traffic.mp3?v=1733099600085');
  centerTraffic = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/center_traffic.mp3?v=1733099575428');
  leftAudio = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/left.mp3?v=1733099614331');
  centerAudio = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/center.mp3?v=1733099612329');
  trafficOutro = loadSound('https://cdn.glitch.global/5f19088a-d229-4977-8b8d-1cadd35c3f08/traffic_outro.mp3?v=1733099597678');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  [trafficIntro, leftTraffic, centerTraffic, trafficOutro].forEach(sound => sound.setVolume(0.10));
  
  trafficIntro.play();

  if (state === "intro") {
    trafficIntro.onended(() => {
      trafficLoop();
      streetAudio.play();
    });
    streetAudio.onended(() => {
      state = "waitForInput";  
    });
  }
}

function draw() {
  background(0);
  if (state === "waitForInput") {
    if (keyIsPressed && key === ' ') {
      spacePressed = true;
      if (spacePressed) {
        stopTrafficLoop();
        if (currentTrafficTrack === "center") {
          centerAudio.play();
          centerAudio.onended(() => checkOutcomeState());
        } else if (currentTrafficTrack === "left") {
          leftAudio.play();
          leftAudio.onended(() => checkOutcomeState());
        }
        state = "outcome";  
      }
    }
  } else if (state === "outcome") {
    if (!trafficOutroPlayed && !leftAudio.isPlaying() && !centerAudio.isPlaying()) {
      trafficOutroPlayed = true;
      trafficOutro.play();
    }
  }
}

function trafficLoop() {
  trafficInterval = setInterval(() => {
    if (currentTrafficTrack === "center") {
      leftTraffic.stop();
      centerTraffic.play();
      centerTraffic.onended(() => {
        currentTrafficTrack = "left";
      });
    } else {
      centerTraffic.stop();
      leftTraffic.play();
      leftTraffic.onended(() => {
        currentTrafficTrack = "center";
      });
    }
  }, 1000);
}

function stopTrafficLoop() {
  clearInterval(trafficInterval);
  leftTraffic.stop();
  centerTraffic.stop();
}

function checkOutcomeState() {
  if (!leftAudio.isPlaying() && !centerAudio.isPlaying()) {
    state = "outcome";
  }
}
