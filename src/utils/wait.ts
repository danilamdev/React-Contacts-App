export async function wait (cb: () => void, time: number) {
  return await new Promise((resolve) => {
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      resolve(cb())
    }, time)
  })
}
