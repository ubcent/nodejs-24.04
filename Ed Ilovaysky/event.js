// 1. Колбэки
function asyncHandler(callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

function asyncHandler1(callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

function asyncHandler2(callback) {
  setTimeout(() => {
    callback();
  }, 1000);
}

asyncHandler(() => {
  // таймер сработал
  asyncHandler1(() => {
    // таймер сработал
    asyncHandler2(() => {
      // таймер сработал
    });
  });
});

// 2. Promises (pending->(fulfilled|rejected))
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({ username: "Vasya Pupkin" });
  }, 1000);
});

const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 1000);
});

/*
promise.then(
  (user) => {}, // onFulfilled,
  () => {}, // onRejected - ошибки БЛ
)
*/

/*
promise.then(() => {
  return promise1;
}).then(() => {
  return promise2;
}).then(() => {
}).catch(() => {
  
});
*/
// 2.1. Promise (async/await)
async function asyncFunction() {
  const result1 = await promise;
  const result2 = await promise1;
  const result3 = await promise2;
}
