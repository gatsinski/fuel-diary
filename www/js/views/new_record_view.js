$('body').on('submit', '#new_record_form', function(event) {
    event.preventDefault();
    var $form = $(this);
    var storage = window.localStorage;
    var valid = true;
    var $field,
        $initialTankLevel,
        $dayEndTankLevel,
        $inputDate,
        inputDate,
        currentDate;

    $(".form-control").each(function(index) {

        $field = $(this);
        if ($field.hasClass('required') && !$field.val()) {
            $field.removeClass('valid').addClass('invalid');
            valid = false;
        } else if($field.hasClass('positive') && $field.val() <= 0) {
            $field.removeClass('valid').addClass('invalid');
            valid = false;
        } else {
            $field.removeClass('invalid').addClass('valid');
        }
    });

    // Validate tank level
    $initialTankLevel = $(".form-control#initial_tank_level");
    $dayEndTankLevel = $(".form-control#day_end_tank_level");

    if ($initialTankLevel.val() <= $dayEndTankLevel.val()) {
        $initialTankLevel.removeClass('valid').addClass('invalid');
        $dayEndTankLevel.removeClass('valid').addClass('invalid');

        valid = false;
    } else {
        $initialTankLevel.removeClass('invalid').addClass('valid');
        $dayEndTankLevel.removeClass('invalid').addClass('valid');
    }

    // Validate date
    $inputDate = $('.form-control#date');
    if ($inputDate.hasClass('valid')) {
        currentDate = new Date();
        inputDate = new Date($inputDate.val());
        if (currentDate.getTime() < inputDate.getTime()) {
            $inputDate.removeClass('valid').addClass('invalid');
            valid = false;
        }
    }

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
