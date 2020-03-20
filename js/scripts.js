$(document).ready(function () {

    var windowHeight = $(window).height(); //to get height of window

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeBird() {
        return { // return to objects addBird:function & init:function as properties

            birdId: null,//create a new property, empty until id given
            birdSize: null, // integer
            movementRatio: null, // to be divided from scrolling pixels
            topOffset: null,
            bounceRate: null,

            addBird: function () {
                var _newBird = document.createElement('img');

                _newBird.src = 'assets/bird.png';
                _newBird.className = 'bird';
                _newBird.id = this.birdId;

                _newBird.style.width = this.birdSize + 'px';
                _newBird.style.left = this.birdSize + 'px';
                _newBird.style.top = this.topOffset + '%';
                _newBird.style.filter = 'hue-rotate(' + getRandomInt(0, 270) + 'deg)';

                document.body.appendChild(_newBird); // create a new bird in body
            },

            fly: function (scrollDistance) {
                document.getElementById(this.birdId).style.left = this.birdSize + scrollDistance / this.movementRatio + 'px';

                if (!$('#' + this.birdId).is(':animated')) {
                    $('#' + this.birdId).animate({ 'top': '+=100px' }, this.bounceRate).animate({ 'top': '-=100px' }, this.bounceRate);
                }
            },

            init: function () {
                this.topOffset = getRandomInt(10, 70);
                this.movementRatio = getRandomInt(10, 50);
                this.birdId = 'bird_' + getRandomInt(0, 12345);
                this.birdSize = getRandomInt(10, 500);
                this.bounceRate = getRandomInt(100, 500);
                this.addBird(); // to execute document.body.appendChild(_newBird);
            }
        };
    }

    function makePipe() {
        return {

            pipeId: null,//create a new property and empty until id given
            pipeSize: null, // integer
            movementRatio: null, // to be divided from scrolling pixels
            leftOffset: null,
            flip: false,

            addPipe: function () {
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
            },

            moveLeft: function (scrollDistance) {
                document.getElementById(this.pipeId).style.left = this.leftOffset - scrollDistance / this.movementRatio + 'px';
            },

            init: function (flip) {
                this.pipeId = 'pipe_' + getRandomInt(0, 12345);
                this.pipeSize = getRandomInt(100, 500);
                this.movementRatio = this.pipeSize / 10;
                this.leftOffset = getRandomInt(200, 2000);
                this.flip = (flip === true);
                this.addPipe();
            },
        };
    }

    function renderElements() {
        window.birds = [];
        window.pipes = [];
        window.flippedPipes = [];

        for (var i = 0; i < 10; i++) {
            window.birds[i] = makeBird();
            window.birds[i].init();
        }

        for (var i = 0; i < 10; i++) {
            window.pipes[i] = makePipe();
            window.pipes[i].init();
        }

        for (var i = 0; i < 10; i++) {
            window.flippedPipes[i] = makePipe();
            window.flippedPipes[i].init(true);
        }
    }

    renderElements();

    //$('#pipe').css('top, $(window).height()-$('#pipe').height() + 'px');
    $(window).scroll(function (event) {
        var offset = $(window).scrollTop(); //how far from the right of the browser

        // $(window).scrollTop gives you the distance to the top of the page
        var imgX = offset / 50;
        //var pipeX = offset / 20;
        //var birdX = offset / 10;

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