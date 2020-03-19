$(document).ready(function () {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function makeBird() {
        return { // return to objects addBird:function & init:function as properties

            birdId: null,//create a new property and empty until id given
            birdSize: null, // integer
            movementRatio: null, // to be divided from scrolling pixels
            topOffset: null,
            addBird: function () {
                var _newBird = document.createElement('img');

                _newBird.src = 'assets/bird.png';
                _newBird.className = 'bird';
                _newBird.id = this.birdId;

                _newBird.style.width = this.birdSize + 'px';
                _newBird.style.left = this.birdSize + 'px';
                _newBird.style.top = this.topOffset + '%';
                _newBird.style.filter = 'hue-rotate(' + getRandomInt(0, 270) + 'deg)';

                // _newBird.id = 'bird'; //styling with #bird
                document.body.appendChild(_newBird);
            },

            fly: function (scrollDistance) {
                document.getElementById(this.birdId).style.left = this.birdSize + scrollDistance / this.movementRatio + 'px';
            },

            init: function () {// need to create document.body.appendChild(_newBird);
                this.topOffset = getRandomInt(10, 70);
                this.movementRatio = getRandomInt(10, 50);
                this.birdId = 'bird_' + getRandomInt(0, 12345);
                this.birdSize = getRandomInt(0, 500) + 'px';
                this.addBird();
            }
        };
    }

    var bird1 = makeBird(), //bird1 = "object"{addBird:function(){}, init: function(){}}
        bird2 = makeBird(),
        bird3 = makeBird(),
        bird4 = makeBird();

    bird1.init(); //bird1.addBird()cannot be used because addBird() contains more than one function
    bird2.init();
    bird3.init();
    bird4.init();

    //$('#pipe').css('top, $(window).height()-$('#pipe').height() + 'px');
    $(window).scroll(function (event) {
        var offset = $(window).scrollTop(); //how far from the right of the browser

        // $(window).scrollTop gives you the distance to the top of the page
        var imgX = offset / 50;
        var pipeX = offset / 20;
        var birdX = offset / 10;

        console.log(imgX);
        // move these elements sideway
        $('#background').css('background-position', imgX + 'px 0px');
        //$('#bird').css('left', birdX);
        $('#pipe').css('left', pipeX);
        bird1.fly(offset);
        bird2.fly(offset);
        bird3.fly(offset);
        bird4.fly(offset);

        $(document).on('click', flyUp);

        function flyDown() {
            $('#bird').attr('style', 'transform: rotate(45deg)');
            $('#bird').animate({ 'top': "+=100px" }, 500);
        }

        function flyUp() {
            $('#bird').animate({ 'top': "-=100px" }, 500);
            flyDown();
        }

        /* setInterval(function () {
            $('#bird').animate({ 'top': "-=100px" }, 500);
            $('#bird').css('transform', 'rotate(' + 45 + 'deg)');
            $('#bird').animate({ 'top': "+=100px" }, 500);
        }, 1100); */


    });

    /* console.log(event);
        console.log(event.pageX);
        console.log(event.pageY); */
});