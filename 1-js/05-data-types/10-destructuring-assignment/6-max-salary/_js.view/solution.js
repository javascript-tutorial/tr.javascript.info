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
    if (maxSalary < salary) {
      maxSalary = salary;
      maxName = name;
>>>>>>> 7b76185892aa9798c3f058256aed44a9fb413cc3:1-js/05-data-types/10-destructuring-assignment/6-max-salary/_js.view/solution.js
    }
  }

  return maxName;
}