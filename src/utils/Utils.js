import { date } from "quasar";

export function loadRouter(routerName) {
    this.$router.push({ name: routerName });
}

export function loadRouterWithParams(routerName, params) {
  this.$router.push({ name: routerName, query: params });
}

export function notifySuccess(parameterMessage) {
  debugger;
    this.$q.notify({
      type: "positive",
      message: parameterMessage,
    });
}
export function notifyFailed(parameterMessage) {
    this.$q.notify({
      type: "negative",
      message: parameterMessage,
    });
}
export function getDateNow() {
    var m = new Date();
    var dateString =
      m.getUTCFullYear() +
      "-" +
      ("0" + (m.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + m.getDate()).slice(-2) +
      "T" +
      ("0" + m.getHours()).slice(-2) +
      ":" +
      ("0" + m.getMinutes()).slice(-2) +
      ":" +
      ("0" + m.getSeconds()).slice(-2);
    return dateString;
}

export function getDateNowAndHour() {
  let timeStamp = Date.now();
  return date.formatDate(timeStamp, "DD/MM/YYYY - HH:mm:ss");
}

export function formatDate(value) {
  
  value = new Date(value).toLocaleDateString('pt-BR', {timeZone: 'UTC'});
  return value;
}

export function formatDateJson(value) {
  return date.formatDate(value, "YYYY-MM-DDTHH:mm:ss");
}

export function formatMoney(value) {
  return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});;
}


export function formataStringDate(dateString) {
  var dia = dateString.split("/")[0];
  var mes = dateString.split("/")[1];
  var ano = dateString.split("/")[2];
  return ano + "-" + ("0" + mes).slice(-2) + "-" + ("0" + dia).slice(-2);
  // Utilizo o .slice(-2) para garantir o formato com 2 digitos.
}

export function formatDateAndHour(value) {
  return date.formatDate(value, "DD/MM/YYYY HH:mm:ss");
}

export function removeIconError() {
  this.$q.iconSet.field.error = '';
}