import Em from 'ember';

export default Em.Component.extend({
  classNames: ["matrixcontainer"],
  target: Em.computed.alias("targetObject"),
  slideIn: function() {
    //this.$(".matrix")
    //  .velocity({marginLeft:"+=200px"},{duration:1000});
  }.on("didInsertElement")
});
