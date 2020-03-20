let obj = {
    fn: (function () {
        return function () {
            console.log(this);
        }
    })()
};
obj.fn();
let fn = obj.fn;
fn();


var fullName = 'language';
var obj = {
    fullName: 'javascript',
    prop: {
        getFullName: function () {
            return this.fullName;
        }
    }
};
console.log(obj.prop.getFullName());
var test = obj.prop.getFullName;
console.log(test());


var name = 'window';
var Tom = {
    name: "Tom",
    show: function () {
        console.log(this.name);
    },
    wait: function () {
        var fun = this.show;
        fun();
    }
};
Tom.wait();


window.val = 1;
var json = {
    val: 10,
    dbl: function () {
        this.val *= 2;
    }
}
json.dbl();
var dbl = json.dbl;
dbl();
json.dbl.call(window);
alert(window.val + json.val);


(function () {
    var val = 1;
    var json = {
        val: 10,
        dbl: function () {
            val *= 2;
        }
    };
    json.dbl();
    alert(json.val + val);
})();


var num = 10;
var obj = {
    num: 20
};
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    }
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);