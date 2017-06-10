recordList.showThisMonthOnly();

$('body').on('click', '#show_this_month', function() {
    recordList.showThisMonthOnly();
});

$('body').on('click', '#show_this_year', function() {
    recordList.showThisYearOnly();
});

$('body').on('input', '#to_date, #from_date', function() {
    var from_date = $('#from_date').val();
    var to_date = $('#to_date').val();
    if (from_date && to_date) {
        recordList.showFromTo(from_date, to_date);
    }
});

$('body').on('click', '#erase_all', function() {
    if(confirm('Are you sure? All data will be lost?')) {
        window.localStorage.clear();
        $('#tab-content table').remove();
    }
});
