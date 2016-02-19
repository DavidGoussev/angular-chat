(function() {
    function HomeCtrl($scope, Room) {
        $scope.rooms = Room.all;
        
// $scope.addRoom function moved to ModalInstanceCtrl for $modal
//        $scope.addRoom = function(){
//            Room.create($scope.room).then(function(data){
//                $scope.room.name = ''
//            })
//        };
        
        $scope.deleteRoom = function(roomId) {
            Room.delete(roomId).then(function(data){
                console.log('Room deleted!');
            })
        }
        
//  testing $add functionality to AngularFire array:
//        $scope.rooms.$loaded(function() {
//            if ($scope.rooms.length === 1) {
//                $scope.rooms.$add({
//                    name: "Second"
//                });
//            }
//        });
    }
    
    angular
        .module('angularChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();