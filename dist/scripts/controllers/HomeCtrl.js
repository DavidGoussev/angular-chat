(function() {
    function HomeCtrl($scope, Room) {
        $scope.rooms = Room.all;

        $scope.selected = {
            room: $scope.rooms[0],
        };
        
        $scope.changeRoom = function changeRoom(room) {
            $scope.selected.room = room;
            $scope.messages = Room.getMessages(room.$id);
        };        
        
        $scope.deleteRoom = function(roomId) {
            Room.delete(roomId).then(function(data){
                console.log('Room deleted!');
            })
        }

    }
    
    angular
        .module('angularChat')
        .controller('HomeCtrl', ['$scope', 'Room', HomeCtrl]);
})();