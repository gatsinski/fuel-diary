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

$('body').on('click', '#export_table', function() {
    exportToExcel();
});

function exportToExcel() {
    var htmls = "";
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'; 
    var base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)))
    };

    var format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
        })
    };


    var ctx = {
        worksheet : 'Worksheet',
        table : $('#records_table').html()
    }


    var link = document.createElement("a");
    link.download = "fuel_records.xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
}
