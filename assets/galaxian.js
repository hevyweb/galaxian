$(function() {
    var AliensBuilder;
    
    var keys = {
        left: 37,
        //top: 38,
        right: 39,
        //bottom: 40
    };
    
    var GalaxianGame = {
        
        missile: null,
        
        init: function(container){
            this.container = $(container);
        },
        
        buildStage: function(){
            var self = this;
            this.stage = $('<div />').addClass('gx_stage').attr('tabindex', '-1').
                click(function(e){
                    e.stopPropagation();
                    if (!self.missile){
                        self.fire();
                    }
                }).keydown(function(e){
                    self.move(e.keyCode == 39);
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
            var shell = $('.gs_missile');
            var position = shell.offset();
            shell.hide();
            var self = this;
            this.missile = $('<div />').addClass('gs_missile_running').appendTo(this.stage);
            this.missile.css({
                'top': position.top,
                'left': position.left
            }).animate({'top': 0}, 2000, 'linear', function(){
                $(this).remove();
                self.missile = null;
                $('.gs_missile').show();
            });
        },
        
        move: function(direction){
            var left = this.hero.offset().left + (direction ? 5 : -5);
            this.hero.css({left: left});
        },
        
        start: function(){
            this.buildStage();
            this.buildHero();
        }
    };
    
    GalaxianGame.init($('#galaxian'));
    GalaxianGame.start();
});

