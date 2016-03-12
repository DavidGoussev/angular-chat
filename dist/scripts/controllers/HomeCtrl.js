(function() {
    function HomeCtrl($scope, Room, Message, Auth, User, Presence) {
        $scope.rooms = Room.all;
        
        $scope.auth = Auth.auth;
               
        $scope.users = User.all;
                
        $scope.totalViewers = 0;
        
        $scope.$on('onOnlineUser', function() {
            $scope.$apply(function () {
                $scope.totalViewers = Presence.getOnlineUserCount();
                $scope.listUsers = Presence.getCurrentUsers();
                console.log($scope.listUsers);
            });
        });
               
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
            if ( authData != null ) {
                
//                CALLBACK FROM USER.JS GOES HERE, AS 2ND ARGUMENT TO getUsername METHOD:::
                User.getUsername(authData, function(name) {
                    Presence.setUserStatus(name);
                    $scope.name = name;
                });
            }
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
                username: $scope.name,
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