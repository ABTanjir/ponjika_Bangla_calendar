$(function(){
    $.fn.ponjika = function(options) {

        var defaults = {
            input : this.selector,
            yesText : 'Confirm',
            noText : 'Cancle',
            range : "1410-1460",
            containerId : "#ponjika_container"
        }
        var settings = $.extend({}, defaults, options);
        var monthIndex, dateIndex, yearIndex;


        var yearRange = settings.range;
        var monthLenght = 31;
        var monthName = [
                        'বৈশাখ',
                        'জ্যৈষ্ঠ',
                        'আষাঢ়',
                        'শ্রাবণ',
                        'ভাদ্র',
                        'আশ্বিন',
                        'কার্তিক',
                        'অগ্রহায়ণ',
                        'পৌষ',
                        'মাঘ',
                        'ফাল্গুন',
                        'চৈত্র'                            
                        ];
var monthLengts = [31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30];
var bnNumbers = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

console.log(settings.yesText);

function changeLang(input){
    x = input.length;
    r = '';
    for(i = 0;i<x; i++) {
        r+= bnNumbers[input[i]];
    }
    return(r);
}


function initDate(){
    op ='<option selected disabled>select a date</option>';
    for (i = 0; i < monthLenght; i++) {
        display = i+1;
        op+='<option value="'+ i +'">'+display+'</option>';
    }
    $('#date').html(op);
}

function initYear(){
    fromYear = yearRange.split('-')[0]
    toYear = yearRange.split('-')[1]

    op ='<option selected disabled>select a year</option>';
    for (i = fromYear; i <= toYear; i++) {
        op+='<option value="'+ i +'">'+i+'</option>';
    }
    $('#year').html(op);
}

function initMonth(){
    op ='<option selected disabled>select a month</option>';
    
    for (var m = 0; m < monthName.length; m++) {
        op+='<option value="'+ m +'">'+monthName[m]+'</option>';
    }
    $('#month').html(op);
}


    $(document).on( 'change', '#month', function(){
        monthIndex = parseInt($(this).val()) + 1;
        monthLenght = monthLengts[monthIndex];
        initDate();
        initYear();
    });

    $(document).on( 'change', '#date', function(){
        dateIndex = parseInt($(this).val()) + 1;
    });

    $(document).on( 'change', '#year', function(){
        yearIndex = $(this).val();
    });


    $(this).on('click', function() {
        
        if($(settings.containerId).html().length <= 0){
            $(settings.containerId).html(
                '<div id="ponjika">'+
                    '<select id="month"></select>'+
                    '<select id="date"></select>'+
                    '<select id="year"></select>'+

                    '<div id="ponjika_control">'+
                        '<div id="ponjika_yes">'+
                            '<span>'+settings.yesText+'</span>'+
                        '</div>'+
                        '<div id="ponjika_no">'+
                            '<span>'+settings.noText+'</span>'+                
                        '</div>'+
                    '</div>'+
                '</div>'
            );
            initMonth();
            initDate();
            initYear();
        }else{
            console.log('regenerate html preented');
        }
    });
    //clicked confirm
    $(settings.containerId).on('click', '#ponjika_yes', function() {
        date = monthIndex + '-' + dateIndex+'-'+yearIndex;
        if((monthIndex == null) || (dateIndex == null) || (yearIndex == null)){
            alert('please select a proper date');
        }else{
            $(settings.input).val(date);
        }
    });
    // clicked cancel
    $(settings.containerId).on('click', '#ponjika_no', function() {
        $(settings.containerId).children().remove();
    });

    };
});
