//THIS IS A CONTROLLER (SIMILAR TO MODALCTRL)

(function() {
    function NgChatCookies($cookies, $uibModal) {
        var currentUser = $cookies.get('ngChatCurrentUser');
        
        if ( !currentUser || currentUser === '') {
            var instance = $uibModal.open({
                templateUrl: '/templates/chatCookiesModal.html',
                controller: 'ChatCookiesModalCtrl',
                size: 'sm'
            });
            
            instance.result.then(function(username) {
                $cookies.put('ngChatCurrentUser', username);
            }, function() {
                // RESERVED FOR CANCEL OPTION 
            });

            
        }
    }
    
    angular
        .module('angularChat')
        .run(['$cookies', '$uibModal', NgChatCookies]);
    
})();