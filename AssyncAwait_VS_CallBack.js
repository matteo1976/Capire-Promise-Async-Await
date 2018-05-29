/**
 * IN QUESTO MODULO VIENE MOSTRATA LA DIFFERENZA TRA CALLBACK E ASYNC/AWAIT
 * VIENE MOSTRATO COME FUNZIONA UNA PROMISE
 */

/**
 * le setTimeout simulano una richiesta HTTP con tempi di risposta dfferenti
 */

// creo le promise
// resolve e reject sono funzioni che restituiscono rispettivamente il valore nel caso la promise va a buon fine e errore in caso opposto

function SimulateRequest1 () { // la funzione restituisce una promise
  return (promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('request n1') // guarda test5 per capire come  e' possibile utilizzare ressolve()
    }, 5000)
  }))
}

function SimulateRequest2 () {
  return (promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('request n2')
    }, 1000)
  }))
}

function SimulateRequest3 () {
  return (promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('request n3')
    }, 3000)
  }))
}

//* ***************************************************** ASYNC/AWAIT******************************************************************/

// se uso await devo per forza usare una funzione di tipo async await funziona solo se la funzione dopo e' una promise
async function test () {
  console.log(await SimulateRequest1().catch((msg) => { console.log('error') }))
  console.log(await SimulateRequest2().catch((msg) => { console.log('error') }))
  console.log(await SimulateRequest3().catch((msg) => { console.log('error') }))
}

// richiama qua solo test commenta le altre chiamate
// test()

// ************************************************  CALL BACK   *****************************************************************************

// la funzione test2 usa delle chiamate a callback
function test2 () {
  setTimeout(() => { console.log('1') }, 5000)
  setTimeout(() => { console.log('2') }, 1000)
  setTimeout(() => { console.log('3') }, 3000)
}
// richiama qua solo test2 commenta le altre chiamate
// test2()

// ******************************************* MA ASYNC/ AWAIT RENDE TUTTO SINCRONO??? NO!!!! ****************************************

// richiama le due funzioni insieme  vedi il risultato
// test()
// test2()

/** ********************************  USARE ANCORA ASYNC / AWAIT PER FARE TORNARE UNA PARVENZA DI SINCRONISMO */

async function test3 () {
  await test()
  test2()
}

// richiama qua solo test commenta le altre chiamate
// test3()

/** ******************************************* TEST PER CAPIRE PROMISE ************************************************** */
function test5 () {
  return (
    p = new Promise((resolve, reject) => {
      resolve(async () => {
        console.log(await SimulateRequest1().catch((msg) => { console.log('error') }))
        console.log(await SimulateRequest2().catch((msg) => { console.log('error') }))
        console.log(await SimulateRequest3().catch((msg) => { console.log('error') }))
      }

      )
    }))
}

// richiama qua solo test commenta le altre chiamate
test5().then((msg) => console.log(msg()))

/** ******************************************* ALTRO TEST PER PROMISE ************************************************** */
function test6 () {
  return (
    p = new Promise((resolve, reject) => {
      resolve(() => {
        setTimeout(() => { console.log('1') }, 5000)
        setTimeout(() => { console.log('2') }, 1000)
        setTimeout(() => { console.log('3') }, 3000)
      }
      )
    }))
}

// richiama qua solo test commenta le altre chiamate
// test6().then((msg) => console.log(msg()))
