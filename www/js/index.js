/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var controller = null

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        controller = new Controller();
    },
};
app.initialize();


var Controller = function() {
    var controller = {
        self: null,
        initialize: function() {
            self = this;
            this.bindEvents();
            self.renderView('home-button');
        },

        bindEvents: function() {
          $('.tab-button').on('click', this.onTabClick);
        },

        onTabClick: function(e) {
          e.preventDefault();
            // Do nothing if the current tab is selected
            if ($(this).hasClass('active')) {
                return;
            }

            var tabId = $(this).attr('id') ;
            self.renderView(tabId);
        },

        scriptFlags: [],

        renderView: function(viewButton) {
            // Remove class `active` from the previous active tab
            $('.tab-button').removeClass('active');

            // Add class `active` to the current tab
            $('#'+viewButton).addClass('active');

            // Get the tab-content container
            var $tab = $('#tab-content');

            // Empty the content
            $tab.empty();

            if (viewButton == 'home-button') {
                $("#tab-content").load("./views/home_view.html", function(data) {
                    if ($.inArray('home_view', self.scriptFlags) < 0) {
                        self.scriptFlags.push('home_view');
                        $.getScript("js/views/home_view.js");
                    } else {
                        createWeekActivityChart();
                    }
                });
            } else if (viewButton == 'new-record-button') {
                $("#tab-content").load("./views/new_record_view.html", function(data) {
                    if ($.inArray('new_record_view', self.scriptFlags) < 0) {
                        self.scriptFlags.push('new_record_view');
                        $.getScript("js/views/new_record_view.js");
                    }
                });
            } else {
                $("#tab-content").load("./views/all_records_view.html", function(data) {
                    if ($.inArray('all_records_view', self.scriptFlags) < 0) {
                        self.scriptFlags.push('all_records_view');
                        $.getScript("js/views/all_records_view.js");
                    } else {
                        recordList.showThisMonthOnly();
                    }
                });
            }
        },
    };

    controller.initialize();
    return controller;
}


function validateField(field)
{
    if( $(field).val().length === 0 ) {
        $(this).parents('p').addClass('warning');
    }
}

function sortByDate(a, b){
  var date_a = new Date(a.date);
  var date_b = new Date(b.date);
  return ((date_a < date_b) ? -1 : ((date_a > date_b) ? 1 : 0));
}

function loadRecords() {
    var json;
    var storage = window.localStorage;
    var recordList = [];
    var record = {};

    for (var i = 0; i < storage.length; i++) {
        json = JSON.parse(storage.getItem(storage.key(i)));
        var record = new Record(json.date,
                                json.distanceTraveled,
                                json.initialTankLevel,
                                json.dayEndTankLevel,
                                json.refuel,
                                json.amountPaid,
                                json.description);
        recordList.push(record);
    }
    recordList = new RecordList(recordList, '#tab-content tbody');
    return recordList;
}

var recordList = loadRecords();
