const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/

export const email = val => emailPattern.test(val) || 'Insira um e-mail válido!'
export const required = val => !!val || 'Campo obrigatório.'
export const dateValidate = v => /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(v) || 'Data inválida'
export function minLength(value) {
    return val => val.length >= value || 'Digite no mínimo ' + value + ' caracteres.';
}
export function maxLength(value) {
    return val => val.length <= value || 'Digite no máximo ' + value + ' caracteres.';
}
export function comparePasswords(value) {
    return val => JSON.stringify(val) === JSON.stringify(value) || 'As senhas digitas não coincidem.';
}

export function mascaraCpf(value) {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
}
export function mascaraCnpj(value) {
    return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
}
export function mascaraCep(value) {
    return value.replace(/^(\d{5})(\d{3})/,"$1-$2");
}