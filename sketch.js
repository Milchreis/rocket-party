// Nick Müller
// RocketParty

let greeting = '2019';

// scale factor for size and speed, if you change the canvas size
let SCALE = 4;

let rockets = [];

function setup() {
    createCanvas(640, 200);
    noSmooth();

    textSize(10 * SCALE)
    textFont('Staatliches');
    textAlign(CENTER, CENTER);

    rockets.push(new Rocket(random(0, width, 3), -0.9, SCALE));
}

function draw() {
    
    background(30);

    checkRocketSpawn();

    // Remove rockets
    rockets = rockets.filter(rockets => rockets.timeToLive > millis());
    

    rockets.forEach(rocket => rocket.update());

    // Text
    noStroke();
    fill(255);
    text(greeting, width/2, height/2);
}

function checkRocketSpawn() {
    if(frameCount % 10 === 0) {
        rockets.push(new Rocket(random(0, width, 3), -0.9, SCALE));
    }
}