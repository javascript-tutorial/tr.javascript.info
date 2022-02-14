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
>>>>>>> 29216730a877be28d0a75a459676db6e7f5c4834:1-js/05-data-types/10-destructuring-assignment/6-max-salary/_js.view/solution.js
    }
  }

  return maxName;
}