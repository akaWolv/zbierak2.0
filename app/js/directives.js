'use strict';

/* Directives */


angular.module('zbierak.directives', []).
    directive('appVersion', ['version', function(version) {
        return function(scope, elm, attrs) {
            elm.text(version);
        };
    }])
    .directive('zbierakImageSrc', function($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                if (angular.isUndefined(attrs.zbierakImageSrc))
                    return false;

                // initial margin
                scope.image.marginTop = '5%';

                elem.attr({'src' : attrs.zbierakImageSrc});
                elem.bind('load', function(){ 
                    scope.image.zoom = elem.width() / elem.parent().width() * 100;
                });

                // if not loaded for 1 second - give it 50% width
                $timeout(function(){
                    if (angular.isUndefined(scope.image.widthPercents))
                    {
                        scope.image.zoom = 50;
                    }
                }, 1000);

                scope.$watch('image.widthPercents', function() {
                    if (elem.width() > 0)
                        setImgMarginTop();
                });

                function setImgMarginTop()
                {
                    var imgHeightCalculated = (scope.image.widthPercents/100) * elem.parent().width() / (elem.width() / elem.height());
                    if (elem.parent().width() >= elem.width() && elem.parent().height() > imgHeightCalculated)
                    {
                        scope.image.marginTop = (elem.parent().height() / 2) - ( imgHeightCalculated / 2);
                    }
                    else
                    {
                        scope.image.marginTop = 0;
                    }
                }
            }
        }
    })    
    .directive('zoom', function() {
        return {
            restrict: 'E',
            scope: {
                value: '=',
                image: '=',
                imgstyle : '='
            },
            link: function(scope, elem, attr) {
                if (angular.isUndefined(scope.image))
                    return false;

                scope.$watch('value', function() {
                    scope.image.widthPercents = scope.value;
                });
            }
        }
    })
    .directive('shortcut', function($timeout) {
        return {
            restrict: 'E',
            replace: true,
            scope: true,
            link: function postLink(scope, iElement, iAttrs) {
                jQuery(document).on('keypress', function(e) {
                    // define action and reaction
                    switch (e.which)
                    {

                        // focus desc
                        case 101: // e
                        case 69: // E
                            scope.cssFakePressOfShortcutButtons('e');
                            $timeout.cancel(scope.$parent.guiHighLight);
                            if (1 != scope.$parent.menuOpacity)
                            {
                                scope.$apply(scope.$parent.menuOpacity = 1);
                                scope.$parent.guiHighLight = $timeout(function(){ scope.$parent.menuOpacity = 0.2 }, 3000);
                            }
                            else
                            {
                                scope.$apply(scope.$parent.menuOpacity = 0.2);
                            }
                            break;

                        // autoplay
                        case 120: // x
                        case 88: // X
                            break;

                        // fullscreen
                        case 102: // f
                        case 70: // F
                            scope.cssFakePressOfShortcutButtons('f');
                            scope.fullscreen();
                            break;

                        // scroll up
                        case 119: // w
                        case 87: // W
                            scope.cssFakePressOfShortcutButtons('w');
                            $timeout(function(){ $(".heap1 .mainImageContainer").stop(true, true).animate( { scrollTop : $(".heap1 .mainImageContainer").scrollTop() - ($('.mainImageContainer').height() * 0.35) }, 800, 'easeOutExpo'); }, 0);
                            break;

                        // scroll down
                        case 115: // s
                        case 83: // S
                            scope.cssFakePressOfShortcutButtons('s');
                            $timeout(function(){ $(".heap1 .mainImageContainer").stop(true, false).animate( { scrollTop : $(".heap1 .mainImageContainer").scrollTop() + ($('.mainImageContainer').height() * 0.50) }, 800, 'easeOutExpo'); }, 0);
                            break;

                        // zoom in
                        case 113: // q
                        case 81: // Q
                        case 61: // =
                        case 43: //+
                            scope.cssFakePressOfShortcutButtons('q');
                            if (scope.$parent.currentImgObject.widthPercents < 100)
                            {
                                if (scope.$parent.currentImgObject.widthPercents + 10 > 100)
                                {
                                    scope.$parent.currentImgObject.widthPercents = 100;
                                }
                                else
                                {
                                    scope.$parent.currentImgObject.widthPercents += 10;
                                }
                                scope.$apply(scope.$parent.zoomImageWidthInPercents);
                            }
                            break;

                        // zoom out
                        case 45: // -
                        case 122: // z
                        case 90: // Z
                            scope.cssFakePressOfShortcutButtons('z');
                            if (scope.$parent.currentImgObject.widthPercents > 20)
                            {
                                if (scope.$parent.currentImgObject.widthPercents - 10 < 20)
                                {
                                    scope.$parent.currentImgObject.widthPercents = 20;
                                }
                                else
                                {
                                    scope.$parent.currentImgObject.widthPercents -= 10;
                                }
                                scope.$apply(scope.$parent.zoomImageWidthInPercents);
                            }
                            break;

                        // add to my collection
                        case 99: // c
                        case 67: // C
                            scope.cssFakePressOfShortcutButtons('c');
                            scope.addToMyCollection(scope.currentImgObject);
                            scope.$apply(scope.myCollection);
                            break;

                        // next image
                        case 32: // space
                        case 100: // d
                        case 68: // D
                            scope.cssFakePressOfShortcutButtons('d');
                            scope.$apply(scope.changeImage(1));
                            break;

                        // previous image
                        case 97: // a
                        case 65: // A
                            scope.cssFakePressOfShortcutButtons('a');
                            scope.$apply(scope.changeImage(-1));
                            break;
                    }
                });
            }
        }
    });



var pfx = ["webkit", "moz", "ms", "o", ""];
function RunPrefixMethod(obj, method) {
    var p = 0, m, t;
    while (p < pfx.length && !obj[m]) {
        m = method;
        if (pfx[p] == "") {
            m = m.substr(0,1).toLowerCase() + m.substr(1);
        }
        m = pfx[p] + m;
        t = typeof obj[m];
        if (t != "undefined") {
            pfx = [pfx[p]];
            return (t == "function" ? obj[m]() : obj[m]);
        }
        p++;
    }
}