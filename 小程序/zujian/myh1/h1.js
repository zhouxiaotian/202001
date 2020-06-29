Component({
  behaviors: [],
  properties: {
    //类似于 vue的 props
    name:{
      type:String,
      value:'66'
    }
  },
  data: {

  },
  lifetimes: {
    created() {

    },
    attached() {

    },
    moved() {

    },
    detached() {

    },
  },
  methods: {
    www(){
      // this.$emit('myqqq',100)
      this.triggerEvent('myqqq',100)
    }
  },
});