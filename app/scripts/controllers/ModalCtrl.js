(function() {
    function ModalCtrl($scope, $uibModal, $log) {

        $scope.animationsEnabled = true;

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                size: size,
            });

//            modalInstance.result.then(function (selectedItem) {
//                $scope.selected = selectedItem;
//            }, function () {
//                $log.info('Modal dismissed at: ' + new Date());
//            });
        };

//        $scope.toggleAnimation = function () {
//            $scope.animationsEnabled = !$scope.animationsEnabled;
//        };
    }

    angular
        .module('angularChat')
        .controller('ModalCtrl', ['$scope', '$uibModal', '$log', ModalCtrl]);
})();