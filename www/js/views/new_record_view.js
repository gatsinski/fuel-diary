$('body').on('submit', '#new_record_form', function(event) {
    event.preventDefault();
    var $form = $(this);
    var storage = window.localStorage;
    var valid = true;

    $(".form-control").each(function(index) {

        $field = $(this);
        if (!$field.val() && $field.hasClass('required')) {
            $field.removeClass('valid').addClass('invalid');
            valid = false;                    
        } else {
            $field.removeClass('invalid').addClass('valid');
        }
    });

    if (valid) {

        var formArray = $form.serializeArray();
        var formData = {};

        for (var i = 0; i < formArray.length; i++) {
            formData[formArray[i]['name']] = formArray[i]['value'];
        }
        storage.setItem(formData.date, JSON.stringify(formData));
        alert('Record added successfully');
        // Reset form
        $form.find("input[type=text],\
                    input[type=number],\
                    input[type=date],\
                    textarea").val('');
        recordList = loadRecords();
    }
});
