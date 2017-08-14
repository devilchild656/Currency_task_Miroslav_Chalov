currencyApp.controller('ratesForm', ['$scope','$http', function($scope,$http) {

    //Currency info and price
    var original = {
        buy: '',
        sell: ''
    };
    $scope.buttonStep = 0;
    $scope.values = angular.copy($scope.original);
    $scope.currencies = ["GBP","EUR","BGN","USD"];
    $scope.targetRate = '';


    //Removing minus from input fields
    var zeroFields = document.getElementsByClassName('number');
    for(i = 0; i < zeroFields.length; i++){
        zeroFields[i].onkeydown = function(e) {
            if(!((e.keyCode > 95 && e.keyCode < 106)
                    || (e.keyCode > 47 && e.keyCode < 58)
                    || e.keyCode == 8)) {
                return false;
            }
        }
    }
    //Get Values from fields
    $scope.getRate = function() {
        var buy = Number($scope.values.buy);
        var sell = Number($scope.values.sell);
        var buyCurrency = $scope.buyCurrency;
        var sellCurrency = $scope.sellCurrency;
        alert(buy || sell);
        alert(buyCurrency + ' ' + sellCurrency);
    };

    // Clear Fields if changed buy sell
    $scope.clearFields = function() {
        var diff = findDiff(original, $scope.values);

        if(diff['buy']) {

            $scope.values.sell = '';
        }
        if(diff['sell']){
            $scope.values.buy = '';
        }

        $scope.original = angular.copy($scope.values);
    };

    function findDiff(original, edited) {
        var diff = {};
        for (var key in original) {
            if (original[key] !== edited[key]) {
                diff[key] = edited[key];
            }
        }
        return diff;
    }
//   Steps for  3 step Button views
    $scope.nextStepButton  = function () {
        $scope.buttonStep ++;
    };

    //Http Request for sending to Api

    $scope.sendRates = function sendRates() {
        var userEmail = 'stevan@litobac.com';
        var apiKey = 'zg758gA4XplGhXWDagQL7tfeNM9qsNyq';
        var authorizationCode = btoa(userEmail + ':' + apiKey);
        var targetRate = $scope.targetRate;
        var buyAmount = Number($scope.values.buy);
        var sellAmount = Number($scope.values.sell);
        var sellCurrency = $scope.sellCurrency;
        var buyCurrency = $scope.buyCurrency;
        var side = buyAmount ? 'buy' : 'sell';

        var rateDto = {
            'sell_currency': sellCurrency,
            'buy_currency': buyCurrency,
            'side': side,
            'amount': buyAmount || sellAmount,
            'target_rate': targetRate,
            'book': false,
            'reason': "Payments"
        };
        $http({
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + authorizationCode,
                'Content-Type': 'application/json'
            },
            url: 'http://stage.currencytransfer.com/api/v1/rate_alerts',
            data: JSON.stringify(rateDto)
        })
            .then(function successCallback(response) {
                console.log(response);

            }, function errorCallback(response) {
            });

    }

}]);

currencyApp.filter('currencyFilter', function() {
    return function (currencies, usedCurrency) {
        return currencies.filter(function(c) {
            return c !== usedCurrency;
        });
    }

});

