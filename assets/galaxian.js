$(function() {
    var AliensBuilder;
    
    var GalaxianGame = {
        
        missile: null,
        
        init: function(container){
            this.container = $(container);
        },
        
        buildStage: function(){
            var self = this;
            this.stage = $('<div />').addClass('gx_stage').
                click(function(e){
                    e.stopPropagation();
                    if (!self.missile){
                        self.fire();
                    }
                })
                .appendTo(this.container);
        },
        
        buildHero: function(){
            this.hero = $('<div />').addClass('gs_hero').appendTo(this.stage);
            $('<div />').addClass('gs_hero_plain').appendTo(this.hero).append(
                $('<div />').addClass('gs_missile')
            );
            
        },
        
        fire: function(){
            this.missile = $('<div />').addClass('gs_missile_running');
        },
        
        start: function(){
            this.buildStage();
            this.buildHero();
        }
    };
    
    GalaxianGame.init($('#galaxian'));
    GalaxianGame.start();
});

