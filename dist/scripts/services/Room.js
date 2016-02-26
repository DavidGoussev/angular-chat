(function () {
    function Room($firebaseArray) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        var rooms = $firebaseArray(firebaseRef.child('rooms'));
//        var messages = $firebaseArray(firebaseRef.child('messages'));
        
        
        return {
            all: rooms,
            
//            messages: messages,
            
            create: function(newRoom) {
                return rooms.$add(newRoom)
            },
            
            getMessages: function(roomId) {
                var filteredMessages = firebaseRef.child('messages').orderByChild('roomId').equalTo(roomId);
                return $firebaseArray(filteredMessages);
            },
            
            delete: function(roomId) {
                return rooms.$remove(roomId)
            }
        };
        

    }
    
    angular
        .module('angularChat')
        .factory('Room', ['$firebaseArray', Room]);
})();