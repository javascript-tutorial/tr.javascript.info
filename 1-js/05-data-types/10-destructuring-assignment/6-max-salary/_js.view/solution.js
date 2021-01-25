function azamiMaas(maaslar) {

  let maxSalary = 0;
  let maxName = null;

<<<<<<< HEAD:1-js/05-data-types/09-destructuring-assignment/6-max-salary/_js.view/solution.js
  for (let [isim, maas] of Object.entries(maaslar)) {
    if (max < maas) {
      max = maas;
      maxName = isim;
=======
  for(const [name, salary] of Object.entries(salaries)) {
    if (max < salary) {
      maxSalary = salary;
      maxName = name;
>>>>>>> 97ef86242f9f236b13152e1baf52a55c4db8728a:1-js/05-data-types/10-destructuring-assignment/6-max-salary/_js.view/solution.js
    }
  }

  return maxName;
}