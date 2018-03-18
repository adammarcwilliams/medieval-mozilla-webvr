AFRAME.registerComponent('catapult-listener', {
    schema: {
        catapult: {type: 'selector'},
        projectile: {type: 'selector'},
        cooldown: {type: 'number', default: 5000}
    },

    init: function () {
      console.log('Hello, catapult!, data is: ', this.data);
      console.log('Catapult', this.data.catapult.components.sound)
    
      // Bind Methods & add event listeners
      this.handleTrigger = this.handleTrigger.bind(this);
      this.el.addEventListener('mouseenter', this.handleTrigger);
    },

    handleTrigger: function () {
      console.log('catapult triggered');
      console.log('Projectile', this.data.projectile.components)
      // remove event listener and add it back after cooloff time
      this.el.removeEventListener('mouseenter', this.handleTrigger)
      setTimeout(() => { this.el.addEventListener('mouseenter', this.handleTrigger); }, this.data.cooldown);

      // Play sound on catapult
      this.data.catapult.components.sound.playSound();

      this.data.projectile.emit('fire');
      
      // TweenMax.set(this.data.projectile.components.alongpath.data, {progress: 0});
      // TweenMax.to(this.data.projectile.components.alongpath.data, 2, {progress: 1, ease: Power0.easeNone, onComplete: () => {
      //   this.data.projectile.components.sound.playSound();
      // }});
    },

    tick: function () {

    },

    remove: function () {
      this.el.removeEventListener('mouseenter', this.handleTrigger)
    }
  });