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

$('body').on('click', 'table tbody tr', function() {
    var date = $(this).children('td:first').data('originalDate');
    if (date) {
        record = recordList.getByDate(date);
        $("div.record-data").append('<p>Date: ' + record.dateParser(record.date) + '</p>');
        $("div.record-data").append('<p>Fuel used: ' + record.fuelUsed + '</p>');
        $("div.record-data").append('<p>Distance traeled: ' + record.distanceTraveled + '</p>');
        $("div.record-data").append('<p>Refuel: ' + record.refuel + '</p>');
        $("div.record-data").append('<p>Amount paid: ' + record.amountPaid + '</p>');
        if (record.description) {
            $("div.record-data").append('<p>Description:' + record.description + '</p>');
        }
        $("div.modal").removeClass('hidden');
    }
});

$('body').on('click', '#modal-close-button', function() {
    $("div.modal").addClass('hidden');
});
