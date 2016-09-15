$(function() {
    var enemyInterface = {
        fire: function(){},
        fly: function(){},
    };
    
    var enemyBuilder = {
        types: {},
        
        build: function(type){console.log(type);
            var place = $('<div />').addClass('gx_enemy_place');
            if (type != null){
                if (this.types[type] === undefined){
                    this.types[type] = $('<div />').addClass('gx_enemy_' + type);
                }
                this.types[type].clone().appendTo(place);
            }
            return place;
        }
    };
    
    var keys = {
        left: 37,
        //top: 38,
        right: 39,
        //bottom: 40
    };
    
    var enemyMap = [
        [null, null, null, 'general', null, null, 'general', null, null, null],
        [null, null, 'colonel', 'colonel', 'colonel', 'colonel', 'colonel', 'colonel', null, null],
        [null, 'major', 'major', 'major', 'major', 'major', 'major', 'major', 'major', null],
        ['soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier'],
        ['soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier'],
        ['soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier']
    ]
    
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
            this.hero = $('<div />').addClass('gx_hero').appendTo(this.stage);
            $('<div />').addClass('gx_hero_plain').appendTo(this.hero).append(
                $('<div />').addClass('gx_missile')
            );
        },
        
        buildEnemy: function(){
            this.enemyContainer = $('<div />').addClass('gx_enemies').appendTo(this.stage);
            var row;
            for(var r = 0; r < enemyMap.length; r++){
                row = $('<div />').addClass('gx_enemy_row').appendTo(this.enemyContainer);
                for(var e = 0; e < enemyMap[r].length; e++){
                    enemyBuilder.build(enemyMap[r][e]).appendTo(row);
                }
            }
        },
        
        fire: function(){
            var shell = $('.gx_missile');
            var position = shell.offset();
            shell.hide();
            var self = this;
            this.missile = $('<div />').addClass('gx_missile_running').appendTo(this.stage);
            this.missile.css({
                'top': position.top,
                'left': position.left
            }).animate({'top': 0}, 2000, 'linear', function(){
                $(this).remove();
                self.missile = null;
                $('.gx_missile').show();
            });
        },
        
        move: function(direction){
            var left = this.hero.offset().left + (direction ? 5 : -5);
            this.hero.css({left: left});
        },
        
        start: function(){
            this.buildStage();
            this.buildHero();
            this.buildEnemy();
        }
    };
    
    GalaxianGame.init($('#galaxian'));
    GalaxianGame.start();
});

