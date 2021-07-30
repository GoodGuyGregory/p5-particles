const particles = [];


function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // console.log(width);

    //decides on particle length
    const particleLength = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < particleLength; i++) {
        particles.push(new Particle());
    }


}

function draw() {
    background(20, 0, 0);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });

}

class Particle {
    constructor() {
        // Position
        this.pos = createVector(random(width), random(height));
        // velocity
        this.vel = createVector(random(-2, 2), random(-2, 2));
        // size
        this.size = 10;
    }

    //update movement by adding velocity 
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    draw() {
        noStroke();
        fill('rgba(255,255,255,0.8)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    // detects edges
    edges() {
        if (this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }

        if (this.pos.y < 0 || this.pos.y > width) {
            this.vel.y *= -1;
        }
    }

    //connect Edges:
    checkParticles(particle) {
        particles.forEach(particle => {
            const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

            if (d < 120) {
                //  randomized color from a list
                stroke('rgba(213, 20, 207, 0.7)');
                strokeWeight(2);
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        })
    }
}
