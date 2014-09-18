$( document ).ready(function() {

    // Currencies
    var currencies = {
        "USD" : {
            "name"  : "US Dollar",
            "fa"    : "&#xf155;",
            "symbol": "$"
        },
        "GBP" : {
            "name"  : "British Pound",
            "fa"    : "&#xf154;",
            "symbol": "$"
        },
        "EUR" : {
            "name"  : "Euro",
            "fa"    : "&#xf153;",
            "symbol": "€"
        }
    }

    // Build currency converter
    function build_currency_selector(){

        var select_begin = '<select id="select_currency" class="form-control">';
        var option_list = '';

        // Building options list
        $.each(currencies, function(code, currency) {
            option_list = option_list + '<option value="' + code + '">' + currency["fa"] + ' ' + currency["name"] + '</option>';
            //console.log(1);
        });

        var select_end = '</select>';

        // Place built converter
        $('#currency_converter').html(select_begin + option_list + select_end);

    }

    // When dropdown selection changes
    $( "#currency_converter" ).delegate( "#select_currency", "change", function() {

        var newly_selected_currency_code = $(this).val();
        var old_currency_rate = 'USD';

        var rate_response = get_currency_rate(old_currency_rate, newly_selected_currency_code);



    });

    // Replace all values on the page
    function change_currency_value(rate_response){

        var watch_list = $(this).getWatchList();

        console.log(rate_response);

    }

    // Get live currency rate
    function get_currency_rate(old_currency, new_currency){
        var rate_exchange_url = 'http://rate-exchange.appspot.com/currency?';
        var quantity = 1;
        var rate_string = 'from='+old_currency+'&to='+new_currency+'&q='+quantity;

        // Get the rate/value
        var response = $.ajax({
            url: rate_exchange_url+rate_string,
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                q: "to, rate, from, v",
                format: "json"
            },

            // work with the response
            success: function( response ) {
                change_currency_value(response);
            }
        });


        return response;



    }



    // Initialize
    build_currency_selector();

    //get_currency_rate('USD', 'EUR');





});

// JQuery Plugin
(function( $ ) {

    var watch_list = new Array();

    $.fn.currencyWatch = function() {

        var test = 'test';

        var to_watch = $(this).toArray();

        watch_list.push(to_watch);
        //console.log('pushed one');

    };

    $.fn.getWatchList = function(){
        return watch_list;
    }

}( jQuery ));