//header
    $(window).scroll(function(){var body=$("body"),scroll=$(window).scrollTop();if(scroll>=5)body.addClass("fixed");else body.removeClass("fixed");});



// $(document).mouseup(function(event) { 
//     var pol = $('#navbarSupportedContent');
//     if (!pol.is(event.target) && pol.has(event.target).length === 0) {
//         pol.removeClass('newClassName'); // Add the class when clicking outside
//     } else {
//         pol.addClass('newClassName'); // Remove the class when clicking inside
//     }
// });