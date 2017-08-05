/**
 * js-plus - it's my own library of useful functions
 * Author: Ruslan Timurziyev
 * Version: 1.0
 * ---------
 * inDom() - get elements from dom like jquery
 * lastOf() - return last element of array
 * ....
 */

(function(global) {
	function Module() {
		return {

			/**
			 * Methods for dom working ----------------------------------------------------------------
			 */

			dom(el)  {
		    var all = document.querySelectorAll(el);
		    return all.length > 1 ? all : document.querySelector(el);
			},

			hide(el) {
				var el = this.dom(el);
				return el.length > 1 ? el.forEach(i => i.style.display = 'none') : el.style.display = 'none';
			},

			fade(el, spd, dgr) {
				if(typeof dgr !== 'number') throw new Error('Fade: argument "degree" should be a number');
				if(typeof spd !== 'number') throw new Error('Fade: argument "speed" should be a number');
				var el = this.dom(el);
				function addOp(el, val) {el.style.opacity = val;}
				function addTran(el, val) {el.style.transition = `${val}s`;}
				if(el.length > 1) {
					el.forEach(i => {
						addTran(i, spd);
						setTimeout(() => {
							addOp(i, dgr);
						}, 1);
					});
				} else {
					addTran(el, spd)
					setTimeout(() => {
						addOp(el, dgr);
					}, 1);
				}
			},


 


			/**
			 * Object methods ----------------------------------------------------------------
			 */

			sortObjsByField(obj, prop) {
				return obj.sort((a, b) => a[prop] > b[prop]);
			},

			maxOfObj(obj) {
				var newArr = [];
        for(var key in obj) {
          newArr.push(obj[key]);
        }
        return Math.max.apply(null, newArr);
			},

			sumOfObj(obj) {
				var sum = 0;
        for(var key in obj) {
          sum += obj[key];
        }
        return sum;
			},

			isEmpty(obj) {
				for(var key in obj) {
          return false;
        }
        return true;
			},

			cloneObj(obj, newObj) {
				for(var k in obj) {
          newObj[k] = obj[k];
        }
			},




			/**
			 * Number methods ----------------------------------------------------------------
			 */

			sumOfN(n) {
				return n > 0 ? n += this.sumOfN(n - 1) : n;
			},

			factorial(n) {
				var result = n;
        return n > 1 ? result *= this.factorial(n-1) : n;
			},

			pow(a, b) {
				var sum = a;
        for(var i = 1; i < b; b--) {
          sum *= a;
        }
        return sum;
			},

			decimal(n) {
				return (n+"").split('.')[1];
			},

			randomNum(min, max) {
				return Math.random() * (++max - min) + min ^ 0;
			},




			/**
			 * String methods ----------------------------------------------------------------
			 */
			camelCase(str) {
				var newStr = '';
    		var kebab = false;
		    for(var i = 0; i < str.length; i++) {
	        if(str[i] != '-') {
            if(!kebab) {
                newStr += str[i];
            }
            kebab = false;
	        } else {
            newStr += str[i + 1].toUpperCase();
            kebab = true;
	        }
  			}
    		return newStr;
			},

			capitalize(str) {
				return str[0].toUpperCase() + str.slice(1);
			},




			/**
			 * Array methods ----------------------------------------------------------------
			 */

			lastOf(arr) {
				return arr[arr.length - 1];
			},

			randomOf(arr) {
				return arr[~~(Math.random() * arr.length)];
			},

			shuffle(arr) {
			  return arr.sort(() => ~~(Math.random() * arr.length));
			},

			unique(arr) {
				var newArr = [];
		    for(var i = 0; i < arr.length; i++) {
	        if(arr[i] != newArr[newArr.indexOf(arr[i])]) {
	          newArr.push(arr[i]);
	        }
		    }
    		return newArr;
			},

			reverse(arr) {
				return arr.sort((a, b) => b - a);
			},

			lenOfArrVals(arr) {
				return arr.map(item => item.length);
			},

			sumOfArr(arr) {
				return arr.reduce((a, b) => a + b);
			},

			sortArr(arr) {
				return arr.sort((a, b) => a > b);
			},

			sortArrByRange(arr, a, b) {
				var newArr = [];
		    arr.forEach(i => {
	        if(i >= a && i <= b) {
	          newArr.push(i);
	        }
        });
    		return newArr;
			},

			evenInArr(arr) {
				var newArr = [];
				arr.forEach(i => {
					if((typeof i === 'number') && (i % 2 == 0)) {
						newArr.push(i);
					}
				});
    		return newArr;
			}

		}
	}
	global.__ = new Module;
}(window));
