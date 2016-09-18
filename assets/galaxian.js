$(function() {
    var enemyInterface = {
        fire: function(){},
        fly: function(){}
    };
    
    var enemyBuilder = {
        types: {},
        
        build: function(type){
            var place = $('<div />').addClass('gx_enemy_place');
            if (type != null){
                if (this.types[type] === undefined){
                    this.types[type] = $('<div />').addClass('gx_enemy gx_enemy_' + type);
                }
                this.types[type].clone().appendTo(place);
            }
            return place;
        }
    };
    
    var keys = {
        left: 37,
        //top: 38,
        right: 39
        //bottom: 40
    };
    
    var enemyMap = [
        [null, null, null, 'general', null, null, 'general', null, null, null],
        [null, null, 'colonel', 'colonel', 'colonel', 'colonel', 'colonel', 'colonel', null, null],
        [null, 'major', 'major', 'major', 'major', 'major', 'major', 'major', 'major', null],
        ['soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier'],
        ['soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier'],
        ['soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier','soldier']
    ];
    
    var GalaxianGame = {
        
        missile: null,
        
        map: [],
        
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
            }).animate({'top': 0},{
                duration: 2000,
                easing: 'linear',
                complete: function(){
                    $(this).remove();
                    self.missile = null;
                    $('.gx_missile').show();
                },
                step: function(Y){
                    var X1 = parseInt($(this).offset().left);
                    var X2 = X1 + $(this).width();
                    for(;X1<=X2; X1++ ){
                        if (self.map[X1] != undefined || self.map[X1] != null){
                            var enemy = self.map[X1];
                            if ((enemy.offset().top + enemy.height())>=Y){
                                self.map[X1] = null;
                                self.rebuildMapFragment(self.map[X1]);
                                enemy.remove();
                                $(this).finish();
                            }
                        }
                    }
                }
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
            var self = this;
            $('.gx_enemy').each(function(key, enemy){
                self.rebuildPosMap($(enemy));
            });                                             
        },
        
        rebuildPosMap: function(o)
        {
            var coordinates = o.offset();
            var x1 = coordinates.left;
            var x2 = x1 + o.width();
            var y = coordinates.top + o.height();
            var cache;
            var cacheY;
            for(;x1<=x2;x1++){
                if (this.map[x1] !== undefined && this.map[x1] !== null){
                    if (!this.map[x1][0] !== o[0]){
                        if (cache == null || !this.map[x1][0] !== cache[0]){
                            cache = this.map[x1];
                            cacheY = cache.offset().top + cache.height();
                        }
                        if  (cacheY < y){
                            this.map[x1] = o;
                        }
                    }
                } else {
                    this.map[x1] = o;
                }
            }
        },
        
        rebuildMapFragment: function(fragment)
        {
            
            var X1 = fragment.offset().left;
            var X2 = X1 + fragment.width();
            for (;X1<=X2;X1++){
                this.map[X1] = null;
            }
        }
    };
    
    GalaxianGame.init($('#galaxian'));
    GalaxianGame.start();
});

$.fn.rect = function(){
    var data = this.offset();
    data.w = this.width();
    data.h = this.height();
    return data;
};