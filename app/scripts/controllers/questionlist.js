'use strict';

angular.module('projectmgrApp')
  .controller('QuestionlistCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
      $scope.project = Sharedata.get('project');
      Api.get(settings.url + 'questions.json')
      .then(function (data){
          if(data.error)
          {
            console.dir(data.error);
          }
          else
          {
            console.log($routeParams.id);
            var filteredData = _.filter(data, function (question){
              return question.category_id == $routeParams.id;
            });

            console.dir(filteredData);

            var spinnerData =_.map(filteredData, function(question){
              return {key: question.id, value: question.body};
            });

            SpinningWheel.addSlot(spinnerData, 'center');
            SpinningWheel.open();
            $("#sw-wrapper").on("click", selectQuestionData);
          }
        }
      );

      var selectQuestionData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        var questionId = selectedData.keys[0];

        Api.get(settings.url + 'answers,json')
        .then(function (data){
          console.log('Answers: ');
          console.dir(data);
        });
      };

    $scope.$on('$destroy', function() {
      SpinningWheel.destroy();
    });

    $scope.selectAnswer = function(){
      $scope.isQuestionSelected = false;
    };

  }]);
