(function() {
    function HomeCtrl($scope, Room, Message, Auth, User, Presence) {
        $scope.rooms = Room.all;
        
        $scope.auth = Auth.auth;
        

        
        $scope.users = User.all;

                
        $scope.totalViewers = 0;
        
        $scope.$on('onOnlineUser', function() {
            $scope.$apply(function () {
                $scope.totalViewers = Presence.getOnlineUserCount();
            });
        });
        
        
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;

        });
        
//        $scope.user = $scope.users.$getRecord($scope.authData.uid).username;
        
        
        
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
        .controller('HomeCtrl', ['$scope', 'Room', 'Message', 'Auth', 'User', 'Presence', HomeCtrl]);
})();