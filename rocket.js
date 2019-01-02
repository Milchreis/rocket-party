class Particle {

    constructor(x, y, color, weight) {
        this.position = createVector(x, y);
        this.velocity = createVector(random(-0.5, 0.5), random(-0.5, 0.5));
        this.acceleration = createVector(0, 0);
        this.gravity = createVector(0, 0.01);
        this.color = color;
        this.alpha = 255;
        this.fadeRate = 3;
        this.size = 1 * weight;
    }

    update() {
        this.acceleration.add(this.gravity);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        noStroke();
        fill(red(this.color), green(this.color), blue(this.color), this.alpha);
        ellipse(this.position.x, this.position.y, this.size, this.size);

        this.alpha -= this.fadeRate;
    }
}

class Emitter {

    constructor(x, y, color, weight) {
        this.position = createVector(x, y);
        this.color = color;
        this.amount = 10;
        this.weight = weight;

        this.particles = [];

        for(let i=0; i<this.amount; i++) {
            let particle = new Particle(this.position.x, this.position.y, this.color, this.weight);
            this.particles.push(particle);
        }
    }

    update() {
        this.particles.forEach(particale => particale.update());
    }
}

class Rocket {

    constructor(x, velocity, scaleFactor) {

        this.position = createVector(x || random(0, width), height);
        this.velocity = createVector(0, velocity*scaleFactor);
        this.length = 10;
        this.weight = scaleFactor;

        this.timeToExplode = random(500, 1000);
        this.timeToLive = millis() + (2000*scaleFactor);
        this.color = color(random(0, 255), random(0, 255), random(0, 255), 255);
        this.bornTime = millis();
    }

    update() {

        if(millis() < this.bornTime + this.timeToExplode) {
            this.position.add(this.velocity);
            stroke(this.color);
            strokeWeight(this.weight);
            line(this.position.x, this.position.y, this.position.x, this.position.y + this.length);

        } else {
            if(!this.emitter) {
                this.emitter = new Emitter(this.position.x, this.position.y, this.color, this.weight);
            }

            this.emitter.update();
        }
    }
}