(function() {
    function ChatCookiesModalCtrl($scope, $cookies, $uibModalInstance) {
        
        $scope.addUsername = function(){
            $cookies.put('ngChatCurrentUser', $scope.username);
        
        };
        
        $scope.okCookies = function() {
            $uibModalInstance.close($scope.username);
        };

    }

    angular
        .module('angularChat')
        .controller('ChatCookiesModalCtrl', ['$scope', '$cookies', '$uibModalInstance', ChatCookiesModalCtrl]);
})();