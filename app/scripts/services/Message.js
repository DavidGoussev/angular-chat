(function() {
    function Message($firebaseArray) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        var messages = $firebaseArray(firebaseRef.child('messages'));
        
        return {
            
            messages: messages,
            
            send: function(newMessage) {
                return messages.$add(newMessage);
                console.log(newMessage);
            }
        };
    }

    angular
        .module('angularChat')
        .factory('Message', ['$firebaseArray', Message]);

})();
 
 