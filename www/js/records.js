function Record(date, distanceTraveled, initialTanklevel, dayEndTankLevel, description) {
    /**
     * Represents a fuel record.
     * @param {string} date
     * @param {number} distanceTraveled
     * @param {number} initialTanklevel
     * @param {number} dayEndTankLevels
     * @param {string} description Optional parameter that describes the trip
     */
    this.date = date;
    this.distanceTraveled = distanceTraveled;
    this.initialTanklevel = initialTanklevel;
    this.dayEndTankLevel = dayEndTankLevel;
    this.description = description;
    this.calculateFuelUsed = function (initialTanklevel, dayEndTankLevel) {
        return initialTanklevel - dayEndTankLevel;
    }
    this.fuelUsed = this.calculateFuelUsed(initialTanklevel, dayEndTankLevel);
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
    };
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
        var record, totalFuel, totalDistance;
        totalFuel = totalDistance = 0;

        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var recordDate;

        $(selector).empty();
        for(var i = 0; i < this.list.length; i++) {
            record = this.list[i];
            recordDate = new Date(record.date);
            if (recordDate.getMonth() === currentMonth) {
                totalFuel += Number(record.fuelUsed);
                totalDistance += Number(record.distanceTraveled);
                record.addToDOM(selector);
            }
        }
        this.addOverall(selector, totalDistance, totalFuel);
    };
    this.showThisYearOnly = function(selector) {
        if (selector == undefined) {
            selector = this.selector;
        }
        var record, totalFuel, totalDistance;
        totalFuel = totalDistance = 0;

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var recordDate;

        $(selector).empty();
        for(var i = 0; i < this.list.length; i++) {
            record = this.list[i];
            recordDate = new Date(record.date);

            if (recordDate.getFullYear() === currentYear) {
                totalFuel += Number(record.fuelUsed);
                totalDistance += Number(record.distanceTraveled);
                record.addToDOM(selector);
            }
        }
        this.addOverall(selector, totalDistance, totalFuel);
    };
    this.showFromTo = function(from, to, selector) {
        if (selector == undefined) {
            selector = this.selector;
        }
        var record, totalFuel, totalDistance;
        totalFuel = totalDistance = 0;

        var fromDate = new Date(from);
        var toDate = new Date(to);
        var recordDate;

        $(selector).empty();

        for(var i = 0; i < this.list.length; i++) {
            record = this.list[i];
            recordDate = new Date(record.date)

            if (recordDate >= fromDate && recordDate <= toDate) {
                totalFuel += Number(record.fuelUsed);
                totalDistance += Number(record.distanceTraveled);
                record.addToDOM(selector);
            }
        }
        this.addOverall(selector, totalDistance, totalFuel);
    };
    this.addOverall = function(tbody, totalFuel, totalDistance) {
        /**
         * Adds overall into the DOM
         * @param {string} tbody
         * @param {number} totalFuel
         * @param {number} totalDistance
         */

        $tbody = $(tbody);

        $tr = $('<tr>')
        $tr.append('<td> Total </td>');
        $tr.append('<td>' + totalDistance + '</td>');
        $tr.append('<td>' + totalFuel + '</td>');
        $tbody.append($tr);
    };
    this.splitByDaysOfWeek = function() {
        var record, totalFuel, totalDistance;
        totalFuel = totalDistance = 0;

        var currentDate = new Date();
        var currentMonth = currentDate.getMonth();
        var recordDate;

        var weekDays = [];
        for (var i = 0; i < 7; i++) {
            weekDays[i] = 0;
        }

        for(var i = 0; i < this.list.length; i++) {
            record = this.list[i];
            recordDate = new Date(record.date);
            weekDays[recordDate.getDay()]++;
        }

        return weekDays;
    };
    this.getTotal = function() {
        return this.list.length;
    };
}
