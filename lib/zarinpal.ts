'use server'

import ZarinPalCheckout from 'zarinpal-checkout'

const zarinpal = ZarinPalCheckout.create(
  'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  false
)
zarinpal
  .PaymentRequest({
    Amount: +'1000', // In Tomans
    CallbackURL: 'https://your-safe-api/example/zarinpal/validate',
    Description: 'A Payment from Node.JS',
    Email: 'hi@siamak.work',
    Mobile: '09120000000',
  })
  .then((response) => {
    if (response.status === 100) {
      console.log(response.url)
    }
  })
  .catch((err) => {
    console.error(err)
  })

zarinpal
  .PaymentVerification({
    Amount: +'1000', // In Tomans
    Authority: '000000000000000000000000000000000000',
  })
  .then((response) => {
    if (response.status !== 100) {
      console.log('Empty!')
    } else {
      console.log(`Verified! Ref ID: ${response.RefID}`)
    }
  })
  .catch((err) => {
    console.error(err)
  })

// zarinpal.UnverifiedTransactions().then(response =>
//   if (response.status === 100) {
//     console.log(response.authorities);
//   }
// ).catch(err => {
//   console.error(err);
// });

zarinpal
  .RefreshAuthority({
    Authority: '000000000000000000000000000000000000',
    Expire: +'1800',
  })
  .then((response) => {
    if (response.status === 100) {
      console.log(response.status)
    }
  })
  .catch((err) => {
    console.error(err)
  })

//   https://github.com/siamak/zarinpal-express-checkout/blob/master/index.js

const zarinpalExample = ZarinPalCheckout.create(
  'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  true
)

zarinpal
  .PaymentRequest({
    Amount: +'1000',
    CallbackURL: 'http://siamak.us',
    Description: 'Hello NodeJS API.',
    Email: 'hi@siamak.work',
    Mobile: '09120000000',
  })
  .then(function (response) {
    if (response.status == 100) {
      //   res.redirect(response.url)
    }
  })
  .catch(function (err) {
    console.log(err)
  })

zarinpal
  .PaymentVerification({
    //   Amount: req.params.amount,
    //   Authority: req.params.token,
    Amount: +`params.amount`,
    Authority: `params.token`,
  })
  .then(function (response) {
    if (response.status == 101) {
      console.log('Verified! Ref ID: ' + response.RefID)
    } else {
      console.log(response)
    }
  })
  .catch(function (err) {
    console.log(err)
  })

zarinpal
  .UnverifiedTransactions()
  .then(function (response) {
    if (response.status == 100) {
      console.log(response.authorities)
    }
  })
  .catch(function (err) {
    console.log(err)
  })

zarinpal
  .RefreshAuthority({
    Authority: `params.token`,
    //@ts-ignore
    Expire: `params.expire`.toDate(),
    // Authority: req.params.token,
    // Expire: req.params.expire
  })
  .then(function (response) {
    if (response.status == 100) {
      // res.send('<h2>You can Use: <u>' + req.params.token + '</u> — Expire in: <u>' + req.params.expire + '</u></h2>');
    }
  })
  .catch(function (err) {
    console.log(err)
  })
