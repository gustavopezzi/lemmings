document.addEventListener("DOMContentLoaded", function (event) {
    /*************************************************************************/
    // global variables
    /*************************************************************************/
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var frame = 0;
    var numFrames = 15;
    var scale = (c.height / 10);
    var hCenter = (c.width / 2) - (scale / 2);
    var lastMouseMove = null;

    var blockers = [];

    var walkers = [
        new walker(Math.random() * (c.width - 30),  1),
        new walker(Math.random() * (c.width - 30), -1),
        new walker(Math.random() * (c.width - 30),  1),
        new walker(Math.random() * (c.width - 30), -1),
        new walker(Math.random() * (c.width - 30),  1)
    ];

    /*************************************************************************/
    // cga color pallete
    /*************************************************************************/
    var blk = '#000000'; // black
    var wht = '#ffffff'; // white
    var lgy = '#aaaaaa'; // light gray
    var dgy = '#555555'; // dark gray
    var yel = '#ffff55'; // yellow
    var brn = '#aa5500'; // brown
    var lrd = '#ff5555'; // light red
    var drd = '#aa0000'; // dark red
    var lgr = '#55ff55'; // light green
    var dgr = '#00aa00'; // dark green
    var lcy = '#55ffff'; // light cyan
    var dcy = '#00aaaa'; // dark cyan
    var lbu = '#5555ff'; // light blue
    var dbu = '#0000aa'; // dark blue
    var lmg = '#ff55ff'; // light magenta
    var dmg = '#aa00aa'; // dark magenta

    /*************************************************************************/
    // blocker type object constructor
    /*************************************************************************/
    function blocker(x) {
        this.x = x;
        this.frame = 0;
        this.sprite = [
            [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
            [0, 0, 3, 3, 3, 3, 3, 0, 0, 0],
            [0, 0, 3, 3, 1, 1, 1, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
            [1, 1, 1, 1, 2, 2, 1, 1, 1, 1],
            [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
            [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
            [0, 0, 0, 2, 0, 0, 2, 0, 0, 0],
            [0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
        ];
        this.animate = function() {
            switch (this.frame) {
                case 0:
                    this.sprite[0] = [0, 0, 0, 3, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 3, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 3, 3, 1, 1, 1, 0, 0, 0];
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 0, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0];
                    break;
                case 1:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 3, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 3, 3, 3, 1, 1, 0, 0, 0];
                    break;
                case 2:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 3, 3, 3, 1, 1, 0, 0, 0];
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 1, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 0, 0, 0];
                    break;
                case 3:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 0, 3, 3, 1, 1, 0, 0, 0];
                    break;
                case 4:
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 0, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0];
                    break;
                case 5:
                    break;
                case 6:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 0, 3, 1, 1, 3, 0, 0, 0];
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 1, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 0, 0, 0];
                    break;
                case 7:
                    break;
                case 8:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 3, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 3, 0, 0];
                    this.sprite[2] = [0, 0, 0, 1, 1, 1, 3, 3, 0, 0];
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 0, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0];
                    break;
                case 9:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 3, 0, 0];
                    this.sprite[2] = [0, 0, 0, 1, 1, 3, 3, 3, 0, 0];
                    break;
                case 10:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 0, 1, 1, 3, 3, 3, 0, 0];
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 1, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 0, 0, 0];
                    break;
                case 11:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 0, 1, 1, 3, 3, 0, 0, 0];
                    break;
                case 12:
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 0, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 1, 0, 0];
                    break;
                case 13:
                    break;
                case 14:
                    this.sprite[0] = [0, 0, 0, 0, 3, 3, 0, 0, 0, 0];
                    this.sprite[1] = [0, 0, 0, 3, 3, 3, 3, 0, 0, 0];
                    this.sprite[2] = [0, 0, 0, 3, 1, 1, 3, 0, 0, 0];
                    this.sprite[8] = [0, 0, 0, 2, 0, 0, 2, 1, 0, 0];
                    this.sprite[9] = [0, 0, 1, 1, 0, 0, 1, 0, 0, 0];
                    break;
                case 15:
                    break;
            }

            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    switch (this.sprite[i][j]) {
                        case 0:
                            ctx.fillStyle = blk;
                            break;
                        case 1:
                            ctx.fillStyle = wht;
                            break;
                        case 2:
                            ctx.fillStyle = lbu;
                            break;
                        case 3:
                            ctx.fillStyle = dgr;
                            break;
                    }
                    ctx.fillRect((scale * j) + this.x, scale * i, scale, scale);
                }
            }

            if (this.frame < numFrames) {
                this.frame++;
            }
    		else if (this.frame == numFrames) {
                this.frame = 0;
            }
        };
    }

    /*************************************************************************/
    // walker type object constructor
    /*************************************************************************/
    function walker(x, dr) {
        this.frame = 0;
        this.x = x;
        this.dr = dr;
        this.sprite = [
            [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 3, 3, 0, 0, 0],
                [0, 0, 0, 3, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
            ],
            [
                // frame 1
                [0, 0, 0, 0, 3, 0, 3, 0, 0, 0],
                [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 2, 0, 1, 0, 0],
                [0, 0, 0, 0, 2, 2, 0, 1, 0, 0],
                [0, 0, 0, 2, 2, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
            ],
            [
                // frame 2
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 3, 0, 3, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
                [0, 0, 1, 1, 2, 2, 2, 0, 0, 0],
                [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
            ],
            [
                // frame 3
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 1, 3, 0, 0, 0],
                [0, 0, 0, 3, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
                [0, 0, 1, 2, 2, 2, 2, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 1, 0, 0, 0]
            ],
            [
                // frame 4
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 3, 3, 0, 0, 0],
                [0, 0, 0, 3, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 1, 2, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
            ],
            [
                // frame 5
                [0, 0, 0, 0, 3, 0, 3, 0, 0, 0],
                [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0, 1, 0, 0],
                [0, 0, 0, 0, 2, 2, 0, 1, 0, 0],
                [0, 0, 0, 2, 2, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 0, 0, 0, 0, 0]
            ],
            [
                // frame 6
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 3, 0, 3, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 3, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 2, 1, 0, 0, 0],
                [0, 0, 0, 2, 2, 2, 2, 0, 0, 0],
                [0, 0, 1, 1, 0, 0, 1, 1, 0, 0]
            ],
            [
                // frame 7
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 3, 0, 0, 0, 0],
                [0, 0, 0, 3, 3, 1, 3, 0, 0, 0],
                [0, 0, 0, 3, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 1, 2, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 1, 0, 0, 0, 0],
                [0, 0, 0, 0, 2, 2, 0, 0, 0, 0],
                [0, 0, 1, 2, 2, 2, 2, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 1, 0, 0, 0]
            ]
        ];

        this.animate = function() {
            for (var i = 0; i < 10; i++) {
                for (var j = 0; j < 10; j++) {
                    switch (this.sprite[this.frame][i][j]) {
                        case 1:
                            ctx.fillStyle = wht;
                            break;
                        case 2:
                            ctx.fillStyle = lbu;
                            break;
                        case 3:
                            ctx.fillStyle = dgr;
                            break;
                    }
                    if (this.sprite[this.frame][i][j] !== 0) {
                        var nt = Math.min(this.dr * scale * 10, 0);
                        ctx.fillRect((scale * j * this.dr) + this.x - nt, scale * i, scale, scale);
                    }
                }
            }

            if (this.frame < 7) {
                this.frame++;
            }
            else if (this.frame == 7) {
                this.frame = 0;
            }

            var sprWidth = scale * 10;

            if (this.x + this.dr * scale > 0 && this.x + this.dr * scale + sprWidth < c.width) {
                this.x += this.dr * scale;
            }
            else {
                this.dr *= -1
            }

            // check for collisions with blockers
            for (var q = 0; q < blockers.length; q++) {
                if (this.x + sprWidth + this.dr > blockers[q].x && this.x + this.dr < blockers[q].x + sprWidth) {
                    this.dr *= -1;
                }
            }
        };
    }

    /*************************************************************************/
    // create blockers when mouse is pressed
    /*************************************************************************/
    canvas.addEventListener("mousedown", function (event) {
        var canvasMouseX = event.x - c.offsetLeft;
        var collision = false;
        walkers.forEach(function (w) {
            if ((canvasMouseX > w.x - 15) && (canvasMouseX < w.x + 50)) {
                collision = true;
            }
        });
        blockers.forEach(function (b) {
            if ((canvasMouseX > b.x - 15) && (canvasMouseX < b.x + 50)) {
                collision = true;
            }
        });
        if (!collision) {
            blockers.push(new blocker(canvasMouseX - 20));
        }
    });

    /*************************************************************************/
    // create blockers when mouse is moved over the canvas
    /*************************************************************************/
    canvas.addEventListener("mousemove", checkMouseMove);
    function checkMouseMove(event) {
        if (event == null) {
            return;
        }
        var canvasMouseX = event.x - c.offsetLeft;
        var collision = false;
        walkers.forEach(function (w) {
            if ((canvasMouseX > w.x - 10) && (canvasMouseX < w.x + 50)) {
                collision = true;
            }
        });
        blockers.forEach(function (b) {
            if ((canvasMouseX > b.x - 10) && (canvasMouseX < b.x + 50)) {
                collision = true;
            }
        });
        c.style.cursor = (collision) ? "url(img/cross-red.png), auto" : "url(img/cross.png), auto";
        lastMouseMove = event;
    }

    /*************************************************************************/
    // main animation loop
    /*************************************************************************/
    setInterval(function() {
        ctx.clearRect(0, 0, c.width, c.height);
        walkers.forEach(function (walker) {
            walker.animate();
        });
        blockers.forEach(function (blocker) {
            blocker.animate();
        });
        checkMouseMove(lastMouseMove);
    }, (1000 / 15));
});