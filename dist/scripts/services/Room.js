(function () {
    function Room($firebaseArray) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        var rooms = $firebaseArray(firebaseRef.child('rooms'));
        
        return {
            all: rooms
        };
    
    }
    
    angular
        .module('angularChat')
        .factory('Room', ['$firebaseArray', Room]);
})();