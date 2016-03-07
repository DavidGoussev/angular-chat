(function() {
    function HomeCtrl($scope, Room, Message, Auth, User) {
        $scope.rooms = Room.all;
        
        $scope.auth = Auth.auth;
        
        $scope.users = User.all;
        
        
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
        
//        $scope.username = User.getUsername($scope.authData);
        
        $scope.addMessage = function(){
            console.log($scope.authData.uid);
            Message.send({
                username: User.getUsername($scope.authData),
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
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', 'Auth', 'User', HomeCtrl]);
})();