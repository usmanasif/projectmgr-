'use strict';

angular.module('projectmgrApp')
  .controller('QuestionlistCtrl', ['$scope', '$location', '$routeParams', 'Api', 'Sharedata',
    function ($scope, $location, $routeParams, Api, Sharedata) {
      if(!Sharedata.get('project')) {
        $location.path('/projectMgr');
        return;
      }

      var loadQuestions = function(){
        Api.get(settings.url + 'categories/' + $routeParams.id + '/questions.json')
        .then(function (data){
            if(data.error)
            {
              console.dir(data.error);
            }
            else
            {
              console.log($routeParams.id);
              var spinnerData =_.map(data.questions, function(question){
                return {key: question.id, value: question.body};
              });

              SpinningWheel.addSlot(spinnerData, 'left');
              SpinningWheel.setDoneAction(selectQuestionData);
              SpinningWheel.open();
              $('#sw-slots li').addClass("small");
            }
          }
        );
      };

      $scope.project = Sharedata.get('project');
      var checklist = Sharedata.get('checklist');
      loadQuestions();
      
      Api.get(settings.url +'reports/'+ checklist.id +'/answers.json').
        
      then(function (data){
        if(data.error)
          {console.dir(error);
        }
        else
        {
          answers = data.answers;
        }
      });

      var questionId;
      var answers = [];

      var selectQuestionData = function(){
        var selectedData = SpinningWheel.getSelectedValues();
        questionId = selectedData.keys[0];
        $scope.isQuestionSelected = true;
        $scope.$apply();
      };

      $scope.$on('$destroy', function() {
        SpinningWheel.destroy();
      });

      var newUrl;

      $scope.selectAnswer = function(status){
        var answersToUpdate = _.find(answers, function (answ){
          return answ.question_id ==questionId;
        });
        if(status == "yes")
         status = 1;
        else if(status == "no")
         status = 2;
        else if(status == "na")
          status = 3;
        answersToUpdate.status = status;
        $scope.isQuestionSelected = false;
        //answersToUpdate.url = "http://www.johnsoncareers.com/favicon.png";  
        console.log(answersToUpdate);
        //{data:{authenticity_token:"f443c742584f5b591d349b9e78f62c77", status: "1"}

        Api.patch(settings.url + 'projects/' + $scope.project.id + '/answers/' + answersToUpdate.id,
          {status: answersToUpdate.status })
        .then(function (data){
          if (data.error){
            console.dir(error);
          } else {
            console.dir(data);
          } 
        });
        Api.patch(settings.url + 'projects/' + $scope.project.id + '/answers/' + answersToUpdate.id + '/update_answer', {answer:{notes: $scope.textModel, file: newUrl }})
        .then(function (data){
          if (data.error){
            console.dir(error);
          } else {
            console.dir(data);
          } 
        });
        
      };
      $scope.changeResolve = function (){
        if ($scope.resolvedStatus == 'Resolved'){
          $scope.resolvedStatus = 'Unresolved';
        }
        else
        {
          $scope.resolvedStatus = 'Resolved';
        }
      };

      $scope.getResolveCss = function (){
        return $scope.resolvedStatus == 'Resolved' ? 'btn btn-info btn-block' : 'btn btn-warning btn-block';
      }

      $scope.getResolveIcon = function(){
        return $scope.resolvedStatus == 'Resolved' ? 'fa fa-check' : 'fa fa-ban';
      }

      $scope.takePic = function (){
        try
        {
          // uploadPhoto("iVBORw0KGgoAAAANSUhEUgAAACUAAAAhCAYAAABeD2IVAAAFN0lEQVR4Xt2YaUwUZxjHFSxUCm3SStJIEARW7oBNQKhfyCKFVKUlJQEVaKMNbUqxCSDwgVIi8cIq1sYqsQlWqBy1Sq1cC3Is9yK4Qt3lkcNKI7dWLKd8oP/3LZOgzKzbsm3avskvy8zCzm+eeY53WTE/P/+v4/8hNTc3p5Pe3r4V7e03OFjmYC2wAWtw7u+RwnoBbACOYB14BZgvnH9pQcLFyMhIHhYWFnn06OcpWVlZh5OSkvdCTGZwKazVO3fuCkcUstTqm2dLS8sOHj+e+TFWVHR0dERqamr0sWPHP7t06fL5hoZG1fXrbdTael1Aa21tHQQxY0NL2VRWXst4/HiOxJienuECKlUrp6VFJcCP5XJ5KLsxQ0vZIwInpaRmZx9zqebmliUwsYiIiPcgZWFoKRkicJoJSHHrlkZSKiFhXyzLQYNHqrGx6UtdUvfuDUhKZWRkpLBCWLYU1nNgHdgUHPxWaHd3T74uqZmZWUKCi0plZ587aWJiIl9oEUZ/SQrLzsvLa3tZWfmh+/cfKEUk9I6WkOx1dfWNJ058kWZhYbFFKmo6hRDujyYmJttZAv9JeG41NTUv5gm5a9eqFN7em94WE5MSMraysgqEkFpaQDf4W2praxeEqLZWyaL0hFxVVXWVmZkZi9hKfaRWh4eHh4kI8A9Hl6b6+np6+HBcp9jw8AidPfs1RUZGka+vL6HHLYlafHwCr0h9pFaamprKkUcNLHGfAkINFBISQra2tuTn50d79rxPycnJqK6jdOjQYVwonoKDg8ne3p6cnJwoLi6eampquQyqV4Afp6R8Gg8pS0mphbVqgXX796d/ODU1rWEiYqjVai4SHr6DfHx8yM3NjTw8PCggIIAweujChTwaG7uPRzlBQ0PDNDg49DRdgYGB70DqebBqiRRPJGNjuaen57bFnDmTFf/o0W832AgxNJ2dP+W7urpuc3R05EDhRbFIud++3V3wRySYgOGZnJxC1IZIq+1CTrVwVCoVXbx48RwEnMWkXt648bXtCHkzHhstF0SYP76BgUHCPos6OjpRcVUazE8CQm6xfFNJRkrYCaSlpX2Aktayu5Kip6eX/P39WfXQqVNfUVHRD+zDeRFcufIjlZcr0MGzKTPzBJI5hQ1jQiOmI0eOtLLfWQxm4ifsus+qPhl6SCbESApEgSe1g4MD2dnZ0fr163k12tjYcAoLv4OENzvP35fJZPxVoajQsH4lkJ+fnwMhF31agqm5ufmWvr47peziUhw4cJALOTs7C/A2EBQUxPtYXl4eubi4sHNcKDY2lp9XKpUcPMpWJPh2tmPVd8y8il4TipxQj48/IjHQx1hj5BESorV582YqLi4RIoGfiyGzlxITk9B4mUwdfwU4lxgHIVt9x4wMDXC3paXlG2gJ+x48+JV0UVJSShiyVFBQyPsRtstUXV3DQZ4JEvwYacHJzf2WPTZXvQYylgMSNwFR0N6583MlNv87MBKycUwSLBbkxxqNllWZAGSqOcKxQqEQeWzSHX1NVNS7u3C3naOjYwRY1+3IyclNQ34pR0ZGSR9wM1RRUSkJKrMNebaVtQB9pDxv3uwoWjwSIMjBqmbH+oKtCbu4GFzs/Pmcb1jVAWkpZh0TE7O7v/8Xunu3f7nwPdPVq8Vi8ELA1zNKT09PY/1Jl5QMv3wanZc1xmXT1UW8iaKpisHfw/fDJki9rkvKG1+PqthMMhRoCZhp30ty+XIRYVscADEjKam1mNhvuru7bzUkqLKt6PoSyFiyb3hWoq/6p/nP/Cvod4M+AYycVdHoAAAAAElFTkSuQmCC");          
          var options = {
            sourceType: 1,
            quality: 60,
            destinationType: Camera.DestinationType.DATA_URL
          };
          navigator.camera.getPicture(uploadPhoto,null,options);
        }
        catch(error){
          alert(error.message);
        }
      };

      function uploadPhoto(fileUrl){

        alert(fileUrl);
        newUrl = fileUrl;
      }

      function resetView() {
        $scope.resolvedStatus = "Unresolved";
      };

      resetView();


  }]);
