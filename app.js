var telepic = angular.module('telepic', ['firebase']);

telepic.controller('GameCtrl', function GameCtrl($scope, $firebase) {
  var ref = new Firebase("https://fiery-fire-4044.firebaseio.com");
  $scope.turns = $firebase(ref.limit(15));
  $scope.username = 'Guest ' + Math.floor(Math.random() * 101);
  $scope.addPhrase = function () {
    console.log($scope.phrase);
    $scope.turns.$add({
      from: $scope.username,
      type: 'phrase',
      content: $scope.phrase
    });
    $scope.phrase = "";
  }

  $scope.addDrawing = function () {
    $scope.turns.$add({
      from: $scope.username,
      type: 'drawing',
      content: $('.drawing-canvas')[0].toDataURL()
    });

    var context = $('.drawing-canvas')[0].getContext("2d");
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }
});

telepic.directive('drawing', function() {
  return {
    restrict: 'A',
    scope: {
      points: '=points'
    },
    link: function(scope, element, attrs) {
      console.log(element);
    },
    templateUrl: 'drawing.html'
  };
});

telepic.directive('test', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      var colors = $scope.colors = [];
      $scope.color = 0;

      $scope.selectColor = function(c) {
        $scope.color = c;
      };

      this.addColor = function(c) {
        console.log("add color");
        colors.push(c);
        if ($scope.color == 0) {
          $scope.color = c;
        }
      };
    },
    templateUrl: "test-template.html"
  }
});

telepic.directive('testColor', function() {
  return {
    require: '^test',
    restrict: 'E',
    scope: {
      name: '@',
    },
    link: function(scope, element, attrs, ctrl) {
      console.log("definitely");
      ctrl.addColor(scope);
    },
    template: "{{name}}"
  };
});
