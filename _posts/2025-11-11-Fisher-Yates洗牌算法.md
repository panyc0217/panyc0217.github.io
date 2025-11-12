---
title: "Fisher-Yates洗牌算法"
description: ""
categories: [ 数据结构与算法 ]
tags: [ 数据结构与算法 ]
published: true # 是否公开
comment: true # 评论区
math: true # 数学模式, 由MathJax支持
mermaid: true # Markdown的一种扩展, 用于画图
---

## 洗牌算法

洗牌算法（Shuffle Algorithm）用于随机打乱一个已知排列，使所有排列的出现概率相同

* 扑克洗牌
* 麻将洗牌
* 关卡、地图随机排列
* 音视频列表随机播放
* 随机抽样
* 负载均衡任务分配

## Fisher-Yates洗牌算法

逆序遍历数组，对每一个元素（索引为 $i$ ），在区间 $\left[ 0, i \right]$ 内取随机数 $j$ ，交换索引 $i$ 和索引 $j$ 的元素

```go
package algorithm

import "math/rand"

// Shuffle Fisher-Yates洗牌算法，时间复杂度n，空间复杂度1
func Shuffle[T any](arr []T) {
  for i := len(arr) - 1; i > 0; i-- {
    j := rand.Intn(i + 1)
    swap(arr, i, j)
  }
}

func swap[T any](arr []T, i int, j int) {
  tmp := arr[i]
  arr[i] = arr[j]
  arr[j] = tmp
}
```

Fisher-Yates洗牌算法为经典且高效的原地洗牌算法，本质是模拟随机抽牌过程，使所有排列的概率均为 $\frac{1}{n!}$

1. 左边（区间 $\left[ 0, i \right]$ ）为待抽取元素
2. 右边（区间 $\left( i, n-1 \right]$ ）为已抽取元素

