angular.module("PiglatinApp.controllers").controller("PiglatinCtrl", [
    "$scope", "$http", "$timeout", '$window', '$log',
    function ($scope, $http, $timeout, $window, $log) {
      $scope.test = "I am from Controller...";
      $scope.textInput = "";
      $scope.piglatinText = "";
      $scope.showLast10Conversions = false;
      $scope.piglatinTexts = [];

      $scope.processInputText = function(){
          if($scope.textInput.length < 1){
            //If no text entered into TextBox, Do Nothing
            $scope.piglatinText = "Invalid Input. Text not found !!";
            $("#PiglatinApp .result-div .res-btn").removeClass("result-span-success").addClass("result-span-fail");
            return false;
          }else if($.isNumeric($scope.textInput)){
            //If the entered text is numeric then PigLatin Conversion doesn't apply
            $scope.piglatinText = "Invalid Input.Numeric values are not accepted. Conversion failed";
            $("#PiglatinApp .result-div .res-btn").removeClass("result-span-success").addClass("result-span-fail");
            return false;
          }

          //Set the Result button background
          $("#PiglatinApp .result-div .res-btn").attr("class", "res-btn result-span-success");

          //Get 1st letter from the input string
          var firstLetterInText = $scope.textInput.slice(0,1);
          //Check if 1st letter is vowel
          var isVowel = $scope.isVowel(firstLetterInText);

          //Apply corresponding logic based on the letter type
          if(isVowel){
            $scope.getPiglatinText(firstLetterInText, "i");
          }else{
            $scope.getPiglatinText(firstLetterInText, "ay")
          }
      }

      //Convert EnteredText to Piglatin Text
      $scope.getPiglatinText = function(firstLetterInText, additionalLetter){
        var remainingText = $scope.textInput.slice(1);
        $scope.piglatinText = remainingText + firstLetterInText + additionalLetter;
        $scope.piglatinTexts.push({enteredText: $scope.textInput, pigLatinText: $scope.piglatinText});
        $scope.manageLast10Conversions();
        $("#PiglatinApp .user-input").val("");
      }

      //Update Recent 10 Conversions
      $scope.manageLast10Conversions = function()
      {
        if($scope.piglatinTexts.length < 1){
          //If Array is Empty, Do Nothing
          $scope.piglatinText = "Some Error occured";
          return false;
        }else if($scope.piglatinTexts.length > 10){
          //Remove first array item from collection if total Items in the collection are >10
          $scope.piglatinTexts.shift();
        }

        $scope.showLast10Conversions = true;
      }

      $scope.isVowel = function(letter) {
          return !!~"aeiou".indexOf(letter);
      };

      $scope.keypress = function(keyEvent) {
        if (keyEvent.which === 13)
          $scope.processInputText();
      }
    }
]);
