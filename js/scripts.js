$(window).scroll(function (event) {
    var offset = $(window).scrollTop();

    // $(window).scrollTop gives you the distance to the top of the page
    var imgX = offset / 50;
    var pipeX = offset / 20;
    var birdX = offset / 5;

    console.log(imgX);
    // move these elements sideway
    $('#background').css('background-position', imgX + 'px 0px');
    $('#bird').css('left', pipeX);
    $('#pipe').css('left', birdX);

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