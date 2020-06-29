Component({
  behaviors: [],
  properties: {

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
    fn(e){
      console.log(e)
      this.triggerEvent('close123')
    },
    fn2(){}
  },
});