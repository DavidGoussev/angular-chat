(function() {
    function Auth($firebaseAuth) {
        var firebaseRef = new Firebase("https://intense-heat-8619.firebaseio.com");
        
//        see disconnect function below:
        var connect = function() {
            Firebase.goOnline();
        };
        
        
        return {
            
            auth: $firebaseAuth(firebaseRef),
                    
//            alternate signout function for use as ng-click function in home template:
            disconnect: function(){
                firebaseRef.unauth();
                Firebase.goOffline();
                setTimeout(connect, 5000);
            }
        }
    }

    angular
        .module('angularChat')
        .factory('Auth', ['$firebaseAuth', Auth]);

})();
 