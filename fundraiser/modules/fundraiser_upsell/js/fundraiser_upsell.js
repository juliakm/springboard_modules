(function ($) {
  Drupal.behaviors.fundraiser_upsell = {
    attach: function(context, settings) {
      // Get the modal window size
      modalWidth = $('#message-modal').width();
      modalHeight = $('#message-modal').height();
      // Pop up the modal on the page load
      $.blockUI({ 
        message: $('#message-modal'),
        centerY : 0,
        css: {
          width: modalWidth,
          height: modalHeight,
          textAlign: 'left',
          padding: '1em',
          top: '10em'
        }
      });
      // Submit live form
      $('.live #fundraiser-upsell-donation-form').submit(function(e) {
        // Stop the default form submit
        e.preventDefault();
        // Grab the values
        var sendData = $(this).serialize();
        path = $(this).attr('action');
        // update the block message 
        $.blockUI({ 
          message: "<h1>Processing your sustainer gift... </h1>",
          centerY : 0,
          css: {
            width: modalWidth,
            height: modalHeight,
            textAlign: 'left',
            padding: '1em',
            top: '10em'
          }
        });
        $.ajax({
          type: 'post',
          url: path,
          cache: false,
          data: sendData,
          complete: function(response) {
            // @TODO: fix this
            // update the block message 
            $.blockUI({ 
              message: response,
              centerY : 0,
              timeout: 3000,
              css: {
                width: modalWidth,
                height: modalHeight,
                textAlign: 'left',
                padding: '1em',
                top: '10em'
              }
            });
            // unblock when remote call returns
            // $.unblockUI();
          }
        });
      });
      // Preview submit function
      $('.preview #edit-submit').click(function() {
        // update the block message 
        $.blockUI({ 
          message: $('#message-return'),
          centerY : 0,
          timeout: 3000,
          css: {
            width: modalWidth,
            height: modalHeight,
            textAlign: 'left',
            padding: '1em',
            top: '10em'
          }
        });
        return false;
      });
      // Close button
      $('#edit-close').click(function() {
        $.unblockUI();
        return false;
      });
    }
  };
})(jQuery);