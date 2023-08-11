function dateCreate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();
  if (mm < 10) {
    mm = "0" + mm;
  }
  if (dd < 10) {
    dd = "0" + dd;
  }
  return `${dd}/${mm}/${yyyy}`;
}

export const ObjectCreate = () => {
  return {
    id: Math.floor(Math.random() * 10000),
    title: "",
    comment: "",
    time: dateCreate(),
  };
};
