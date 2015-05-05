function DrawingController($scope) {
  var colorChoice = {
    purple: "#cb3594",
    green: "#659b41",
    yellow: "#ffcf33",
    brown: "#986928",
    red: "#df4b26"
  };

  $scope.points = new Array();
  $scope.paint = false;
  $scope.currentColor = colorChoice.purple;

  $scope.addClick = function(x, y, dragging) {
    $scope.points.push({
      x:x,
      y:y,
      dragging:dragging,
      color:$scope.currentColor});
  };
}