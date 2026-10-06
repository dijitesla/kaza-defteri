// Testler her makinede aynı sonucu versin diye saat dilimi sabitlenir.
module.exports = () => {
  process.env.TZ = 'Europe/Istanbul';
};
