    // Automatically select step in how to play block.
    selectedStep = 1;
    // Cache element to avoid reselection
	var $mobile_content = $("#mobile-content");
    var $step_img_1 = $("#step-img-1");
    var $step_img_2 = $("#step-img-2");
    var $step_img_3 = $("#step-img-3");
    var $step_desc_block_1 = $("#step-desc-block-1");
    var $step_desc_block_2 = $("#step-desc-block-2");
    var $step_desc_block_3 = $("#step-desc-block-3");
    var $slide = $("#slide");
    var $flip_container = $(".flip-container");
    
    function toggleStep() {
        //deselect the current step
        if (selectedStep == 5)
            selectedStep = 1;
        else
            selectedStep++;
            
        if (selectedStep == 1) { //show step 1
            $step_img_1.attr('src', 'img/flow2_1_download_select.png');
            $mobile_content.attr('src', 'img/play-step-googleplay.jpg');
            
            //hide un-selected description only for mobile, change font-weight for pc
            if (document.documentElement.clientWidth < 800) {
                $step_desc_block_1.show();
            } else {
                $step_desc_block_1.css('font-weight', '500');
            }
        } else { //hide step 1
            $step_img_1.attr('src', 'img/flow2_1_download.png');
            
            //hide un-selected description only for mobile, change font-weight for pc
            if (document.documentElement.clientWidth < 800) {
                $step_desc_block_1.hide();
            } else {
                $step_desc_block_1.css('font-weight', '300');
            }
        }
        
        if (selectedStep == 2) { //show step 2
            $step_img_2.attr('src', 'img/flow2_2_join_select.png');
            $mobile_content.attr('src', 'img/play-step-download.jpg');
            
            //hide un-selected description only for mobile, change font-weight for pc
            if (document.documentElement.clientWidth < 800) {
                $step_desc_block_2.show();
            } else {
                $step_desc_block_2.css('font-weight', '500');
            }
        } else { //hide step 2
            $step_img_2.attr('src', 'img/flow2_2_join.png');
            
            //hide un-selected description only for mobile, change font-weight for pc
            if (document.documentElement.clientWidth < 800) {
                $step_desc_block_2.hide();
            } else {
                $step_desc_block_2.css('font-weight', '300');
            }
        }
        
        // note that 3, 4 and 5 always happen in sequence, so can use if, else if, else
        if (selectedStep == 3) { //show step 3
            $step_img_3.attr('src', 'img/flow2_3_find_select.png');
            $mobile_content.attr('src', 'img/play-step-new-discovered-blank.png');
            $flip_container.css('display', 'block');
            $slide.show().addClass("slide");
            
            //hide un-selected description only for mobile, change font-weight for pc
            if (document.documentElement.clientWidth < 800) {
                $step_desc_block_3.show();
            } else {
                $step_desc_block_3.css('font-weight', '500');
            }
            
            // reset timer to 1.5s, so no need to wait too long to see image flipped
            clearInterval(timerCnt);
            timerCnt = setInterval(toggleStep, 1500);
        } else if (selectedStep == 4) {
            // flip the image here!
            $flip_container.addClass("flip");
            // #slide need to take place, but hidden (in order for cell phone screen to work)
            $slide.css('visibility', 'hidden').removeClass("slide");
            // reset timer to 0.6s, change it to fine tune the time between 
            clearInterval(timerCnt);
            timerCnt = setInterval(toggleStep, 600);
        } else if (selectedStep == 5) {
            // add this step to show the 2 lines above and below the image
            $mobile_content.attr('src', 'img/play-step-new-discovered-flipped.png');               // ========> change image here
            // reset timer to 3000, so that user can see the new picture and final stage longer
            clearInterval(timerCnt);
            timerCnt = setInterval(toggleStep, 2500);
        } else {
            $step_img_3.attr('src', 'img/flow2_3_find.png');
            $mobile_content.css('display', 'block');
            $flip_container.css('display', 'none').removeClass("flip");
            // change #slide back to visible, then hide it
            $slide.css('visibility', 'visible').hide();
            
            //hide un-selected description only for mobile, change font-weight for pc
            if (document.documentElement.clientWidth < 800) {
                $step_desc_block_3.hide();
            } else {
                $step_desc_block_3.css('font-weight', '300');
            }

            // set timmer back to 2000
            clearInterval(timerCnt);
            timerCnt = setInterval(toggleStep, 2000);
        }
    }
	
    // for mobile, initially show description 1 only.
    if (document.documentElement.clientWidth < 800) {
        $("#step-desc-block-2").hide();
        $("#step-desc-block-3").hide();
        $("#contact-us-button").text("Contact Us");
    }
            
    // set 2000ms timer when loaded
    var timerCnt = setInterval(toggleStep, 2000);

    // Click the 1st circle
    $("#step-img-1").click(function(e) {
        // set the step, clear and restart timer
        selectedStep = 0;
        clearInterval(timerCnt);
        timerCnt = setInterval(toggleStep, 2000);
        toggleStep();
    });
    // Click the 1st button onload
    $("#step-img-1").click();
    
    // Click the 2nd circle
    $("#step-img-2").click(function(e) {
        // set the step, clear and restart timer
        selectedStep = 1;
        clearInterval(timerCnt);
        timerCnt = setInterval(toggleStep, 2000);
        toggleStep();
    });
	
    // Click the 3rd circle
    $("#step-img-3").click(function(e) {
        // to be simple, disable clicking 3rd circle in stage 3, 4 and 5
        if (selectedStep != 3 && selectedStep != 4 && selectedStep != 5) {
            // set the step, clear and restart timer
            selectedStep = 2;
            clearInterval(timerCnt);
            timerCnt = setInterval(toggleStep, 2000);
            toggleStep();
        }
    });

    // Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });

    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    
    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });
    
    $('input[placeholder]').on('focus', function () {
        var $this = $(this);
        $this.data('placeholder', $this.prop('placeholder')).removeAttr('placeholder');
    }).on('blur', function () {
        var $this = $(this);
        $this.prop('placeholder', $this.data('placeholder'));
    });
