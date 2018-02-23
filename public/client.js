// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  
  /*
  $.get('/dreams', function(dreams) {
    dreams.forEach(function(dream) {
      $('<li></li>').text(dream).appendTo('ul#dreams');
    });
  });
  */

  $('form').submit(function(event) {
    event.preventDefault();
    var channel = $('input').val();
    console.log("submitted value: " +channel);
    ChangeSubscription(channel);    
    $('input').val('');
    $('input').focus();    
  });


  
});

function ChangeSubscription(channelName) {
  var pubnub = new PubNub({
    publishKey : 'pub-c-c6e9081a-7e4f-474f-a8a5-0aa9e6c857b4',
    subscribeKey : 'sub-c-98436ae2-18ac-11e8-8f67-36fe363f7ef0',
    ssl: true
  });
        
        
  pubnub.addListener({    
    message: function(message) {
        console.log("New Message!!", message);
        $( ".messages" ).prepend("<p><b>channel:</b> "+message.channel+
                                 "<br><b>timetoken:</b> "+message.timetoken+
                                 "<br><b>message:</b><br>  "+JSON.stringify(message.message)+"</p>");
    }  
  });      
        
  console.log("Subscribing to channel: " + channelName);
        
  pubnub.subscribe({
      channels: [channelName]      
  });          
  
  console.log("Subscribed to channel: " + channelName);
  $( ".channel" ).empty();
  $( ".channel" ).append("<p>Subscribed to channel: <b>"+channelName+"</b></p>");
};