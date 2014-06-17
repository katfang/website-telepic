var telepic = angular.module('telepic', ['firebase']);

telepic.directive('drawingPad', function() {
  return {
    restrict: 'E',
    controller: function($scope) {
      var colors = $scope.colors = [{name:'blue'}];
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
    template: 
      '{{color}}<br />' +
      '<button ng-repeat="c in colors" type="button" ng-click="selectColor(c)">{{c.name}}</button>' +
      '<button class="btn" type="submit"><i class="icon-reply">Done!</i></button>',
  };
});

telepic.directive('testColor', function() {
  return {
    require: '^drawingPad',
    scope: {
      'name': '=name',
    },
    restrict: 'E',
    link: function(scope, element, attrs, ctrl) {
      ctrl.addColor(scope);
    },
    template: "{{name}}"
  };
});
