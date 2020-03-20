$(document).ready(function () {
    var windowHeight = $(window).height();

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function Pipe() {
        this.pipeId = null;
        this.pipeSize = null;
        this.leftOffset = null;
        this.movementRatio = null;
        this.flip = false;
        this.addPipe = function () {
            var _newPipe = document.createElement('img');
            _newPipe.src = 'assets/pipe.png';
            _newPipe.id = this.pipeId;
            _newPipe.style.height = this.pipeSize + 'px';
            _newPipe.style.left = this.leftOffset + 'px';

            if (this.flip) {
                _newPipe.style.top = 0;
                _newPipe.style.transform = 'rotate(180deg)';
            } else {
                _newPipe.style.top = windowHeight - this.pipeSize + 'px';
            }

            document.body.appendChild(_newPipe);
        };
        this.moveLeft = function (scrollDistance) {
            document.getElementById(this.pipeId).style.left = this.leftOffset - scrollDistance / this.movementRatio + 'px';
        };
        this.init = function (flip) {
            this.pipeId = 'pipe_' + getRandomInt(0, 12345);
            this.pipeSize = getRandomInt(100, 500);
            this.movementRatio = this.pipeSize / 10;
            this.leftOffset = getRandomInt(200, 2000);
            this.flip = (flip === true);
            this.addPipe();
        };
    }

    function Bird() {
        this.birdId = null; // bird_XXXX
        this.birdSize = null; // integer
        this.movementRatio = null; // to be divided from scrolling pixels
        this.topOffset = null;
        this.bounceRate = null;
        this.addBird = function () {
            var _newBird = document.createElement('img');

            _newBird.src = 'assets/bird.png';
            _newBird.className = 'bird';
            _newBird.id = this.birdId;

            _newBird.style.width = this.birdSize + 'px';
            _newBird.style.left = this.birdSize + 'px';
            _newBird.style.top = this.topOffset + '%';
            _newBird.style.filter = 'hue-rotate(' + getRandomInt(0, 270) + 'deg)';

            document.body.appendChild(_newBird);
        };
        this.fly = function (scrollDistance) {
            document.getElementById(this.birdId).style.left = this.birdSize + scrollDistance / this.movementRatio + 'px';

            if (!$('#' + this.birdId).is(':animated')) {
                $('#' + this.birdId).animate({ 'top': '+=100px' }, this.bounceRate).animate({ 'top': '-=100px' }, this.bounceRate);
            }
        };
        this.init = function () {
            this.topOffset = getRandomInt(10, 70);
            this.movementRatio = getRandomInt(10, 50);
            this.birdId = 'bird_' + getRandomInt(0, 12345);
            this.birdSize = getRandomInt(10, 500); // 500px
            this.bounceRate = getRandomInt(100, 300);
            this.addBird();
        };
    }

    function renderElements() {
        window.birds = [];
        window.pipes = [];
        window.flippedPipes = [];

        for (var i = 0; i < 10; i++) {
            window.birds[i] = new Bird();
            window.birds[i].init();
        }

        for (var i = 0; i < 10; i++) {
            window.pipes[i] = new Pipe();
            window.pipes[i].init();
        }

        for (var i = 0; i < 10; i++) {
            window.flippedPipes[i] = new Pipe();
            window.flippedPipes[i].init(true);
        }
    }

    renderElements();

    $(window).scroll(function (event) {
        var offset = $(window).scrollTop();
        // $(window).scrollTop gives you the distance
        // to the top of the page
        var imgX = offset / 50;

        for (var i = 0; i < window.birds.length; i++) {
            window.birds[i].fly(offset);
        }

        for (var i = 0; i < window.pipes.length; i++) {
            window.pipes[i].moveLeft(offset);
        }

        for (var i = 0; i < window.flippedPipes.length; i++) {
            window.flippedPipes[i].moveLeft(offset);
        }

        console.log(imgX);
        // move these elements sideway
        $('#background').css('background-position', imgX + 'px 0px');
    });
});