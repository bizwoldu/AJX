 $(function(){
    populateButtons(searchArray,'searchButton','#buttonsArea');

})

var searchArray = ['PitBull',"American Bulldog",'French Bulldog','English Bulldog','Pitbull Puppies'];
 
function populateButtons(){
    $('#buttonsArea').empty();
    for(var i = 0;i<searchArray.length;i++){
        var a = $('<button>');
        a.addClass('classToAdd');
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $('#buttonsArea').append(a);
    }  
} 
 
$('#addSearch').on('click', function() {
    var addSearch = $('#search-input').val().trim();
    searchArray.push(addSearch);
    populateButtons()
    return false;
    
})
        
    $(document).on('click','.classToAdd',function(){
        $('#searches').empty();
        var type = $(this).data('type');
        var queryUrl = 'http://api.giphy.com/v1/gifs/search?q='+type+'&apikey=dc6zaTOxFJmzC&limit=10';
        $.ajax({url:queryUrl,method:'GET'})
            .done(function(response){
                for(var i=0;i<response.data.length;i++){
                    var searchDiv = $('<div class="search-item">');         
                    var rating = response.data[i].rating;
                    var p = $('p').text('rating:'+rating);
                    var animated = response.data[i].images.fixed_height.url;
                    var still = response.data[i].images.fixed_height_still.url;
                    var image = $('<img>');
                        image.attr('src',still);
                        image.attr('data-animated',animated);
                        image.attr('data-still',still);
                        image.attr('data-animated',animated);
                        image.addClass('searchImage');
                        searchDiv.append(p);
                        searchDiv.append(image);
                        $('#searches').append(searchDiv);
                    } 
                })    
        })
        $(document).on('click','.searchImage',function(){
            var state = $(this).attr('data-state');
            if(state == 'still'){
                $(this).attr('src',$(this).data('animated'));
                $(this).attr('data-state','animated');
            } else {
                $(this).attr('src',$(this).data('still'));
                $(this).attr('data-state','still');
            }
        })
         