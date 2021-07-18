# iterator-practice
반복자들에 대해 확인이 없었던 문제들 요모조모 탐구

## 다중 비동기 요청 순차처리 & 병렬 처리

루프로 순차처리와 병렬처리는 어떻게 가능한가?

10개의 이미지 파일을 업로드하는 기능을 구현한다 생각해보자.\
병렬처리를 할것이다.

promise.All 을 통해 병렬로 요청하거나 요청이 지나치게 많다면 메모리 한도내에서 끊어 요청할 수 있을것이다.

### 순차처리 (in sequence) 

배열의 요소들에 대해 차례대로 비동기 작업을 수행하는 것으로, 실행 순서가 보장되어야 할 때 사용한다.

`for(for of)` 문 을 통해 쉽게 구현가능하다.

``` javascript
for (const _ of range) {
    const timeStamp = await model.get()
    this.renderer.render(timeStamp)
}
```

### 벙렬처리 (in sequence

배열의 요소들에 대해 한꺼번에 여러 비동기 작업을 수행하는 것으로, 실행 순서가 중요하지 않을 때 사용한다.)

`promise.all` 을 통해 구현 가능하다.\
`forEach` 로도 구현 가능하다. 

``` javascript
const timeStampGetters = range.map(() => model.get())

Promise.all(timeStampGetters)
  .then(timeStamps => timeStamps.forEach(this.renderer.render.bind(this.renderer)))
```


``` javascript
range.forEach(async () => {
    const timeStamp = await model.get()
    this.renderer.render(timeStamp)
})
``` 

`forEach`는 콜백만 실행하고 끝나버리기에 비동기 작업의 처리 상태를 추적하지 못하고, 따라서 이후의 흐름을 제어하기도 어렵다.

이러한 케이스에는 `promise.all` 을 통해 구현하자.

## 이터레이터 & 제너레이터

### 이터레이터

* 이터레이터는 next() 인터페이스를 둔다.
* 이터레이터는 `{ done: boolean, value?: any}` 를 반환한다.
* 이터레이터는 모든 순회가 완료되면 `{ done: false }` 를 반환한다.
* 이터레이터는 배열의 부분 집합이다.
* **이터레이터는 배열과 달리 값을 미리 다 계산하여 보관할 필요가 없다.**
* **이터레이터는 next()를 호출했을때에 필요한 값만 계산 한다.**
* **이터레이터는 배열에 비해 메모리를 적게 소비한다.**