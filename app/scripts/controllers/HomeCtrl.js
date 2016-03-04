(function() {
    function HomeCtrl($scope, Room, Message, Auth) {
        $scope.rooms = Room.all;
        
        $scope.auth = Auth.auth;
        
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
        });
        
        
        $scope.selected = {
            room: $scope.rooms[0],
        };
        
        $scope.changeRoom = function changeRoom(room) {
            $scope.selected.room = room;
            $scope.listMessages = Room.getMessages(room.$id);
        };        
        
        $scope.deleteRoom = function(room) {
            Room.delete(room).then(function(data){
                console.log('Room deleted!');
            })
        };
        
        $scope.addMessage = function(){
            Message.send({
                username: $scope.authData.password.email,
                content: $scope.newMessage,
                roomId: $scope.selected.room.$id,
                sentAt: Date(Firebase.ServerValue.TIMESTAMP*1000)
            }).then(function(data){
                $scope.newMessage = '';
                console.log('chat msg created!');
            })
        };   

    }
    
    angular
        .module('angularChat')
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', 'Auth', HomeCtrl]);
})();