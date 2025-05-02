## 八股（困难版）之CSS

### 1.块级元素和行内元素
- 块级元素的宽度默认是它的容器的100%，各占据一行，垂直方向排列；height、width、margin、padding都可以控制，能够容纳其他块级元素或行内元素。常见的有div ul li form table h1-h6 p等等。
- 行内元素在同一行，水平方向排列，只能容纳文本或其他行内元素；可以设置line-height，margin、padding上下无效。常见的有 a span img input label textarea等等。
### 2.px em和rem的区别
- px是像素
- em是相对于当前字体的大小 默认1em=16px
- rem是相对于根元素html
- vw是相对于视口
### 3.实现水平垂直居中的方法
  （1）父容器改成flex布局，设置align-items:center, justify-content:center

  （2）利用相对定位和绝对定位，子绝父相，将父容器改成position:relative，该元素设置position:absolute，上下左右都设置为0，再设置margin:auto即可实现居中

  （3）利用相对定位和绝对定位，子绝父相，将父容器改成position:relative，该元素设置position:absolute，margin偏移外容器的50%，再用transform:translateX() translateY()平移补回自身宽高的50%

  （4）行内元素：在父容器上使用text-align:center实现行内元素的水平居中，子元素上使用line-height:父元素高度，实现垂直居中
### 4.BFC
#### 什么是BFC？
  BFC是块级格式上下文，开启元素BFC后，会有以下特性：

  父元素的垂直外边距不会和子元素重叠，开启BFC的元素不会被浮动元素覆盖，开启BFC的元素可以包含浮动元素。

  开启BFC的方法？
- 为父元素设置overflow: hidden
- 设置after伪类
  向父元素选择器后多加一个::after，能够在父元素的最后增加一个after伪元素。优点在于不会在页面中添加多余的div，几乎没有副作用。
#### BFC的作用？
1. 避免外边距重叠
   为两个元素都设置overflow: hidden开启bfc
2. 清除浮动
   高度塌陷问题
3. 阻止元素被浮动元素覆盖
   为正常的元素设置overflow:hidden
### 5.CSS3的新特性
   圆角、透明度、动画、阴影、文字、渐变
   多列布局
### 6.定位方案
   （1）普通流

   （2）浮动流

   （3）绝对定位
### 7.flex布局
即弹性布局，通过在父容器上设置display: flex开启。

（1）设置在父容器上的属性

  Flex-direction: 子元素排列方向

  Flex-wrap

  Flex-flow

  Justify-content: 在**主轴**上的排列方式

  Align-items: 在交叉轴上的排列方式

  Align-content: 多根轴线的对齐方式

（2）设置在子元素上的属性

  Order: 子元素的优先级，数字越小排列越靠前

  Flex-grow: 子元素的放大比例，默认为0

  Flex-shrink: 子元素的缩小比例，默认为1

  Flex-basis:  在分配多余空间之前，子元素占据的主轴空间

  Flex: 以上三个属性的集合

  Align-self: 单个项目与其他项目不一样的对齐方式，可以覆盖align-items属性

深入理解flex: 0 1 auto

  `flex: flex-grow flex-shrink flex-basis`

  ①.flex-grow 剩余空间索取

  默认值为0，不索取

  eg:父元素400，子元素A为100px，B为200px.则剩余空间为100

  此时A的flex-grow 为1，B为2，则A=100px+100x1/3; B=200px+100x2/3

  ②.flex-shrink 子元素总宽度大于父元素如何缩小

  父400px,A 200px B 300px

  AB总宽度超出父元素100px;

  如果A不减少，则flex-shrink ：0,B减少；

  计算方法：

  三个flex item元素的width: w1, w2, w3

  三个flex item元素的flex-shrink：a, b, c

  计算总压缩权重： sum = a * w1 + b * w2 + c * w3

  计算每个元素压缩率： S1 = a * w1 / sum，S2 =b * w2 / sum，S3 =c * w3 / sum

  计算每个元素宽度：width - 压缩率 * 溢出空间

  ②,flex-basis

  该属性用来设置元素的宽度，当然width也可以用来设置元素的宽度，如果设置了width和flex-basis，那么flex-basis会覆盖width值。

### 8.盒模型
在一个HTML文档中，每一个元素都会被视为一个BOX（盒子），并且这个盒子由四个部分组成：content、padding、border、margin

content，即实际内容，显示文本和图像

boreder，即边框，围绕元素内容的内边距的一条或多条线，由粗细、样式、颜色三部分组成

padding，即内边距，清除内容周围的区域，内边距是透明的，取值不能为负，受盒子的background属性影响

margin，即外边距，在元素外创建额外的空白，空白通常指不能放其他元素的区域

#### box-sizing属性

CSS 中的 box-sizing 属性定义了引擎应该如何计算一个元素的总宽度和总高度
- content-box：元素的 width/height 不包含 padding、border
- border-box：元素的 width/height 包含 padding，border

### 9.css画各种形状
代码如下：

```
  // 1. 画响应式正方形
  // 利用padding-top 设置为 40% 时，
  // CSS 将这个 40% 解释为相对于父元素 宽度 的 40%，而不是相对于高度。
  // 这意味着无论父元素的高度是多少，padding-top 会始终是父元素宽度的 40%。
  .box{
  width: 40vw;
  padding-top: 40%;
  background-color: gold;
  }

// 2. 画三角形
.triangle{
width: 0;
height: 0;
border-width: 20px;
border-style: solid;
border-color: transparent transparent red transparent;
}
// 3. 画扇形
// 先画一个圆,外加两个绝对定位的半圆
// 扇形可以通过两个半圆作为遮罩旋转来露出相应的角度实现
<style>
    .contain {
        position: relative;
        width: 200px;
        height: 200px;
    }
    .main {
        height: 100%;
        background: lightgreen;
        border-radius: 100px;
    }
    .common {
        position: absolute;
        top: 0;
        width: 50%;
        height: 100%;
    }
    .mask1 {
        transform: rotate(83deg);
        border-radius: 100px 0 0 100px;
        left: 0;
        transform-origin: right center;
        background: red;
    }
    .mask2 {
        transform: rotate(-76deg);
        transform-origin: left center;
        left: 100px;
        border-radius: 0 100px 100px 0;
        background: blue;
    }
</style>

<div class="contain">
    <div class="main"></div>
    <div class="mask1 common"></div>
    <div class="mask2 common"></div>
</div>
```