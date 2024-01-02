# go 基本语法

## 导入/导出

导出: 名字以大写字母开头。例如，Pizza，math.Pi
导入: 只能引用其中已导出的名字。“未导出”的名字在该包外均无法访问

## 函数

形参简写, 多值返回, 命名返回值

```go
// x int, y int -> x, y int
func add(x, y int) int {
	return x, y
}

// 命名返回值
func split(sum int) (x, y int) {
	x = sum * 4 / 9
	y = sum - x
	return
}
```

### defer

1. defer 语句会将函数推迟到外层函数返回之后执行。
2. 推迟调用的函数其参数会立即求值，但直到外层函数返回前该函数都不会被调用。
3. 推迟的函数调用会被压入一个栈中。当外层函数返回时，被推迟的函数会按照后进先出的顺序调用。

```go
func main() {
	defer fmt.Println("world")

	fmt.Println("hello")
}
```

### 闭包

## 变量

### 声明，赋值

```go
var c, python, java bool

var c, python, java = true, false, "no!" // 类型推断

func main() { k := 3 } // 短变量声明 := 结构不能在函数外使用

// 没有明确初始值的变量声明会被赋予它们的 零值。
```

### 类型转换

表达式 `T(v)` 将值 `v` 转换为类型 `T`。

## 常量

```go
// 不能用 := 语法声明
// 可以是字符、字符串、布尔值或数值。
const Pi = 3.14
```

### 数值常量

数值常量是高精度的 `值`。
一个未指定类型的常量由上下文来决定其类型

```go
package main

import "fmt"

const (
	// 将 1 左移 100 位来创建一个非常大的数字
	// 即这个数的二进制是 1 后面跟着 100 个 0
	Big = 1 << 100
	// 再往右移 99 位，即 Small = 1 << 1，或者说 Small = 2
	Small = Big >> 99
)

func needInt(x int) int { return x*10 + 1 }
func needFloat(x float64) float64 {
	return x * 0.1
}

func main() {
	fmt.Println(needInt(Small)) // 21
	fmt.Println(needFloat(Small)) // 0.2
	fmt.Println(needFloat(Big)) // 1.2676506002282295e+29

}
```

## 基本类型

```go
bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // uint8 的别名

rune // int32 的别名
    // 表示一个 Unicode 码点

float32 float64

complex64 complex128
```

int, uint 和 uintptr 在 32 位系统上通常为 32 位宽，在 64 位系统上则为 64 位宽。
当你需要一个整数值时应使用 int 类型，除非你有特殊的理由使用固定大小或无符号的整数类型

## 循环

```go
for i := 0; i < 10; i++ {
    sum += i
}

for ; sum < 1000; {
	sum += sum
}

// while
for sum < 1000 {
	sum += sum
}

// 无限循环
for {
}

// Range, 可遍历切片或映射
// i: 元素的下标，v: 下标所对应元素的副本
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}
for i, v := range pow {
	fmt.Printf("2**%d = %d\n", i, v)
}
```

## 条件判断

### if

```go
if x < 0 {
	return 0
}

// 同 for 一样， if 语句可以在条件表达式前执行一个简单的语句。
// 该语句声明的变量作用域仅在 if 和 else 块之内。
if v := 0; v < 1 {
	return v
}
```

### switch

```go
// 1. 运行选定的 case，而非之后所有的 case. Go 自动提供了在这些语言中每个 case 后面所需的 break 语句。
// 2. 除非以 fallthrough 语句结束，否则分支会自动终止。
// 3. switch 的 case 无需为常量，且取值不必为整数。
switch os := runtime.GOOS; os {
case "darwin":
	fmt.Println("OS X.")
case "linux":
	fmt.Println("Linux.")
default:
	fmt.Printf("%s.\n", os)
}

// 等同于 switch true
switch {
case t.Hour() < 12:
	fmt.Println("Good morning!")
case t.Hour() < 17:
	fmt.Println("Good afternoon.")
default:
	fmt.Println("Good evening.")
}
```

## 指针

与 C 不同，Go 没有指针运算

```go
var p *int // nil
var i = 1

p = &i // 指向 i
*p = 2 // 通过指针设置 i 的值
```

## 结构体（struct）

```go
type Vertex struct {
	X int
	Y int
}

var (
	v = Vertex{1, 2}   // 创建一个 Vertex 类型的结构体
	v1 = Vertex{X: 1}  // Y:0 被隐式地赋予
	v2 = Vertex{}      // X:0 Y:0
	p  = &Vertex{1, 2} // 创建一个 *Vertex 类型的结构体（指针）
)

v.X = 4 // 结构体字段使用点号来访问
fmt.Println(v.X)

// 结构体字段可以通过结构体指针来访问。
//  (*p).X 隐式间接引用，直接写 p.X 就可以。
```

## 数组

```go
var a [2]string
a[0] = "Hello"
a[1] = "World"
fmt.Println(a[0], a[1])
fmt.Println(a)

primes := [6]int{2, 3, 5, 7, 11, 13}
fmt.Println(primes)
```

### 切片

1. 切片并不存储任何数据，它只是描述了底层数组中的一段。
2. 更改切片的元素会修改其底层数组中对应的元素。
3. 与它共享底层数组的切片都会观测到这些修改

```go
var primes = [6]int{2, 3, 5, 7, 11, 13} // 等价于切片 primes[0:10] primes[:10] primes[0:] primes[:]
// 半开区间，包括第一个元素，但排除最后一个元素
var s []int = primes[1:4]

var q = [3]bool{true, true, false}
var r = []bool{true, true, false} // 创建一个和上面相同的数组，然后构建一个引用了它的切片
```

4. 切片拥有 `长度 len(s)` 和 容量 `cap(s)`
5. 切片的长度就是它所包含的元素个数。
6. 切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。

```go
s := []int{2, 3, 5, 7, 11, 13}  // len=6 cap=6 [2 3 5 7 11 13]
s = s[:0]   // len=0 cap=6 []
s = s[:4]   // len=4 cap=6 [2 3 5 7]
s = s[2:]   // len=2 cap=4 [5 7]
```

7. 切片的零值是 `nil`。`nil` 切片的长度和容量为 0 且没有底层数组

## 映射

1. 映射将键映射到值。
2. 映射的零值为 `nil`. `nil` 映射既没有键，也不能添加键。
3. `make` 函数会返回给定类型的映射，并将其初始化备用。

```go
type Vertex struct {
	Lat, Long float64
}

var n = make(map[string]Vertex)
n["Bell Labs"] = Vertex{
	40.68433, -74.39967,
}

// 文法
var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google": Vertex{
		37.42202, -122.08408,
	},
}

// 若顶级类型只是一个类型名，你可以在文法的元素中省略它
var m = map[string]Vertex{
	"Bell Labs": {40.68433, -74.39967},
	"Google":    {37.42202, -122.08408},
}

m := make(map[string]int)

// 插入/修改 m[key]
m["Answer"] = 42
fmt.Println("The value:", m["Answer"])

// 删除元素 delete(m, key)
delete(m, "Answer")
fmt.Println("The value:", m["Answer"])

// 通过双赋值检测某个键是否存在
// 若 key 在 m 中，ok 为 true ；否则，ok 为 false。若 key 不在映射中，那么 elem 是该映射元素类型的零值
// 若 elem 或 ok 还未声明，你可以使用短变量声明 elem, ok := m[key]
v, ok := m["Answer"]
fmt.Println("The value:", v, "Present?", ok)
```

## 方法

### 方法

1. 方法只是个带接收者参数的函数。
2. **接收者的类型定义和方法声明必须在同一包内；不能为内建类型声明方法**。

```go
type Vertex struct {
	X, Y float64
}

// Abs 方法拥有一个名为 v，类型为 Vertex 的接收者
func (v Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

// 对于某类型 T，接收者的类型可以用 *T 的文法。（此外，T 不能是像 *int 这样的指针。）
// 若使用值接收者，那么 Scale 方法会对原始 Vertex 值的副本进行操作。
func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}
```

### 方法与指针重定向

1. 以指针为接收者的方法被调用时，接收者既能为值又能为指针

```go
// Go 会将语句 v.Scale(5) 解释为 (&v).Scale(5)
var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK
```

2. 以值为接收者的方法被调用时，接收者既能为值又能为指针

```go
// p.Abs() 会被解释为 (*p).Abs()
var v Vertex
fmt.Println(v.Abs()) // OK
p := &v
fmt.Println(p.Abs()) // OK
```

## 接口

1. `接口类型` 是由一组方法签名定义的集合。
2. 类型通过实现一个接口的所有方法来实现该接口。既然无需专门显式声明，也就没有“implements”关键字。

## 并发
