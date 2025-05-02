## 八股（困难版）之JS

### 1.数据类型
- 基本数据类型：Number Boolean String Null Undefined Symbol
  基本数据类型储存在栈中，这些类型在存中分别占有固定大小的空间，通过按值来访问。
- 引用数据类型：Array(特殊的Object，key是下标) Object
  引用数据类型储存在堆中，栈中会存放它们的地址。当查询引用类型的变量时， 先从栈中读取内存地址， 然后再通过地址找到堆中的值。
### 2.var let const
- Var
  用于声明全局变量，在ES6之前使用。
  使用var声明的变量存在变量提升的情况，即可以先使用后声明，不过使用的时候是使用undefined
  使用var，我们能够对一个变量进行多次声明，后面声明的变量会覆盖前面的变量声明；
  在函数中使用使用var声明变量时候，该变量是局部的。
- Let
  let是ES6中新增的一个用于声明变量的方式，只在它所在的代码块内有效，用let声明的变量可以改变值。
- const
  const也是ES6中新增的一个用于声明变量的方式，与let不同的是，用const声明的变量不能改变值，是只读的，一般用const来声明引用类型变量或一些常量。
  let和const不存在变量提升，但存在“暂时性死区”，即只有等到声明变量的那一行代码出现，才可以获取和使用该变量。

```
// 在ES5中实现let 和 const
// 分析：let 和 const 之于var 的区别就是，块级作用域，不可重复声明，const还不允许再次赋值，因此需要借助立即执行函数，在{}使用var，实现块级作用域

// let
(function(){
var a = 1
console.log(a)
})()

// const
var const = function(data, value){
window.data = value // 把value挂载到window下面，实现全局变量
Object.defineProperty(window, data, { // 利用Object.defineProperty的能力劫持当前对象，并修改其属性描述符
enumerable: false,
configurable: false,
get: function () {
return value
},
set: function (data) {
if (data !== value) { // 当要对当前属性进行赋值时，则抛出错误！
throw new TypeError('Assignment to constant variable.')
} else {
return value
}
}
})
}
```

### 3.原型与原型链
什么是原型？
每一个js对象，在创建的时候会与另一个对象关联，这样这个对象就可以通过委托访问另一个对象的属性和函数；这个另一个对象就是原型。
如果某个对象上读不到某个属性，则会在它的原型上寻找这个属性。
什么是原型链？
原型本身也有原型，因此就这样一直往上找原型，直到找不到，这些原型之间构成了一条原型链，对象的原型链尽头是null。
```
// 字节面试
var a = function(){ this.b = 2 }
var c = new a()
a.prototype.b = 3
var b = 4
a()

console.log(b) // 2 a()执行后，this指向window全局对象，覆盖掉b=4的赋值
console.log(c.b) // 2 new之后this指向c
```

### 4.闭包
什么是闭包？

函数可以记住并访问它的词法作用域（即所在环境）的变量，即使这个函数在其词法作用域之外被调用时。
```
【虾皮面试考过！】
// 没有闭包
var data = [];

for (var i = 0; i < 3; i++) {
data[i] = function () {
console.log(i);
};
}

data[0]();
data[1]();
data[2]();

/**
答案都是3
创建了三个函数，名字分别是data[0](), data[1](), data[2]()
执行完毕后，i为3
调用的data[0]()函数，打印当前i的值，即为3
**/


// 有闭包
var data = [];

for (var i = 0; i < 3; i++) {
data[i] = (function (i) {
return function(){
console.log(i);
}
})(i);
}

data[0]();
data[1]();
data[2]();

/**
创建了三个立即执行函数，创建的过程中，打印传进来的i
名字分别是data[0](), data[1](), data[2]()
执行完毕后，i为3
调用data[0]()时，传进来的i为0，因此打印的为0；data[1]() data[2]()同理
**/

```

### 5.判断数组
typeof 不能判断出数组，数组会显示object

(1) instanceof 可以，本质上是查找右边在不在实例的原型链上

(2) Object.prototype.toString.call()，括号里传入变量

(3)Array.isArray()

(4)Array.isPrototypeOf()

(5)Object.getPrototypeOf() 和 Array.prototype比较

### 6.this的指向

(1)普通函数调用，this指向全局对象window

(2)构造函数调用，this指向new出的对象

(3)对象函数调用，this指向调用这个函数的对象

(4)箭头函数调用，箭头函数没有this，所以this指向的是上层作用域的this

(5)apply和call调用：函数体内 this 的指向的是 call/apply 方法第一个参数，若为空默认是指向全局对象window。

**为什么箭头函数没有this？**
- 箭头函数的设计理念就是为了解决js中普通函数的二义性问题，即既能创建实例又能执行指令，我们看到一个普通函数也不确定它是用于创建实例的还是执行指令的。而箭头函数通过限制this指向，使得函数专注于执行指令，因此设计初衷就是为了不绑定this。
- js里面每个非箭头函数都有两个内部方法，一个是[[call]]，另一个是[[construct]]，在非new进行调用函数时，函数会调用内部的[[call]]方法，而使用new调用时，函数会调用内部的[[construct]]方法。对于箭头函数来说，箭头函数是没有[[construct]]的内部方法的，因此箭头函数不能作为构造函数，也就没有自己的this。

### 7.call/apply/bind的区别
- 相同
  (1) 都可以用来改变函数的this对象
  (2) 第一个参数都是this要指向的对象，都可以利用后续参数传参
- 不同
  (1) apply和call传入的参数列表形式不同。apply 接收参数数组，call的参数直接用逗号分隔
  (2) bind和call一模一样，但bind会创建一个函数，返回对应函数便于稍后调用；而apply、call则是立即调用。
### 8.箭头函数

  (1) 箭头函数没有自己的this，会捕获其所在的上下文的this值，作为自己的this值

  (2) 箭头函数没有constructor，是匿名函数，不能作为构造函数，不能通过new 调用；

  (3) 没有new.target 属性。在通过new运算符被初始化的函数或构造方法中，new.target返回一个指向构造方法或函数的引用。在普通的函数调用中，new.target 的值是undefined

  (4) 箭头函数不绑定Arguments 对象。取而代之用rest参数...解决。

  (5) 由于箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立）

  (6) 箭头函数没有原型属性 Fn.prototype 值为 undefined

  (7) 箭头函数不能当做Generator函数,不能使用yield关键字 

### 9.浮点数精度问题
  0.1 + 0.2 === 0.3 ? 错！
  原因：JS内部用64位来储存一个浮点数，而加减运算的时候就是采用二进制的方式来运算。0.1+0.2在计算的过程中，需要经过对阶、尾数运算、规格化、舍入处理、溢出判断几个步骤，在尾数计算的过程中，有一个1超出了范围被舍弃了，再舍入的时候进了1，因此造成了精度丢失，最终储存的64位转换为10进制的时候就变成0.3000000(...)4，和0.3不全等。 
### 10.事件
  事件传播的三个阶段是：事件捕获、事件冒泡和目标。
  （1）事件捕获阶段：事件从祖先元素往子元素查找，直到捕获到事件目标target。在这个过程中，事件相应的监听函数是不会被触发的。
  （2）事件目标：当到达目标元素后，执行目标元素该事件相应的处理函数，如果没有绑定监听函数则不执行。
  （3）事件冒泡阶段：事件从事件目标target开始，从子元素开始往祖先元素冒泡，直到到页面的最上一级标签。
  事件捕获
  addEventListener("click", function(){
  // 处理函数
  }, true)
  在处理函数后加上true，表示事件在捕获阶段触发，默认是false。
  事件捕获第一个接收到事件的对象是window。
  事件冒泡
  当一个元素上的事件被触发时，同样的事件将会在那个元素的所有祖先元素中被触发（如果祖先元素也有这个事件的话），这个过程就是事件冒泡，事件将会从原始元素开始一直冒泡到DOM树的最上层。
  不是所有的事件都能冒泡，blur、focus、onmouseenter、onmouseleave就不会，它们只能在一个元素上产生。
  阻止冒泡可以使用event.stopPropagation()。
  事件冒泡与事件捕获的应用
  （1）表单验证
  （2）事件委托
  （3）查看详情和删除
  事件委托
  事件委托是指，如果我们有许多以类似方式处理的元素，那么就不必为每个元素都分配一个事件处理程序 —— 而是将单个处理程序放在它们的共同祖先上。

### 11.数组的常用方法
array.isArray() : 判断一个数据是不是数组

array.push() : 将一个数据推入数组的最后，返回数组的长度

array.pop() : 将数组最末尾的一个元素删除，返回删除的元素

array.shift() : 将数组的第一个元素删除，返回删除的元素

array.unshift() : 将一个数据插入数组的开头，返回数组的长度

array.splice() : 就地替换或移除元素

array.slice() : 返回start到end的原数组的浅拷贝

array.map() : 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成

array.forEach() : 对数组的每个元素执行一次给定的函数

array.join() : 将数组拼接成字符串

array.includes() : 数组是否包含指定的值

array.reduce() : （累加器）对数组中的每个元素按序执行一个提供的 reducer 函数，每一次运行 reducer 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值

array.sort() : 按照某个顺序排列，就地改变数组；sort((a,b) => a-b)会将数字升序排列

array.from() : 将一个可迭代对象转换为数组

array.concat() : 拼接两个数组，返回新数组

array.every() : 测试一个数组内的所有元素是否都能通过指定函数的测试

array.filter() :给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素

array.fill() : 用一个固定值填充一个数组中从起始索引（默认为 0）到终止索引（默认为 array.length）内的全部元素。它返回修改后的数组

array.find() : 返回数组中满足提供的测试函数的第一个元素的值

array.findeIndex() : 返回数组中满足提供的测试函数的第一个元素的下标

array.indexOf() : 返回数组中第一次出现给定元素的下标

array.reverse() : 就地反转数组中的元素

就地修改原数组的方法
- array.push
- array.pop
- array.shift
- array.unshift
- array.splice
- array.sort
- array.reverse
- array.fill
  在数组中查找某个值
  Array.prototype.find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined。
- 如果需要在数组中找到对应元素的索引，请使用 findIndex()。
- 如果需要查找某个值的索引，请使用 Array.prototype.indexOf()。（它类似于findIndex()，但只是检查每个元素是否与值相等，而不是使用测试函数。）
- 如果需要查找数组中是否存在某个值，请使用 Array.prototype.includes()。同样，它检查每个元素是否与值相等，而不是使用测试函数。
- 如果需要查找是否有元素满足所提供的测试函数，请使用 Array.prototype.some()。
  将数组扁平化并去掉重复元素，升序返回
  Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})
### 12.字符串的常用方法
  string.trim() : 从字符串的两端移除空白字符，并返回一个新的字符串，而不会修改原始字符串
  string.charAt(index) : 返回index处的字符
  string.charCodeAt(index) : 返回index处的字符的UTF-16编码值
  string.concat(): 拼接两个字符串
  string.split() : 将字符串拆分成数组
  string.includes() : 执行区分大小写的搜索，以确定是否可以在一个字符串中找到另一个字符串
  string.indexOf() :  在字符串中搜索指定子字符串，并返回其第一次出现的位置索引
  string.match() : 字符串是否符合正则表达式
  string.padEnd(length, string) : 从末尾开始填充string，到指定长度
  string.padStart() : 从开头开始填充string，到指定长度
  string.repeat() : 返回一个新字符串，重复原字符串的指定次数
  string.replace(pattern, replacement) : 将符合pattern（可以是字符串也可以是正则表达式）的替换成replacement
  string.search() : 执行正则表达式的搜索，返回下标
  string.slice() : 提取字符串的一部分，并将其作为新字符串返回，而不修改原始字符串

  string.startsWith() : 检测字符串是否以某个字符为开头
  string.substring() : 返回该字符串从起始索引到结束索引（不包括）的部分，如果未提供结束索引，则返回到字符串末尾的部分
  string.toLowerCase() : 将字符串转换为小写形式
  string.toUpperCase() : 将字符串转换为大写形式 

### 13.ES6新增内容有什么？
  (1)let const
  (2)变量的解构赋值
  (3)字符串的新增方法
  string.includes(), startsWith(), endsWith(), repeat(),padStart(), padEnd()
  (4)函数的扩展
  函数参数可以传入的时候赋一个默认值
  rest参数：...变量名
  箭头函数
  尾调用优化
  (5)数组的扩展
  Array.from()
  arr.find(), findIndex(), findLast(), findLastIndex(),fill(),includes(),keys(),entries(), values(),flat(),flatMap()...
  数组的空位
  (6)对象的扩展
  允许在大括号里直接写入变量和函数，作为对象的属性和方法。
  属性的可枚举性和遍历
  for...in...
  对象的新方法：__proto__属性，Object.keys(),values(),entries()
  (7)运算符的扩展
  指数运算符 **
  链判断运算符 ?.
  逻辑赋值运算符 ||= &&=  ??=
  (8)Symbol
  作为对象的属性名，它不是私有属性，但不会出现在for...in...和for...of...循环中
  (9)Set Map WeakMap WeakSet数据结构
  weakMap和weakSet只接受对象和symbol值作为键名
  (10)Proxy
  (11)Promise
  (12)Generator
  (13)async
  (14)class
  (15)module
  ES6模块和CommonJS的差异
- CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
- CommonJS 模块的require()是同步加载模块，ES6 模块的import命令是异步加载，有一个独立的模块依赖的解析阶段。
### 14.eval()函数
  eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
  eval()函数的劣势：
  1.它使用与调用者相同的权限执行代码。如果你用 eval() 运行的字符串代码被恶意方（不怀好意的人）修改，你最终可能会在你的网页/扩展程序的权限下，在用户计算机上运行恶意代码。
  2.第三方代码可以看到某一个 eval() 被调用时的作用域，这也有可能导致一些不同方式的攻击。
  3.eval()执行更慢，因为它需要调用JS解释器
  例如：
  console.log(eval("2+2")) // 输出：4
  其他可以使字符串像代码一样运行的办法：
  1.模板字符串
  2.构造函数
  const func = new Function("return 2+2")
  console.log(func())
### 15.垃圾回收&内存泄露
  （1）垃圾回收
  垃圾回收机制是为了自动管理内存的一种机制，变量在不再使用时，JavaScript 的垃圾回收器会自动释放它们的内存，以避免内存泄漏和系统崩溃。
  JS的现代垃圾回收机制主要依赖于“可达性”概念，JS会从根对象如window对象中出发，递归地检查每个对象引用的其他对象。任何无法通过这些根对象访问的对象都会被标记为不可达，因此是垃圾，需要回收。
  垃圾回收的机制：
- 引用计数法
  在早期的垃圾回收算法中，使用引用计数（Reference Counting）来追踪每个对象被引用的次数。基本原理是：
  每个对象都有一个引用计数器，当有一个新的引用指向它时，计数器加 1。
  当一个引用不再指向这个对象时，计数器减 1。
  当某个对象的引用计数为 0 时，说明没有任何地方引用它，这个对象就可以被回收。
  缺点：引用计数存在一个问题：循环引用。即两个对象相互引用，虽然它们不再被根对象引用，但它们的引用计数仍大于 0，导致无法被回收。这使得现代垃圾回收机制逐渐放弃引用计数。
- 标记-清除法
  标记阶段：
    - 垃圾回收器从根对象出发（例如全局变量和当前作用域的局部变量），遍历所有可达对象，并做上“标记”。
      清除阶段：
    - 垃圾回收器会检查所有内存中的对象。如果某个对象没有被标记为可达的（即没有被遍历到），则认为它不可访问，垃圾回收器会回收其内存。
      这个算法能够有效地解决引用计数中的循环引用问题，因为它不依赖于对象之间的引用计数，而是通过直接检查对象的可达性来决定是否回收。
      触发垃圾回收机制的时机：惰性策略，要么内存达到某个阈值时启动，要么定期检查，每隔一段时间执行。
      V8引擎的垃圾回收机制
      在V8引擎的堆结构组成中，有新生代分区和老生代分区。
- 新生代(new_space)：大多数的对象开始都会被分配在这里，这个区域相对较小但是垃圾回收特别频繁，该区域被分为两半，一半用来分配内存，另一半用于在垃圾回收时将需要保留的对象复制过来，这就是Scavenge算法，将存活对象在From空间和To空间之间进行复制，同时完成两个空间之间的角色互换。
- 对象晋升：当一个对象在经过多次复制之后依旧存活，那么它会被认为是一个生命周期较长的对象，在下一次进行垃圾回收时，该对象会被直接转移到老生代中，这种对象从新生代转移到老生代的过程我们称之为晋升。对象晋升的条件主要有以下两个：对象是否经历过一次Scavenge算法，To空间的内存占比是否已经超过25%
- 老生代(old_space)：老生代内存区相对于新生代该内存区域的垃圾回收频率较低。采用新的算法Mark-Sweep(标记清除)和Mark-Compact(标记整理)来进行管理。
  Mark-Sweep(标记清除)分为标记和清除两个阶段，在标记阶段会遍历堆中的所有对象，然后标记活着的对象，在清除阶段中，会将死亡的对象进行清除。Mark-Sweep算法主要是通过判断某个对象是否可以被访问到，从而知道该对象是否应该被回收，具体步骤如下：
1. 垃圾回收器会在内部构建一个根列表，用于从根节点出发去寻找那些可以被访问到的变量。比如在JavaScript中，window全局对象可以看成一个根节点。
2. 然后，垃圾回收器从所有根节点出发，遍历其可以访问到的子节点，并将其标记为活动的，根节点不能到达的地方即为非活动的，将会被视为垃圾。
3. 最后，垃圾回收器将会释放所有非活动的内存块，并将其归还给操作系统。
   以下几种情况都可以作为根节点：
   全局对象
   本地函数的局部变量和参数
   当前嵌套调用链上的其他函数的变量和参数
   （2）内存泄露
   内存泄露是指变量已经不再使用了，但是未被及时释放的内存持续占用资源的情况。
   导致内存泄露的原因：
- 未解除DOM事件监听器
  如果为某些 DOM 元素绑定了事件监听器，但这些元素被移除后，事件监听器没有被解除，依然会占用内存，导致内存无法被回收。
- 闭包
- 意外的全局变量
  没有用 var、let 或 const 声明，这会隐式成为全局变量。或者由 this 创建：this.variable = "xxx"。
- 定时器或回调函数没有被清理
- 缓存过多数据
  如何检测内存泄露：
  浏览器开发工具，chrome中的Memory选项卡，使用“Heap Snapshot”功能来分析当前页面的内存使用情况，检查是否有对象占用了过多的内存或没有被回收。使用“Allocation Timeline”来查看在页面运行过程中内存分配的情况，观察是否存在内存使用持续增长的趋势。
  如何避免内存泄露：
- 使用let const声明变量
- 清理不再使用的事件监听器和定时器
- 合理使用闭包
- 限制缓存
- 使用弱引用，如weakMap或weakSet
- 避免循环引用
- 使用尾调用优化
  什么是“尾调用优化”？
  主要用于递归调用，通过消除尾递归调用中多余的栈帧，防止堆栈溢出（stack overflow）。
  “尾调用”是指一个函数在其最后一步调用另一个函数，并返回该函数的结果。
  尾调用优化的核心是：如果一个函数的最后一步是调用另一个函数，并且当前函数的栈帧在此调用后不再需要时，JavaScript 引擎可以复用当前函数的栈帧，而不再创建新的栈帧。这样做的好处是，即使是递归函数也可以避免占用过多的内存，因为不再有多余的栈帧积累。
  尾调用优化的条件：
  1.函数的最后一步是调用另一个函数
  2.尾调用必须是立刻返回的，而不是在调用之后还进行进一步的操作或修改
  3.不依赖当前栈帧

### 16.私有属性
私有属性是指，能在类内部被访问，但不能在类外部被访问的属性。
在JS中实现私有属性的方法：
（1）#符号
class Person {
#name
constructor(name){
this.#name = name
}
}

const p1 = new Person('ming')
console.log(p1.#name) // 报错
（2）使用闭包
通过使用 闭包，可以在类的构造函数中定义私有属性，并在方法中访问这些属性。闭包使得属性对外部不可见，只有类内部的方法可以访问。
class Person {
constructor(name) {
// 私有属性
let _name = name + '1';
this.setName = function (name) {
_name = name;
};
this.getName = function () {
return _name;
};
}
}

const p1 = new Person("John");
console.log(p1.getName());
console.log(p1._name) // undefined
（3）使用Symbol()
Symbol 是一种基本数据类型，可以用于创建唯一的标识符。通过将私有属性定义为 Symbol，虽然不是真正的私有属性，但可以避免与其他属性冲突。
const val = Symbol();

class MyClass {
constructor(value) {
this[val] = value; // 使用 Symbol 作为私有属性
}

    getPrivateField() {
        return this[val]; // 访问私有属性
    }

    setPrivateField(value) {
        this[val] = value; // 修改私有属性
    }
}

const obj = new MyClass(10);
console.log(obj.getPrivateField()); // 10
console.log(obj[val]); // 可以访问，但 Symbol 不容易被外部发现
### 17.DOM和BOM
Javascript 由三部分构成，ECMAScript，DOM和BOM。根据宿主（浏览器）的不同，具体的表现形式也不尽相同，ie和其他的浏览器风格迥异,IE 扩展了 BOM，加入了 ActiveXObject 类，可以通过 JavaScript 实例化 ActiveX 对象。
1. ECMAScript(核心)：描述了JS的语法和基本对象
2. DOM（document object model）是文档对象模型，是一种无关平台和语言的编程接口，给整个文档提供访问模型，可实现对程序和脚本的动态访问及内容更新。是W3C 的标准； [所有浏览器公共遵守的标准]
3. BOM (browser object model)是浏览器对象模型，是用于描述浏览器对象之间层次关系的模型。它由多个对象组成，其中Window对象是BOM的顶层对象，其他对象都是该对象的子对象。提供与浏览器交互的方法和接口。各个浏览器厂商根据 DOM在各自浏览器上的实现;[表现为不同浏览器定义有差别,实现方式不同]
   DOM树：
   [图片]
   18.prototype和__proto__的区别
   prototype是用来区分Function和Object的关键：
   函数创建时，JS会自动为函数添加prototype属性，其值为一个带有constructor属性（指向对应构造函数）的对象，这个对象就是我们所说的原型对象，除了constructor属性之外，我们还可以在上面直接添加一些公用的属性和方法。
   而每个对象内部都有一个[[Prototype]]属性，其用于存放该对象对应的原型对象。但是对象的内部属性[[Prototype]]是无法直接被访问和获取的，需要通过__proto__来获取，可以理解为，[[Prototype]] 存放了对原型对象的引用，真正的原型对象是由 Function.prototype 创建和维护的。
   因此一个实例对象的__proto__属性全等于它原型的prototype属性。
   19.函数柯里化
   函数柯里化是指，把接受多个参数的函数，变成一系列只接受一个参数的函数的技术。
   柯里化的核心思想是，逐步传递参数，每次只传一个，最终得到结果。
   柯里化的好处：
- 参数复用：你可以锁定某些参数
- 延迟执行：你可以逐步传递参数，不用一次性传入，尤其是某些参数在后续才确定的情况下
  // 定义一个 curry 函数，接收一个函数 fn 作为参数
  var curry = function (fn) {

  // 将传入的除第一个参数 (fn) 之外的其他参数保存到 args 数组中
  // arguments 是类数组对象，使用 slice 提取从第 1 个位置开始的所有参数
  var args = [].slice.call(arguments, 1);

  // 返回一个新的函数，用于接收后续的参数
  return function() {

        // 将之前保存的 args 和当前传入的 arguments（新的参数）合并到一起
        var newArgs = args.concat([].slice.call(arguments));
        
        // 使用 apply 将所有参数传递给原始函数 fn，并执行 fn
        // this 是上下文，newArgs 是合并后的所有参数
        return fn.apply(this, newArgs);
  };
  };

// 使用示例
function add(a, b) {
return a + b;
}

// 柯里化 add 函数，提前传入一个参数 a = 2
var addTwo = curry(add, 2);

// 当调用 addTwo(3) 时，相当于执行 add(2, 3)，输出 5
console.log(addTwo(3)); // 输出 5

## JS引擎
### 1.解释性语言VS编译性语言
解释性语言是指程序代码在执行时，由解释器逐行读取并执行，这种方式是边解释边执行，逐行转换为机器指令。
- 不需要事先编译代码。
- 程序在执行时逐行被翻译为机器指令，适合快速调试和开发。
- 程序执行速度通常比编译性语言慢，因为每次执行都需要翻译代码。
  典型的解释性语言：JavaScript、Python、Ruby、PHP 、Java等。
  编译性语言是在执行之前，先通过编译器将整个源代码一次性转换为机器码（也称为目标代码或二进制文件）。这种二进制文件是直接由计算机执行的，而不需要解释器的参与。
- 代码需要在运行之前经过编译，生成可执行文件。
- 程序的执行效率较高，因为二进制文件可以直接运行在硬件上，无需再次翻译。
- 程序的调试较为复杂，修改代码后需要重新编译。
  典型的编译性语言：C、C++、Rust、Go、Swift 等。
### 2.作为解释性语言/编译性语言的JS
  JavaScript 作为一种动态语言，最早被认为是解释性语言。它在浏览器中使用解释器逐行执行代码。然而，现代 JavaScript 引擎（如 V8）通过“即时编译”（JIT，Just-In-Time Compilation）等技术，将 JavaScript 的解释执行与编译执行结合起来，从而提高了 JavaScript 的运行效率。
1. 即时编译（JIT 编译）：JavaScript 引擎会在执行过程中对某些热点代码（频繁执行的代码）进行编译，将其编译为机器码以提高执行效率。与传统编译不同，JIT 是在程序运行期间进行的，而不是提前进行编译。
2. 优化执行：V8 引擎等会在运行时分析代码，并针对某些重复执行的部分进行优化编译，提高运行速度，接近编译性语言的性能。

### 3.JS引擎的解析过程
   词法分析 -> 得到token -> 语法分析 -> 得到AST -> 翻译器 -> 字节码 -> 字节码解释器 -> 机器码
   （1）读取代码，进行词法分析（Lexical analysis），然后将代码分解成词元（token）
   （2）对词元进行语法分析（parsing），然后将代码整理成语法树（syntax tree）
   （3）使用翻译器（translator），将代码转为字节码（bytecode）
   （4）使用字节码解释器（bytecode interpreter），将字节码转为机器码
### 4.JS的预处理阶段
   分号补全
   变量提升 
 
## Promise
   逻辑：
   想要异步 => 使用回调函数 => 当按顺序连续使用这个回调函数时，会使得回调函数层层嵌套，造成回调地狱。

   💡使用了Promise后，则可以使用then函数来链式调用后续的函数。
### 1.什么是Promise？
   Promise诞生的原因：在传统的基于 闭包 的异步编程中，经常会出现 地狱嵌套 的问题，这使得高度异步的代码几乎无法阅读。
   Promise的核心思想：实现一个容器，对内管理异步任务的执行状态，对外提供同步编程的代码结构，从而具备更好的可读性。
   Promise就是“承诺/期约”，封装着一个将来会完成的状态。promise共有三种状态：pending(进行中)、fulfilled(已成功)、rejected(已失败)。如果状态最终是成功，则会执行then中的内容；如果状态最终是失败，会抛出一个异常，通过catch捕获异常。
   Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行。
```
// 手写promise

// 构造函数
function Promise(fn){
    this.callbacks = []
    // 模拟成功
    const resolve = (value) => {
      setTimeout(() => {
      this.data = value
    // 执行回调函数数组中的所有函数
      this.callbacks.forEach((cb) => cb(value))
    })
  }
  // 当实例化时，直接执行传入的fn函数，并将resolve函数传入
  fn(resolve)
}

// then onResolved是then方法中的回调函数
Promise.prototype.then = function(onResolved){
  return new Promise((resolve) => {
    this.callbacks.push(() => {
      const res = onResolved(this.data)
      if(res instanceof Promise){
        res.then(resolve)
      }else{
        resolve(res)
      }
    })
  })
}
```
### Promise的底层实现原理？
1.状态管理
在构造函数中，Promise的状态初始为 pending,一旦状态从 pending 转为 fulfilled 或 rejected，就不可逆。
2.回调函数队列
Promise有一个回调函数处理队列，它会将回调函数存储在这个队列中，当Promise状态变为 fulfilled 或 rejected 时再执行这些回调。
3.异步执行
Promise中的异步操作是通过微任务机制（Microtask Queue）来执行的，确保回调在主线程任务完成后执行。
2.Promise的静态方法
- Promise.all()
  当所有的Promise都被兑现时兑现；在任意一个 Promise 被拒绝时拒绝。接受一个可迭代对象如数组，数组内需要有Promise对象，非Promise对象将会被忽略。 

```
// promise.all的使用
  const p1 = Promise.resolve(3);const p2 = 1337;const p3 = new Promise((resolve, reject) => {setTimeout(() => {resolve("foo");}, 100);});

Promise.all([p1, p2, p3]).then((values) => {
console.log(values); // [3, 1337, "foo"]});

// 手写promise.all
/**
特点：
1、接收的参数是可迭代对象
2、传入的数据中可以是普通数据，也可以是Promise对象
3、可迭代对象的promise是并行执行的
4、保持输入数组的顺序和输出数组的顺序一致
5、传入数组中只要有一个reject，立即返回reject
6、所有数据resolve之后返回结果
**/
function myPromiseAll(iterable){
return new Promise((resolve, reject) => {
const promises = Array.from(iterable);

        // 定义Promise对象resolve的数组
        const result = [];
        
        // 定义一个计数器用来判断是否所有的promise执行完毕
        let count = 0;
        
        // 并发执行每一个promise
        for(let i = 0; i < promises.length; i++){
            Promise.resolve(promises[i]).then(res => {
                result[i] = res
                count++
                if(count === promises.length){
                    resolve(result)
                }
            }).catch(err => reject(err))
        }
    })
}
```

- Promise.allSettled()
  当所有的Promise都完成（不管成功还是失败）后兑现。
- Promise.any()
  输入的任何一个 Promise 兑现时，这个返回的 Promise 将会兑现，并返回第一个兑现的值。
  如果没有 Promise 被兑现，Promise.any() 将使用AggregateError进行拒绝。
- Promise.race()
  竞态
  输入的第一个Promise完成时（不管成功或者失败），返回的Promise也完成。如果第一个敲定的 promise 被兑现，那么返回的 promise 也会被兑现；如果第一个敲定的 promise 被拒绝，那么返回的 promise 也会被拒绝。如果传入的数组为空，返回的 promise 就会一直保持待定状态。
```
  // 手写promise.race
  function myPromiseRace(iterable){
  const promises = Array.from(iterable);
  return new Promise((resolve, reject) => {
  for(let i = 0; i < promises.length; i++){
  Promise.resolve(promises[i])
  .then(resolve)
  .catch(reject)
  }
  })
  }
```

Promise.finally()
  无论结果如何，都会执行。
```
// 手写promise.finally

function myPromiseFinally(fn){
return this.then((value) => {
return Promise.resolve(fn()).then(() => {
return value
})
}, (err) => {
return Promise.resolve(fn()).then(() => {
throw error
})
})
}
```

### 3.catch()之后的then()会执行吗？
会。
.catch只会处理rejected的情况，并且也会返回一个新的Promise实例。
### 4.async await
Async await 是promise的语法糖，可以理解为程序运行到这一句时，会停止，等待await后面的结果运行完毕；运行完毕后，后面的代码才会继续执行。
### 5.generator
遇到yield停止，然后再从yield的地方继续执行。
### 6.事件循环
什么是事件循环？
JS是单线程的，它将所有的任务分为同步任务和异步任务。同步任务是指当前主线程要执行的任务，会被压入执行栈中；异步任务则会进入任务队列中。
当执行栈清空，主线程空闲时，则会从任务队列中执行异步任务。异步队列又分为宏任务队列和微任务队列，因为宏任务执行时间较长，因此微任务会先执行。
- 宏任务是宿主环境即浏览器提供的，有：setTimeout() setImmediate() setInterval()
- 微任务大部份是语言本身提供的，有：Promise.then() async await
  事件循环的运行机制如下：
  （1）函数入栈，当stack中执行到异步任务时，就把它放进异步任务队列，然后继续执行，直到stack清空
  （2）执行栈清空后，微任务队列会先被清空
  （3）从宏任务队列中取出一个宏任务执行
  （4）执行完成后，会继续查看微任务队列是否有任务，有的话，清空微任务队列；然后重复（3），继续从宏任务中取任务执行，执行完成之后，继续清空微任务，如此反复循环，直至清空所有的任务。