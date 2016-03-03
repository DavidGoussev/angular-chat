(function() {
    function HomeCtrl($scope, $cookies, Room, Message, Auth) {
        $scope.rooms = Room.all;
        
        $scope.auth = Auth.auth;
        
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
        });
        
////        $scope.user = $cookies.get('ngChatCurrentUser');
//        
//        $scope.authenticated = function(authData) {
//
//            Auth.isAuth(authData).then(function(data){
//                console.log('is authenticated!');
//            })
//            
//            $scope.authData = authData;
//        };
        
        


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
                username: $scope.user,
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
        .controller('HomeCtrl', ['$scope', '$cookies', 'Room', 'Message', 'Auth', HomeCtrl]);
})();