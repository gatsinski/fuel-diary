function loadRecords() {
    var json;
    var storage = window.localStorage;
    var recordList = [];
    var record = {};

    for (var i = 0; i < storage.length; i++) {
        json = JSON.parse(storage.getItem(storage.key(i)));
        var record = new Record(json.date,
                                json.distanceTraveled,
                                json.fuelUsed,
                                json.description);
        recordList.push(record);
    }
    recordList = new RecordList(recordList, '#tab-content tbody');
    return recordList;
}

var recordList = loadRecords();
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