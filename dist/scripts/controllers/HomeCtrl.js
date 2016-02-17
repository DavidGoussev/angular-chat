(function() {
    function HomeCtrl($scope, Room) {
        $scope.rooms = Room.all;
        
        $scope.rooms.$loaded(function() {
            if ($scope.rooms.length === 1) {
                $scope.rooms.$add({
                    name: "Second"
                });
            }
        });
    }
    
    angular
        .module('angularChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();