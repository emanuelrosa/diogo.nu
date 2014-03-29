//-- Responsive menu
$('#nav').addClass('responsive-menu').before('<div id="menu">&#9776;</div>');

$('#menu').click(function(e){
    e.stopPropagation();
    var nav = $('#nav'), 
        menu = $('#menu');
    if (menu.hasClass('active')){
        menu.removeClass('active');
        nav.hide();
    } else {
        menu.addClass('active');
        nav.show();
    }
});

//--Resize
$(window).resize(function(){
    if (window.innerWidth > 680) {
        $('#nav').removeAttr('style');
        $('#menu').removeClass('active');
    }
});

//--Click on page
$(document).click(function(){
    if ($('#menu').hasClass('active') && window.innerWidth < 679){
        $('#menu').removeClass('active');
        $('#nav').hide();
    }
});

//-- Filter projects
$('.project-filter-item').on('click', function () {
    
    // Get data filter value
    var filterValue = $(this).data('filter');

    // Remove all 'active' class
    $('.project-filter-item').removeClass('project-active');

    // Add 'active' class on a specific item
    $(this).addClass('project-active');

    // Verify 'all' option filter
    if(filterValue === 'all') {

        // Show all items
        $('.project-item').removeClass('inactive');

    } else {

        // Clear all items
        $('.project-item').addClass('inactive');

        // Show specific item
        $('.'+filterValue).removeClass('inactive');

    }

});