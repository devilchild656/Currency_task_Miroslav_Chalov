currencyApp.controller('formView', ['$scope', function ($scope) {
    $scope.templates =
        [{name: 'rate-form.html', url: 'views/rate-form.html'},
            {name: 'thank-you.html', url: 'views/thank-you.html'}];
    $scope.templates = $scope.templates[0];
}]);

