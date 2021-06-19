import { http } from './config'


export default {

    listStudents: () => {
        return http.get('api/students')
    },

    createStudents: (data) => {
        debugger;
        return http.post('api/students/create/', data)
    },

    editStudents: (data) => {
        debugger;
        return http.put('api/students/update/' + data.Id, data)
    },

    deleteStudents: (data) => {
        debugger;
        return http.delete('api/students/delete/' + data)
    },

}