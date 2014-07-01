'use strict';

angular.module('projectmgrApp', [
  'ngRoute',
  'ngResource'
]).config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

  // Enable Angular to pull data from 3rd party domain (used for API)
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    
    // Include authorization request with every $http
    $httpProvider.interceptors.push('Headersauthinterceptor');
    
    // Check response header if 401 re-direct to login page
    $httpProvider.responseInterceptors.push('Responseauthinterceptor');

  $routeProvider
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })
    .when('/projectMgr', {
      templateUrl: 'views/projectmgr.html',
      controller: 'ProjectmgrCtrl'
    })
    .when('/categoryList/:id', {
      templateUrl: 'views/categorylist.html',
      controller: 'CategorylistCtrl'
    })
    .when('/questionList/:id', {
      templateUrl: 'views/questionlist.html',
      controller: 'QuestionlistCtrl'
    })
    .when('/incidentReport/:id', {
      templateUrl: 'views/incidentreport.html',
      controller: 'IncidentreportCtrl'
    })
    .when('/newUser', {
      templateUrl: 'views/newuser.html',
      controller: 'NewuserCtrl'
    })
    .when('/newProject', {
      templateUrl: 'views/newproject.html',
      controller: 'NewprojectCtrl'
    })
    .when('/checklist/:id', {
      templateUrl: 'views/checklist.html',
      controller: 'ChecklistCtrl'
    })
    .when('/projectlist', {
      templateUrl: 'views/projectlist.html',
      controller: 'ProjectlistCtrl'
    })
    .otherwise({
      redirectTo: '/login'
    });
  }
]);

var settings = {
  url:'http://localhost:3000/'
};

// I don't want any real form submit, just ajax submits
$.validator.setDefaults({
  debug: true
});

var myPhonegapApp = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    myPhonegapApp.receivedEvent();
  },
  // Update DOM on a Received Event
  receivedEvent: function() {
    console.log('Device ready');
  }
};

myPhonegapApp.initialize();


var validateUtils = {

  highlight: function(element) {
    if($(element).siblings("i").length === 0){
      var icon = $("<i>").addClass("fa fa-exclamation-triangle text-danger");
      $(element).after(icon);
    }
  },
  unhighlight: function(element){
    $(element).siblings("i").remove();
    $(element).qtip('destroy', true);
    $(element).closest(".control-group").removeClass("has-error").addClass("has-success");
    
  },            
  errorPlacement: function(error, element) {
    var qTipSettings = {
      content: {
        text: error.text() // Use the "div" element next to this for the content
      },
      position: { 
        my: 'top center',
        at: 'bottom center'
      },
      style:'qtip qtip-red qtip-rounded qtip-shadow'
    };

    element.closest(".control-group").removeClass("has-success").addClass("has-error");
    element.qtip(qTipSettings);
  }
};
