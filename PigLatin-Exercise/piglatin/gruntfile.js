module.exports = function(grunt){
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify:{
      t1:{
        options:{
          sourceMap: true
        },
        files:{
          'js/all.min.js' : ['js/vendor/jquery/jquery-3.1.1.min.js'
                            ,'js/vendor/angular/v.1.6.1/angular.min.js'
                            ,'js/angular-apps/app-piglatin/_angularAppPiglatin.js'
                            ,'js/angular-apps/app-piglatin/controllers/c.piglatin.js']
        }
      }
    },

    watch:{
      w1:{
        files:['js/**/*.js'],
        tasks:['uglify:t1']
      }
    }

  });
};
