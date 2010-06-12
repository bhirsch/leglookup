var Leglookup = {};

if(Drupal.jsEnabled) {
  $(document).ready(
    function(){
      $("#leglookup-state").after("<a class='leglookup' id='look-up'>Look Up</a><div id='msg'></div>")
       .next().click(Leglookup.getInfo);
    }
  );
} 

// TRY SPLITTING FUNCTIONS UP. HAVE IT CALL THE MESSAGE 'PLEASE WAIT' FIRST. THEN CALL
// GET INFO. 

/**
 * A function to retreive legislator and district info 
 */
Leglookup.getInfo = function() {
    // Message to user
    $("#msg").text('One moment please');
    var url = Drupal.settings.leglookup.json_url;
    var street = escape(document.getElementById("leglookup-compose-form").street.value);
    var city = escape(document.getElementById("leglookup-compose-form").city.value);
    var state = escape(document.getElementById("leglookup-compose-form").state.value);
    params = "?addr=" + street + "&city=" + city + "&st=" + state;
    params = params.replace(/%20/g, "+");
    url += params;
    var street1 = document.getElementById("leglookup-compose-form").street.value;
    var city1 = document.getElementById("leglookup-compose-form").city.value;
    var state1 = document.getElementById("leglookup-compose-form").state.value;
    var legInfo = "<div class='leglookup' id='results'>";
    $.getJSON(url, function(data) {
      $.each(data.legislators, function(i,legislator) {
	  legInfo += 
	    "<div id='district'>"+legislator.state+" - "+legislator.district+"</div>"
	    +"<div id='name'>("+legislator.party+") "+legislator.title+". "
	    +legislator.firstname+" "+legislator.lastname+"</div>";
       // There should never be more than three legislators returned
       // but just in case...
       if ( i == 2 ) return false;
      });
      legInfo += "<em>"+street1+", "+city1+", "+state1+"<em></div>";
      $("#msg").after(legInfo);
    }); // End inline function */  $("#leglookup-results").text(url);
    $("#msg").text(''); 
}
