(function() {
    function HomeCtrl($scope, $cookies, Room, Message) {
        $scope.rooms = Room.all;
        
        $scope.messages = Message.messages;
        
        $scope.user = $cookies.get('ngChatCurrentUser');

        $scope.selected = {
            room: $scope.rooms[0],
        };
        
        $scope.changeRoom = function changeRoom(room) {
            $scope.selected.room = room;
            $scope.listMessages = Room.getMessages(room.$id);
        };        
        
        $scope.deleteRoom = function(roomId) {
            Room.delete(roomId).then(function(data){
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
        .controller('HomeCtrl', ['$scope', '$cookies', 'Room', 'Message', HomeCtrl]);
})();