function Record(date, distanceTraveled, fuelUsed, description) {
    /**
     * Represents a fuel record.
     * @param {string} date
     * @param {number} distanceTraveled
     * @param {number} fuelUsed
     * @param {string} description Optional parameter that describes the trip
     */
    this.date = date;
    this.distanceTraveled = distanceTraveled;
    this.fuelUsed = fuelUsed;
    this.description = description;
    this.addToDOM = function(tbody) {
        /**
         * Adds new row into the DOM
         * @param {string} Selector
         */

        $tbody = $(tbody);

        $tr = $('<tr>')
        $tr.append('<td>' + this.dateParser(this.date) + '</td>');
        $tr.append('<td>' + this.distanceTraveled + '</td>');
        $tr.append('<td>' + this.fuelUsed + '</td>');
        $tr.append('<td>' + this.description + '</td>');
        $tbody.append($tr);
    };
    this.dateParser = function (dateString) {
        /**
         * Converts the date string
         * @param {string} dateString
         * @returns {string} Date string in DD.MM.YYYY format
         */
        var date = new Date(dateString);
        var realMonth = date.getMonth() + 1;
        return [this.addLeadingZeroes(date.getDate()),
                this.addLeadingZeroes(realMonth),
                date.getFullYear()].join(".");
    };
    this.addLeadingZeroes = function (number) {
        return ("00" + number).substr(-2,2);

    }
}


function RecordList(list, selector) {
    /**
     * Represents a list of fuel records.
     * @param {list} list
     * @param {string} selector A selector to the HTML element where the list will be added 
     */
    this.list = list;
    this.selector = selector; 
    this.showAll = function(selector) {
        if (selector == undefined) {
            selector = this.selector;
        }
        for(var i = 0; i < this.list.length; i++) {
            this.list[i].addToDOM(selector);
        }
    };
    this.showThisMonthOnly = function(selector) {
        if (selector == undefined) {
            selector = this.selector;
        }
        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var recordDate;

        $(selector).empty();
        for(var i = 0; i < this.list.length; i++) {
            recordDate = new Date(this.list[i].date);
            if (recordDate.getMonth() === currentMonth) {
                this.list[i].addToDOM(selector);
            }
        }
    }
    this.showThisYearOnly = function(selector) {
        if (selector == undefined) {
            selector = this.selector;
        }
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var recordDate;

        $(selector).empty();
        for(var i = 0; i < this.list.length; i++) {
            recordDate = new Date(this.list[i].date);

            if (recordDate.getFullYear() === currentYear) {
                this.list[i].addToDOM(selector);
            }
        }
    }
    this.showFromTo = function(from, to, selector) {
        if (selector == undefined) {
            selector = this.selector;
        }

        var fromDate = new Date(from);
        var toDate = new Date(to);
        var recordDate;

        $(selector).empty();

        for(var i = 0; i < this.list.length; i++) {
            recordDate = new Date(this.list[i].date)

            if (recordDate >= fromDate && recordDate <= toDate) {
                this.list[i].addToDOM(selector);
            }
        }
    }
}
