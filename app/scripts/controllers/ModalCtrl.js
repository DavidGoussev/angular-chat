(function() {
    function ModalCtrl($scope, $uibModal, $log, Auth) {
        
        $scope.auth = Auth.auth;
        
        $scope.auth.$onAuth(function(authData) {
            $scope.authData = authData;
        });

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
            });

        };
    }

    angular
        .module('angularChat')
        .controller('ModalCtrl', ['$scope', '$uibModal', '$log', 'Auth', ModalCtrl]);
})();