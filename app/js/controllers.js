'use strict';

/* Controllers */
zbierakApp.controller('ZbierakPreviewCtrl', function(ZbierakData, $scope, $rootScope, $routeParams, $timeout, $window, $location, $modal, $log, $cookies) {
    $scope.imageHeap = [];
    $scope.isDefined = angular.isDefined;
    $rootScope.currentImgObject = {};
    $scope.$window = $window;
    $rootScope.isMyCollectionPreview = false;
    $scope.APP_URL = APP_URL;
    $rootScope.menuOpacity = 0.2;
    $rootScope.loaderBleandActive = true;
    $rootScope.imageHeapActive = true;
    $scope.stopLoadingNewData = false;
    $rootScope.pagesLoadedWithNoImagesToSee = 0;
    $rootScope.collectionIndex = -1; // because 0 is first existing index in collection
    $scope.imageBaseUrl = IMAGES_URL;
    $rootScope.loadingInProgress = false;
    $rootScope.collection = [{}];
    $rootScope.myCollection = [];
    $rootScope.zoomImageWidthInPercents = [];
    $rootScope.currentPage = 0;
    $rootScope.heapSizeAssumed = 3;
    $rootScope.canGoNextStep = true;
    $rootScope.canGoPreviousStep = true;
    $scope.displaySorryBlend = false;

    $scope.enableSeenImagesMemoryCollecting = true;
    $scope.enableSeenImagesMemoryNotDisplaying = true;


    var pushNextElementIntoCollection = function( remainingElementsList )
    {
        $timeout(function() {
            var add = function()
            {
                // get one element from list
                var singleElementToAdd = remainingElementsList.shift();

                // looks like there is no more elements
                if (angular.isUndefined(singleElementToAdd) || angular.isUndefined(singleElementToAdd.id))
                {
                    // lower flag
                    $scope.loadingInProgress = false;

                    // unblock going next step
                    $rootScope.canGoNextStep = true;
                    $scope.loaderBleandActive = false;

                    // fill heap if there are any deficiencies
                    fillHeap();

                    // break adding
                    return false;
                }

                // insert element into collection
                $rootScope.collection.push(singleElementToAdd);

                // if there are at least heapSizeAssumed elements heap can be filled
                if ($rootScope.heapSizeAssumed + 1 == $rootScope.collection.length)
                {
                    // remove blend
                    $scope.loaderBleandActive = false;
                    fillHeap();
                }

                // process next data
                pushNextElementIntoCollection( remainingElementsList );
            }
            add();
        }, 150);
    };

    // load from my collection (URL)
    if (angular.isDefined($routeParams.imagesList))
    {
        var urlParam = $routeParams.imagesList;
        if (angular.isUndefined($rootScope.collection))
        {
            $rootScope.collection = [];
        }

        // parsowanie urla
        var urlToParse = urlParam;
        var imgListToParse = urlToParse.split(',');
        var imgListParsed = [];
        var imgListToAddToCollection = [];
        for (var k in imgListToParse)
        {
            var splitedStr = imgListToParse[k].split('_')
            var fileExtension = splitedStr.splice(-1, 1);

            imgListToAddToCollection.push( { full_file_info : splitedStr.join('/') + '.' + fileExtension, id : k, desc : '' } );
        }

        // update 
        $rootScope.myCollectionNumberOfImages = imgListToAddToCollection.length;

        // start adding data
        pushNextElementIntoCollection( imgListToAddToCollection );

        $rootScope.isMyCollectionPreview = true;
    }

    var loadMoreImages = function() {
        // no loading til flags are rised
        if ($scope.loadingInProgress || $scope.stopLoadingNewData)
        {
            return false;
        }

        // rise flag
        $scope.loadingInProgress = true;

        // load next page
        var receivedData = ZbierakData.get({actual_page : ++$rootScope.currentPage}, function(){

            // filter new elements
            var filteredRecivedDataResults = [];
            for (var k in receivedData.results)
            {
                // don't add if we have them in current collection or have seen them before
                if (-1 == $rootScope.collection.indexOf(receivedData.results[k])) 
                {
                    if (true != localStorage.getItem('imageSeen_' + receivedData.results[k].id) || false === $scope.enableSeenImagesMemoryNotDisplaying)
                    {
                        filteredRecivedDataResults.push(receivedData.results[k]);
                    }
                }
            }

            if (filteredRecivedDataResults.length > 0)
            {
                // start adding data 
                pushNextElementIntoCollection( filteredRecivedDataResults );
            }
            else
            {
                $scope.loadingInProgress = false;

                // if still have empty heap - display loader
                if ($scope.imageHeap.length < $rootScope.heapSizeAssumed)
                {
                    $scope.loaderBleandActive = true;
                }

                $rootScope.pagesLoadedWithNoImagesToSee++;

                // @todo: why timeout
                $timeout(function(){
                    // load more
                    loadMoreImages();
                }, 200);
            }
        });
    }

    var updateCurrentImageObject = function() 
    {
        if (angular.isUndefined($scope.imageHeap[1]) || angular.isUndefined($scope.imageHeap[1].id))
        {
            return false;
        }

        // determine current image and make it available globaly
        $rootScope.currentImgObject = $scope.imageHeap[1];

        // mark image as seen
        if ($scope.enableSeenImagesMemoryCollecting)
        {
            localStorage.setItem('imageSeen_' + $scope.imageHeap[1].id, 1)
        }
    }

    // fill heap with elements
    var fillHeap = function()
    {
        // check if there are any deficiencies
        if ($scope.imageHeap.length >= $rootScope.heapSizeAssumed)
        {
            return true;
        }

        // check heap size and fill
        var elementsToAdd = $rootScope.heapSizeAssumed - $scope.imageHeap.length;
        for (var iH = 0; iH < elementsToAdd; iH++)
        {
            // push if there is element in collection to fill heap with
            if (angular.isDefined( $rootScope.collection[ $rootScope.collectionIndex + 1 ] ))
            {
                // dont put same images to the heap
                if ($scope.imageHeap.indexOf($rootScope.collection[ $rootScope.collectionIndex + 1 ]) > -1)
                {
                    return false;
                }

                // update current collectionIndex and add new element
                $scope.imageHeap.push( $rootScope.collection[ ++$rootScope.collectionIndex] );
                
                updateCurrentImageObject();
            }
            else
            {
                // otherwise - block going next step
                $rootScope.canGoNextStep = false;

                // if empty is only one in heap
                if (1 == $scope.imageHeap.length && -1 < $scope.imageHeap.indexOf( $rootScope.collection[0] ))
                {
                    $scope.imageHeap.pop();
                    $scope.loaderBleandActive = true;
                }

                // load more images if it's not isMyCollectionPreview
                if ( !$scope.isMyCollectionPreview)
                {
                    // load more
                    loadMoreImages();
                }

                if (-1 == $scope.imageHeap.indexOf( $rootScope.collection[0] ) )
                {
                    // insert one empty element at the end (if it's not already there) - it helps when we move backwords
                    $scope.imageHeap.push( $rootScope.collection[0] );
                    ++$rootScope.collectionIndex;
                }

                updateCurrentImageObject();

                // we can brek assuming there is no more element to check
                return false;
            }
        }

        return true;
    }

    // START with empty list 
    if ($rootScope.collection.length <= 1 && false == $rootScope.isMyCollectionPreview)
    {
        // preload any data
        loadMoreImages();
    }

    $rootScope.changeImage = function(pSteps) {
        var stepsToTake = pSteps
        if (angular.isObject(pSteps))
        {
            stepsToTake = $rootScope.collection.indexOf(pSteps) - $rootScope.collectionIndex + 1;
        }

        var howManyToRemove = $scope.heapSizeAssumed;
        // replace elements in heap
        var replaceElements = function()
        {
            // remove all elements form heap
            $timeout(function(){ 
                //@todo. add animation
                $scope.imageHeap.shift();

                // fill deficit
                fillHeap();

                if (--howManyToRemove > 0)
                {
                    replaceElements();
                }
            }, 200);
        }

        // next image steps @todo
        if (stepsToTake > 0)
        {
            // checkif we can go next step
            if ( !$rootScope.canGoNextStep)
            {
                // if we are curently loading pages - show ajax rotator
                if ($scope.loadingInProgress)
                {
                    $scope.loaderBleandActive = true;
                }

                // no we cannot
                return false;
            }


            // more than one step forward - exchange all images in heap
            if (stepsToTake > 1)
            {
                // set collection index to see requested item
                // (curent heap start) + steps
                $rootScope.collectionIndex = ($rootScope.collectionIndex - $scope.heapSizeAssumed) + stepsToTake;

                // check if we should load more images
                if ( $rootScope.collectionIndex > $rootScope.collection.length - $scope.heapSizeAssumed - 3 && $rootScope.isMyCollectionPreview == false)
                {
                    loadMoreImages();
                }

                replaceElements();
            }
            // one image step - pop push to imageHeap
            else
            {
                // check if we have empty element in heap 
                var positionOfEmptyElement = $scope.imageHeap.indexOf( $rootScope.collection[0] );
                // if its not at first position [0] we would see it when jumping next element 
                if (0 < positionOfEmptyElement)
                {
                    // remove it
                    $scope.imageHeap.splice(positionOfEmptyElement, 1);
                    --$rootScope.collectionIndex;

                    // fill deficit
                    fillHeap();
                }

                // remove first element form heap
                $scope.imageHeap.shift();

                // fill deficit
                fillHeap();

                // check if we should load more images
                if ( $rootScope.collectionIndex > $rootScope.collection.length - 7 && $rootScope.isMyCollectionPreview == false)
                {
                    loadMoreImages();
                }
            }
        }
        // previous image step
        else if (stepsToTake < 0)
        {
            // checkif we can go next step
            if ( !$rootScope.canGoPreviousStep)
            {
                // no we cannot
                return false;
            }

            // check if previous jump is possible
            if (angular.isUndefined( $rootScope.collection[$rootScope.collectionIndex - $scope.heapSizeAssumed] ))
            {
                return false;
            }

            // replace firs and last element in image heap
            $scope.imageHeap.pop();
            $scope.imageHeap.unshift( $rootScope.collection[$rootScope.collectionIndex - $scope.heapSizeAssumed] );

            // jump one step back
            $rootScope.collectionIndex--;

            updateCurrentImageObject();

            // unblock going next step
            $rootScope.canGoNextStep = true;

            // determine current image and make it available globaly
            updateCurrentImageObject();
        }
    };

    $rootScope.addToMyCollection = function(pImgObject, $event)
    {
        angular.isDefined($event) ? $event.stopPropagation() : null;

        if ( !$rootScope.isInMyCollection(pImgObject))
        {
            $rootScope.myCollection.push(pImgObject);
        }
        else
        {
            $scope.removeFromMyCollection(pImgObject);
        }
        $timeout(function(){$scope.generateGalleryLink()});
    }

    $scope.removeFromMyCollection = function(pImgObject, $event)
    {
        angular.isDefined($event) ? $event.stopPropagation() : null;

        var index = $rootScope.myCollection.indexOf(pImgObject);
        if (index > -1) 
        {
            $rootScope.myCollection.splice(index, 1);
            return true;
        }
        return false;
    }

    $scope.openInNewWindow = function(pImgObject, $event)
    {
        angular.isDefined($event) ? $event.stopPropagation() : null;
        $window.open($scope.imageBaseUrl + pImgObject, '_blank'); 
    }

    $rootScope.isInMyCollection = function(pElem)
    {
        var index = $rootScope.myCollection.indexOf(pElem);
        if (index > -1) 
        {
            return true;
        }
        return false;
    }

    $scope.inCollection = function(pElem)
    {
        if (angular.isUndefined($scope.collection))
            return false;

        for (var i in $scope.collection)
        {
            if ($scope.collection[i] === pElem) 
            {
                return true;
            }
        }
        return false;
    }

    $scope.$watchCollection('myCollection', function(myCollection) {
        $rootScope.myCollectionLinksList = ''; 
        for (var k in myCollection)
        {
            $rootScope.myCollectionLinksList = 
                $rootScope.myCollectionLinksList 
                + $scope.imageBaseUrl + myCollection[k].full_file_info + "\n"; 
        }
    }, true);

    // one click select
    $('.oneClickMarkTA').click(function(event){
        this.select();
    });

    $scope.generateGalleryLink = function(){
        if ($rootScope.myCollectionLinksList.length == 0)
        {
            return false;
        }

        var imageUrls = $rootScope.myCollectionLinksList.split("\n");
        var shavedLinks = [];
        for (var k in imageUrls)
        {
            if ('' != imageUrls[k])
            {
                var shavedLink = imageUrls[k].replace($scope.imageBaseUrl, '');
                shavedLink = shavedLink.replace(/\//g, '_');
                shavedLink = shavedLink.replace('.', '_');
                shavedLinks.push( shavedLink );
            }
        }

        if ($rootScope.myCollectionLinksList.length == 1)
        {
            $rootScope.myCollectionGalleryLink = 'select at least 2 images to My Collection';
        }
        else
        {
            $rootScope.myCollectionGalleryLink = 'http://' + $location.host() + '/#/share/' + shavedLinks.join(',');
        }
    }

    $scope.clearMyCollection = function() {
        $rootScope.myCollection = [];
    };

    $scope.imsc = {width : 'auto', height: 'auto'};

    $scope.imgButtons = {
        new_windo : {},
        show_url : {},
        add_remove_my_collection : {},
        zoom_in_out : {
            ico : 'icon-fullscreen',
            button_class : ''
        }
    };

    $rootScope.fullscreen = function(event) {
        angular.isDefined(event) ? event.stopPropagation() : null;
        screenfull.toggle( $('#image_heap')[0] );
    };
    $scope.screenfull = screenfull;

    $scope.about = function (isStartup) {

        var modalInstance = $modal.open({
            templateUrl: CDN_URL + 'template/popover/about.html',
            controller: ModalInstanceCtrl,
            resolve: {
                isStartup: function(){ return isStartup; }
            }
        });
    };

    var ModalInstanceCtrl = function ($scope, $modalInstance, isStartup) {
        $scope.dontShow = $cookies.dont18PlusShowMessageAgain
        $scope.isStartup = isStartup;

        $scope.reloadPage = function()
        {
            window.open(APP_URL, '_self');
        }

        $scope.openDevfuze = function()
        {
            window.open('http://devfuze.com', '_blank');
        }

        $scope.tooYoung = function()
        {
            window.open('http://www.youtube.com/watch?v=XnVQ24d4664', '_self');
        }
        
        $scope.clearStorage = function()
        {
            localStorage.clear();
        }

        $scope.ok = function (dont18PlusShowMessageAgain) {

            if (angular.isDefined(dont18PlusShowMessageAgain) && 'yes' == dont18PlusShowMessageAgain)
            {
                // set cookie
                $cookies.dont18PlusShowMessageAgain = 'yes';
            }
            else if (angular.isDefined(dont18PlusShowMessageAgain))
            {
                // disable cookie
                $cookies.dont18PlusShowMessageAgain = 'no';
            }

            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };

    if (false === $rootScope.isMyCollectionPreview)
    {
        // show at the begining
        // if coockie is not set
        if (angular.isUndefined($cookies.dont18PlusShowMessageAgain) || 'yes' !== $cookies.dont18PlusShowMessageAgain)
        {
            $scope.about(true);
        }
    }

    $scope.shortcutButton = {
        button_q : {class : '', timeoutToReset : null},
        button_w : {class : '', timeoutToReset : null},
        button_e : {class : '', timeoutToReset : null},
        button_a : {class : '', timeoutToReset : null},
        button_s : {class : '', timeoutToReset : null},
        button_d : {class : '', timeoutToReset : null},
        button_f : {class : '', timeoutToReset : null},
        button_z : {class : '', timeoutToReset : null},
        button_c : {class : '', timeoutToReset : null}
    };

    $rootScope.cssFakePressOfShortcutButtons = function(button, timeout) {
        if (angular.isUndefined(timeout))
            timeout = 200;

        // set active
        $scope.shortcutButton['button_' + button].class = 'active';

        // reet active after some time
        $timeout.cancel($scope.shortcutButton['button_' + button].timeoutToReset);
        $scope.shortcutButton['button_' + button].timeoutToReset = $timeout(function(){
            $scope.shortcutButton['button_' + button].class = '';
        }, timeout);
    };

    $scope.keyPress = function(key) {
        switch (key)
        {
            // focus desc
            case 'E': // E
                $timeout.cancel($scope.$parent.guiHighLight);
                if (1 != $scope.$parent.menuOpacity)
                {
                    $scope.$parent.menuOpacity = 1;
                    $scope.$parent.guiHighLight = $timeout(function(){ $scope.$parent.menuOpacity = 0.2 }, 3000);
                }
                else
                {
                    $scope.$parent.menuOpacity = 0.2;
                }

                break;

            // autoplay
            case 'X':
                break;

            // fullscreen
            case 'F': // F
                $scope.fullscreen();
                break;

            // scroll up
            case 'W':
                $(".heap1 .mainImageContainer").stop(true, true).animate( { scrollTop : $(".heap1 .mainImageContainer").scrollTop() - ($('.mainImageContainer').height() * 0.35) }, 800, 'easeOutExpo');
                break;

            // scroll down
            case 'S': // S
                $(".heap1 .mainImageContainer").stop(true, false).animate( { scrollTop : $(".heap1 .mainImageContainer").scrollTop() + ($('.mainImageContainer').height() * 0.50) }, 800, 'easeOutExpo');
                break;

            // zoom in
            case 'Q':
                    if ($scope.$parent.currentImgObject.widthPercents < 100)
                    {
                        if ($scope.$parent.currentImgObject.widthPercents + 10 > 100)
                        {
                            $scope.$parent.currentImgObject.widthPercents = 100;
                        }
                        else
                        {
                            $scope.$parent.currentImgObject.widthPercents += 10;
                        }
                    }
                break;

            // zoom out
            case 'Z':
                if (angular.isDefined($scope.$parent.currentImgObject.widthPercents))
                {
                    if ($scope.$parent.currentImgObject.widthPercents > 20)
                    {
                        if ($scope.$parent.currentImgObject.widthPercents - 10 < 20)
                        {
                            $scope.$parent.currentImgObject.widthPercents = 20;
                        }
                        else
                        {
                            $scope.$parent.currentImgObject.widthPercents -= 10;
                        }
                    }
                }
                break;

            // add to my collection
            case 'C':
                $scope.addToMyCollection($scope.currentImgObject);
                $scope.myCollection;
                break;

            // next image
            case 'D':
                $scope.changeImage(1);
                break;

            // previous image
            case 'A':
                $scope.changeImage(-1);
                break;
        }
    }

    $scope.stopLoadingNewDataSwitch = function() {
        $scope.stopLoadingNewData = !$scope.stopLoadingNewData;
        $scope.loaderBleandActive = true;
        $scope.displaySorryBlend = true;
    }

    $scope.hideLoaderBlend = function() {
        $scope.loaderBleandActive = false;
    }
});

$(function(){
    // trigger the onchange() to set the initial values
    document.addEventListener(screenfull.raw.fullscreenchange, function () {
        var elem = screenfull.element;
    });
});