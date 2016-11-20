angular.module('ionicLazyImg', []);
angular.module('ionicLazyImg')
  .directive('lazyImgContainer', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'A',
      link: function ($scope) {
        var origEvent = $scope.$onScroll;
        $scope.$onScroll = function () {
          $rootScope.$broadcast('ionicLazyImgScrolled');
          if (typeof origEvent === 'function') {
            origEvent();
          }
        };
      }
    };
  }])
  .directive('lazyImg', ['$document', '$timeout', '$ionicScrollDelegate', '$compile', function ($document, $timeout, $ionicScrollDelegate, $compile) {
    return {
      restrict: 'A',
      scope: {
        distance: '=',
        ratio: '='
      },
      replace: true,
      link: function (scope, element, attributes) {
        scope.width = element[0].offsetWidth;
        scope.height = parseInt(scope.width * scope.ratio);

        var timer = null;
        var deregistration = null;

        function setEvent() {
          attributes.leftDistance = attributes.leftDistance || 0;
          attributes.rightDistance = attributes.rightDistance || 0;
          attributes.topDistance = attributes.topDistance || 0;
          attributes.bottomDistance = attributes.bottomDistance || 0;

          deregistration = scope.$on('ionicLazyImgScrolled', function () {
            if (timer) {
              clearTimeout(timer);
              timer = null;
            }
            timer = process(element, attributes, function () {
              clearTimeout(timer);
              timer = null;
            })
          });

          element.on('$destroy', function () {
            deregistration()
          });
        }

        if (scope.width) {
          element = transform(scope, element);
          timer = process(element, attributes);
          setEvent();
          return;
        }

        var initTimer = setInterval(function () {
          scope.width = element[0].offsetWidth;
          if (scope.width) {
            scope.height = parseInt(scope.width * scope.ratio);
            element = transform(scope, element);
            clearTimeout(initTimer);
            timer = process(element, attributes);
            setEvent();
          }
        }, 100)
      }
    };

    function transform(scope, element) {
      var DOM = angular.element(
        '<span style="width: {{width}}px; height: {{height}}px; display: block; position: relative;">' +
        '<span style="left: 0; top: 0; position: absolute; width: 100%; height: 100%;" class="lazy-img-background"></span>' +
        '<img class="lazy-img-hide" style="left: 0; top: 0; position: absolute"></span>'
      );
      var $e = $compile(DOM)(scope);
      element.replaceWith($e);
      return $e;
    }

    function process(element, attributes, callback) {
      return setTimeout(function () {
        if (isInView(element, attributes)) {
          load(element, attributes);
        } else {
          unload(element);
        }
        callback && callback();
      }, 100);
    }

    function unload(element) {
      var image = element[0].children[1];
      image.src = '//:0';
      image.classList.remove('lazy-img-show');
    }

    function load(element, attributes) {
      var image = element[0].children[1];
      image.src = attributes['ngSrc'];
      image.onload = function () {
        this.onload = null;
        image.classList.add('lazy-img-show');
        $ionicScrollDelegate.resize();
      }
    }

    function isInView(element, attributes) {
      var clientHeight = $document[0].documentElement.clientHeight;
      var imageRect = element[0].getBoundingClientRect();
      return imageRect.top >= 0 - parseInt(attributes.topDistance) && imageRect.top <= clientHeight + parseInt(attributes.bottomDistance)
    }
  }]);
