import AbstractComponent from "./abstract-component";

const createDaysTripTemplate = () => {
  return (
    `<ul class="trip-days">
     </ul>`
  );
};

export default class DaysTirp extends AbstractComponent {
  getTemplate() {
    return createDaysTripTemplate();
  }
}
