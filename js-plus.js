/**
 * jPlus - useful functions
 * Author: Ruslan Timurziyev (sawuer)
 * Version: 1.0
 */

window.jP = (function() {
	
	/****************************************
	 * Private functions ********************
	 ****************************************/

	/**
	 * Checking on empty data and data type
	 */
	function checkEmpty(method, arg, argName) {
		if (arg === undefined) {
			throw new Error(`${method}: argument "${argName}" should not be empty`);
		}
	}	

	function checkType(method, arg, argName, type) {
		if (type === 'str') {
			if (typeof arg !== 'string') {
				throw new Error(`${method}: argument "${argName}" should be a string`);
			}
		} else if (type === 'num') {
			if (typeof arg !== 'number') {
				throw new Error(`${method}: argument "${argName}" should be a number`);
			}
		}
	}

	/****************************************
	 * Library methods **********************
	 ****************************************/
	return {

		/*************************************
		 * Methods for dom working ***********
		 *************************************/

		/**
		 * Get elements from dom like jquery's $
		 */
		_(el)  {
			checkType('_', el, 'el', 'str');
	    var all = document.querySelectorAll(el);
	    return all.length > 1 ? all : document.querySelector(el);
		},

		hide(el) {
			var el = this._(el);
			return el.length > 1 ? el.forEach(i => i.style.display = 'none') : el.style.display = 'none';
		},

		show(el) {
			var el = this._(el);
			if (el.length > 1) {
				el.forEach(i => {
					 i.style.display = 'block';
					 i.style.opacity = 1;
				});
			} else {
				el.style.display = 'block';
				el.style.opacity = 1;
			}
		},

		toggle(el) {
			checkEmpty('Toggle', el, 'el');
			checkType('Toggle', el, 'el', 'string');
			function block(el) {return el.style.display = 'block';}
			function none(el) {return el.style.display = 'none';}
			var el = this._(el);
			if (el.length > 1) {
				el.forEach(i => {
					if (i.style.display != 'none') {
						none(i);
					} else {
						block(i);
					}
				});
			} else {
				if (el.style.display == 'block') {
					none(el);
				} else {
					block(el);
				}
			}
		},

		fade(el, spd, dgr) {
			checkEmpty('fade', el, 'el');
			checkEmpty('fade', spd, 'spd');
			checkEmpty('fade', dgr, 'dgr');
			checkType('fade', el, 'el', 'string');
			checkType('fade', spd, 'spd', 'number');
			checkType('fade', dgr, 'dgr', 'number');
			
			function addOp(el, val) {el.style.opacity = val;}
			function addTran(el, val) {el.style.transition = `${val}s`;}
			var el = this._(el);
			
			if (el.length > 1) {
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
		 * End of Methods for dom working
		 */

		/**************************************
		 * Object methods *********************
		 **************************************/

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
      for (var key in obj) {
        sum += obj[key];
      }
      return sum;
		},

		isEmpty(obj) {
			for (var key in obj) {
        return false;
      }
      return true;
		},

		cloneObj(obj, newObj) {
			for (var k in obj) {
        newObj[k] = obj[k];
      }
		},
		/**
		 * End of Object methods
		 */

		/**************************************
		 * Number methods *********************
		 **************************************/

		sumOfN(n) {
			return n > 0 ? n += this.sumOfN(n - 1) : n;
		},

		factorial(n) {
			var result = n;
      return n > 1 ? result *= this.factorial(n-1) : n;
		},

		pow(a, b) {
			var sum = a;
      for (var i = 1; i < b; b--) {
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
		 * End of Number methods
		 */

		/***************************
		 * String methods **********
		 ***************************/

		camelCase(str) {
			var newStr = '';
  		var kebab = false;
	    for (var i = 0; i < str.length; i++) {
        if (str[i] !== '-') {
          if (!kebab) {
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

		isPolindrome(str) {
			var 
				split = str.split(''), 
				left = [],
				right = [];
			for (var i = 0; i < Math.ceil(split.length / 2); i++) {
				left.push(split[i]);
			}
			for (var i = ~~(split.length / 2); i >= 0; i--) {
				right.push(split[i]);
			}
			right.reverse();
			for (var i = 0; i < right.length; i++) {
				if (left[i] !== right[i]) {
					return false
				}
			}
			return true;
		},

		capitalize(str) {
			return str[0].toUpperCase() + str.slice(1);
		},
		/**
		 * End of String methods
		 */

		/***************************
		 * Array methods ***********
		 ***************************/

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
	    for (var i = 0; i < arr.length; i++) {
        if (arr[i] != newArr[newArr.indexOf(arr[i])]) {
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
        if (i >= a && i <= b) {
          newArr.push(i);
        }
      });
  		return newArr;
		},

		evenInArr(arr) {
			var newArr = [];
			arr.forEach(i => {
				if ((typeof i === 'number') && (i % 2 == 0)) {
					newArr.push(i);
				}
			});
  		return newArr;
		},

		/**
		 * Find missing num from 1 to arr.length
		 */
		missing(arr) {
			var arrOfNums = [];
			for (var i = 1; i <= Math.max(...arr); i++) {
				arrOfNums.push(i);
			}
			var missing = [];
			arr.sort((a, b) => a > b);
			for (var i = 0; i < Math.max(...arr); i++) {
				if (!arr.includes(arrOfNums[i])) {
					missing.push(arrOfNums[i]);
				}
			}
			if (missing.length === 0) {
				return false;
			}
			return missing;
		}
		/**
		 * End of Array methods
		 */

	}

}());
